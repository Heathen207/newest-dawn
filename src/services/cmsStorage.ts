/**
 * Dawnland Development V2 - Persistent CMS & Media Storage Layer
 *
 * Responsibilities:
 * - Load/save the authoritative CMS state
 * - Migrate away from legacy CMS storage keys
 * - Validate core CMS structures
 * - Preserve intentionally empty project lists
 * - Ensure package definitions and registered media assets exist
 * - Normalize legacy SVG data URLs
 * - Provide image lookup helpers
 * - Provide project/world lookup helpers
 * - Process uploaded image assets
 */

import {
  CMSState,
  ImageRecord,
  ImageRole,
  FocalPoint,
  WorldId,
  ProjectRecord,
} from '../types';

import {
  INITIAL_CMS_STATE,
  INITIAL_IMAGES,
} from '../data/initialData';

const STORAGE_KEY = 'dawnland_cms_v5_data';

/**
 * Load the authoritative CMS state.
 *
 * Important:
 * - An empty projects array is valid.
 * - We do NOT repopulate projects simply because there are zero projects.
 * - Packages are different because the package library is part of the site's
 *   defined structure and must exist.
 */
export function loadCMSState(): CMSState {
  if (typeof window === 'undefined') {
    return INITIAL_CMS_STATE;
  }

  try {
    // Remove obsolete CMS storage versions.
    const legacyStorageKeys = [
      'dawnland_cms_v2_data',
      'dawnland_cms_v3_data',
      'dawnland_cms_v4_data',
    ];

    for (const key of legacyStorageKeys) {
      if (localStorage.getItem(key)) {
        localStorage.removeItem(key);
      }
    }

    const raw = localStorage.getItem(STORAGE_KEY);

    if (!raw) {
      return INITIAL_CMS_STATE;
    }

    /**
     * Reject known stale/incorrect CMS payloads rather than allowing an old
     * architecture to contaminate the current V5 state.
     */
    if (
      raw.includes('Architectural Director') ||
      raw.includes('OCTO_AFTER') ||
      raw.includes('architectural studio')
    ) {
      localStorage.removeItem(STORAGE_KEY);
      return INITIAL_CMS_STATE;
    }

    const parsed = JSON.parse(raw) as Partial<CMSState>;

    /**
     * Core CMS integrity check.
     *
     * These structures are required for the application to function.
     */
    if (
      !parsed ||
      !parsed.worlds ||
      !parsed.homepage ||
      !Array.isArray(parsed.images)
    ) {
      return INITIAL_CMS_STATE;
    }

    /**
     * Ensure package definitions exist.
     *
     * Packages are part of the authoritative CMS hierarchy.
     */
    if (
      !Array.isArray(parsed.packages) ||
      parsed.packages.length === 0
    ) {
      parsed.packages = INITIAL_CMS_STATE.packages;
    }

    /**
     * Projects are intentionally allowed to be empty.
     *
     * Do NOT restore INITIAL_CMS_STATE.projects merely because the array
     * contains zero records. This prevents fabricated/seed projects from
     * reappearing after the user deletes all projects.
     */
    if (!Array.isArray(parsed.projects)) {
      parsed.projects = INITIAL_CMS_STATE.projects;
    }

    /**
     * Ensure all registered initial images remain available.
     *
     * This allows the application to preserve its built-in conceptual
     * graphics even when a user has imported or modified CMS data.
     */
    const registeredIds = new Set(
      parsed.images.map((img) => img.id)
    );

    for (const initialImage of INITIAL_IMAGES) {
      if (!registeredIds.has(initialImage.id)) {
        parsed.images.push(initialImage);
      }
    }

    /**
     * Normalize legacy SVG data URLs.
     */
    for (const image of parsed.images) {
      if (
        image.blobUrl &&
        image.blobUrl.startsWith('data:image/svg+xml;utf8,')
      ) {
        image.blobUrl = image.blobUrl.replace(
          'data:image/svg+xml;utf8,',
          'data:image/svg+xml;charset=utf-8,'
        );
      }
    }

    return parsed as CMSState;
  } catch (err) {
    console.error(
      'Failed to parse CMS state from localStorage. Using initial CMS state.',
      err
    );

    return INITIAL_CMS_STATE;
  }
}

/**
 * Persist the complete CMS state.
 */
export function saveCMSState(state: CMSState): void {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(state)
    );
  } catch (err) {
    console.error(
      'Failed to save CMS state to localStorage:',
      err
    );
  }
}

/**
 * Remove the current persisted CMS state and return the authoritative
 * initial state.
 */
export function resetCMSToDefaults(): CMSState {
  if (typeof window !== 'undefined') {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Ignore localStorage removal failures.
    }
  }

  return INITIAL_CMS_STATE;
}

/**
 * Export the complete CMS state as formatted JSON.
 */
export function exportCMSStateJSON(state: CMSState): string {
  return JSON.stringify(state, null, 2);
}

/**
 * Import a previously exported CMS state.
 *
 * The imported object must contain the core CMS structures.
 * Packages and projects are normalized so older exports do not break
 * the current application.
 */
