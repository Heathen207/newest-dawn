/**
 * Dawnland Development V2 - Persistent CMS & Media Storage Layer
 */
import { CMSState, ImageRecord, ImageRole, FocalPoint, WorldId, ProjectRecord } from '../types';
import { INITIAL_CMS_STATE, INITIAL_IMAGES } from '../data/initialData';

const STORAGE_KEY = 'dawnland_cms_v4_data';

export function loadCMSState(): CMSState {
  if (typeof window === 'undefined') {
    return INITIAL_CMS_STATE;
  }
  try {
    // Clear legacy v2 & v3 storage if it contained outdated/fictional seed data or malformed URIs
    if (localStorage.getItem('dawnland_cms_v2_data')) {
      localStorage.removeItem('dawnland_cms_v2_data');
    }
    if (localStorage.getItem('dawnland_cms_v3_data')) {
      localStorage.removeItem('dawnland_cms_v3_data');
    }

    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return INITIAL_CMS_STATE;
    }
    // Guard against stale fictional terms
    if (raw.includes('Architectural Director') || raw.includes('OCTO_AFTER') || raw.includes('architectural studio')) {
      localStorage.removeItem(STORAGE_KEY);
      return INITIAL_CMS_STATE;
    }
    const parsed = JSON.parse(raw) as CMSState;
    // Basic integrity check
    if (parsed && parsed.worlds && parsed.homepage && parsed.images) {
      // Ensure all registered initial images exist and have valid media types
      const registeredIds = new Set(parsed.images.map((img) => img.id));
      for (const initImg of INITIAL_IMAGES) {
        if (!registeredIds.has(initImg.id)) {
          parsed.images.push(initImg);
        }
      }
      // Fix any legacy utf8 URI string if present
      for (const img of parsed.images) {
        if (img.blobUrl && img.blobUrl.startsWith('data:image/svg+xml;utf8,')) {
          img.blobUrl = img.blobUrl.replace('data:image/svg+xml;utf8,', 'data:image/svg+xml;charset=utf-8,');
        }
      }
      return parsed;
    }
    return INITIAL_CMS_STATE;
  } catch (err) {
    console.error('Failed to parse CMS state from localStorage, using initial data:', err);
    return INITIAL_CMS_STATE;
  }
}

export function saveCMSState(state: CMSState): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (err) {
    console.error('Failed to save CMS state to localStorage:', err);
  }
}

export function resetCMSToDefaults(): CMSState {
  if (typeof window !== 'undefined') {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Ignore
    }
  }
  return INITIAL_CMS_STATE;
}

export function exportCMSStateJSON(state: CMSState): string {
  return JSON.stringify(state, null, 2);
}

export function importCMSStateJSON(jsonString: string): CMSState {
  const parsed = JSON.parse(jsonString);
  if (!parsed.worlds || !parsed.homepage || !parsed.images) {
    throw new Error('Invalid CMS export JSON format: missing core structures.');
  }
  saveCMSState(parsed);
  return parsed as CMSState;
}

export function getImageRecord(state: CMSState, imageId?: string): ImageRecord | null {
  if (!imageId) return null;
  const found = state.images?.find((img) => img.id === imageId);
  if (found) {
    if (found.blobUrl && found.blobUrl.startsWith('data:image/svg+xml;utf8,')) {
      found.blobUrl = found.blobUrl.replace('data:image/svg+xml;utf8,', 'data:image/svg+xml;charset=utf-8,');
    }
    return found;
  }
  // Fallback to initial images if not found in current state
  const fallback = INITIAL_IMAGES.find((img) => img.id === imageId);
  return fallback || null;
}

export function getImageBlobUrl(state: CMSState, imageId?: string, fallbackUrl?: string): string {
  const record = getImageRecord(state, imageId);
  if (record && record.blobUrl) {
    return record.blobUrl;
  }
  return fallbackUrl || '';
}

export function getProjectsForWorld(state: CMSState, worldId: WorldId): ProjectRecord[] {
  return state.projects.filter(
    (p) => p.visibility && p.relatedWorlds.includes(worldId)
  ).sort((a, b) => a.order - b.order);
}

/**
 * Upload Image Processor (Vercel Blob / Browser Client persistent simulation)
 * Inspects real file metadata (dimensions, mime, size) and creates an ImageRecord
 */
export async function processImageUpload(
  file: File,
  role: ImageRole = 'FEATURE',
  focalPoint: FocalPoint = 'center'
): Promise<ImageRecord> {
  return new Promise((resolve, reject) => {
    // Validate file type
    const validMimes = ['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml', 'image/gif', 'image/avif'];
    if (!validMimes.includes(file.type)) {
      reject(new Error(`Unsupported image type: ${file.type}. Please upload JPEG, PNG, WebP, AVIF, or SVG.`));
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      const img = new Image();
      img.onload = () => {
        const id = 'img-' + Date.now() + '-' + Math.random().toString(36).substring(2, 7);
        const cleanName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_');
        const record: ImageRecord = {
          id,
          blobUrl: dataUrl,
          pathname: `dawnland/uploads/${cleanName}`,
          filename: file.name,
          mimeType: file.type,
          width: img.naturalWidth || 1600,
          height: img.naturalHeight || 1066,
          fileSize: file.size,
          alt: file.name.replace(/\.[^/.]+$/, '').replace(/[_-]/g, ' '),
          title: file.name,
          caption: `Uploaded image asset: ${file.name}`,
          focalPoint,
          role,
          visibility: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        resolve(record);
      };
      img.onerror = () => {
        reject(new Error('Failed to decode image dimensions from file payload.'));
      };
      img.src = dataUrl;
    };
    reader.onerror = () => {
      reject(new Error('Failed to read file from disk.'));
    };
    reader.readAsDataURL(file);
  });
}