export function importCMSStateJSON(
  jsonString: string
): CMSState {
  const parsed = JSON.parse(jsonString) as Partial<CMSState>;

  if (
    !parsed ||
    !parsed.worlds ||
    !parsed.homepage ||
    !Array.isArray(parsed.images)
  ) {
    throw new Error(
      'Invalid CMS export JSON format: missing core structures.'
    );
  }

  /**
   * Packages are required by the current CMS architecture.
   */
  if (
    !Array.isArray(parsed.packages) ||
    parsed.packages.length === 0
  ) {
    parsed.packages = INITIAL_CMS_STATE.packages;
  }

  /**
   * An empty project list is valid.
   * Only repair a missing/non-array value.
   */
  if (!Array.isArray(parsed.projects)) {
    parsed.projects = [];
  }

  /**
   * Preserve all registered initial images.
   */
  const registeredIds = new Set(
    parsed.images.map((img) => img.id)
  );

  for (const initialImage of INITIAL_IMAGES) {
    if (!registeredIds.has(initialImage.id)) {
      parsed.images.push(initialImage);
    }
  }

  /**
   * Normalize legacy SVG data URLs.
   */
  for (const image of parsed.images) {
    if (
      image.blobUrl &&
      image.blobUrl.startsWith('data:image/svg+xml;utf8,')
    ) {
      image.blobUrl = image.blobUrl.replace(
        'data:image/svg+xml;utf8,',
        'data:image/svg+xml;charset=utf-8,'
      );
    }
  }

  const state = parsed as CMSState;

  saveCMSState(state);

  return state;
}

/**
 * Retrieve an image record from the current CMS state.
 *
 * Falls back to the registered initial image set if an image exists there
 * but is missing from the persisted state.
 */
export function getImageRecord(
  state: CMSState,
  imageId?: string
): ImageRecord | null {
  if (!imageId) {
    return null;
  }

  const found = state.images?.find(
    (image) => image.id === imageId
  );

  if (found) {
    if (
      found.blobUrl &&
      found.blobUrl.startsWith('data:image/svg+xml;utf8,')
    ) {
      found.blobUrl = found.blobUrl.replace(
        'data:image/svg+xml;utf8,',
        'data:image/svg+xml;charset=utf-8,'
      );
    }

    return found;
  }

  const fallback = INITIAL_IMAGES.find(
    (image) => image.id === imageId
  );

  return fallback || null;
}

/**
 * Resolve an image ID to a usable image URL.
 */
export function getImageBlobUrl(
  state: CMSState,
  imageId?: string,
  fallbackUrl?: string
): string {
  const record = getImageRecord(state, imageId);

  if (record?.blobUrl) {
    return record.blobUrl;
  }

  return fallbackUrl || '';
}

/**
 * Return visible projects associated with a specific Dawnland World.
 *
 * Projects are sorted according to their CMS order.
 */
export function getProjectsForWorld(
  state: CMSState,
  worldId: WorldId
): ProjectRecord[] {
  return state.projects
    .filter(
      (project) =>
        project.visibility &&
        project.relatedWorlds.includes(worldId)
    )
    .sort(
      (a, b) => a.order - b.order
    );
}

/**
 * Upload Image Processor
 *
 * Browser-side image processing layer.
 *
 * The current implementation stores the uploaded image as a data URL so
 * the CMS remains persistent in browser storage. The pathname is retained
 * as the future Vercel Blob destination/path identifier.
 *
 * Reads:
 * - MIME type
 * - dimensions
 * - file size
 * - filename
 *
 * Creates a complete ImageRecord.
 */
export async function processImageUpload(
  file: File,
  role: ImageRole = 'FEATURE',
  focalPoint: FocalPoint = 'center'
): Promise<ImageRecord> {
  return new Promise((resolve, reject) => {
    const validMimes = [
      'image/jpeg',
      'image/png',
      'image/webp',
      'image/svg+xml',
      'image/gif',
      'image/avif',
    ];

    if (!validMimes.includes(file.type)) {
      reject(
        new Error(
          `Unsupported image type: ${file.type}. Please upload JPEG, PNG, WebP, AVIF, or SVG.`
        )
      );

      return;
    }

    const reader = new FileReader();

    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;

      if (!dataUrl) {
        reject(
          new Error(
            'Image file was read but returned no data.'
          )
        );

        return;
      }

      const image = new Image();

      image.onload = () => {
        const id =
          'img-' +
          Date.now() +
          '-' +
          Math.random()
            .toString(36)
            .substring(2, 7);

        const cleanName = file.name.replace(
          /[^a-zA-Z0-9._-]/g,
          '_'
        );

        const now = new Date().toISOString();

        const record: ImageRecord = {
          id,
          blobUrl: dataUrl,
          pathname: `dawnland/uploads/${cleanName}`,
          filename: file.name,
          mimeType: file.type,
          width: image.naturalWidth || 1600,
          height: image.naturalHeight || 1066,
          fileSize: file.size,
          alt: file.name
            .replace(/\.[^/.]+$/, '')
            .replace(/[_-]/g, ' '),
          title: file.name,
          caption: `Uploaded image asset: ${file.name}`,
          focalPoint,
          role,
          visibility: true,
          createdAt: now,
          updatedAt: now,
        };

        resolve(record);
      };

      image.onerror = () => {
        reject(
          new Error(
            'Failed to decode image dimensions from file payload.'
          )
        );
      };

      image.src = dataUrl;
    };

    reader.onerror = () => {
      reject(
        new Error(
          'Failed to read image file from disk.'
        )
      );
    };

    reader.readAsDataURL(file);
  });
}

