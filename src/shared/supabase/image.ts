import sharp from 'sharp';
import { createServerSideClient } from './server';

const safeSegmentPattern = /^[a-zA-Z0-9_-]+$/;
const allowedImageExtensions = ['jpg', 'jpeg', 'png', 'webp', 'gif', 'avif'];

/**
 * Guards the storage object path against traversal. `directory` may contain
 * slashes (e.g. `records/<id>`), so each segment is checked individually;
 * `fileName` must be a single safe segment. This rejects `..`, leading/
 * trailing slashes, and any other reserved character before the value is used
 * to build a storage path.
 */
export function checkIsSafeStoragePath(
  directory: string,
  fileName: string
): boolean {
  const segments = directory.split('/');
  const isDirectorySafe =
    segments.length > 0 &&
    segments.every((segment) => safeSegmentPattern.test(segment));
  const isFileNameSafe = safeSegmentPattern.test(fileName);
  return isDirectorySafe && isFileNameSafe;
}

export async function resizeImage(
  file: File,
  sizeOption: {
    maxWidth: number;
    maxHeight: number;
  }
) {
  const extension = file.name.split('.').pop();
  const resizeResultBuffer = await sharp(await file.arrayBuffer())
    .resize(sizeOption.maxWidth, sizeOption.maxHeight, {
      fit: 'inside',
    })
    .toBuffer();
  return new File([resizeResultBuffer], `resized.${extension}`);
}

export async function saveImage(
  file: File,
  fileName: string,
  directory: string
) {
  const extension = file.name.split('.').pop()?.toLowerCase();

  if (!checkIsSafeStoragePath(directory, fileName)) {
    throw new Error('Invalid image path.');
  }

  if (!extension || !allowedImageExtensions.includes(extension)) {
    throw new Error('Unsupported image extension.');
  }

  const finalFileName = `${fileName}.${extension}`;

  const supabase = await createServerSideClient();
  const { data: result, error } = await supabase.storage
    .from(process.env.NEXT_PUBLIC_SUPABASE_UPLOAD_BUCKET_ID!)
    .upload(`${directory}/${finalFileName}`, file);

  if (error || !result) {
    throw new Error(error?.message ?? 'Failed to save image.');
  }

  const {
    data: { publicUrl },
  } = supabase.storage
    .from(process.env.NEXT_PUBLIC_SUPABASE_UPLOAD_BUCKET_ID!)
    .getPublicUrl(result.path);

  return publicUrl;
}

export async function deleteImage(savedFilePath: string) {
  const supabase = await createServerSideClient();
  const { data: result, error } = await supabase.storage
    .from(process.env.NEXT_PUBLIC_SUPABASE_UPLOAD_BUCKET_ID!)
    .remove([savedFilePath]);

  if (error || !result) {
    throw new Error(error?.message ?? 'Failed to remove image.');
  }
}

export async function getImageList(directory: string) {
  const supabase = await createServerSideClient();
  const { data: result, error } = await supabase.storage
    .from(process.env.NEXT_PUBLIC_SUPABASE_UPLOAD_BUCKET_ID!)
    .list(directory);

  if (error || !result) {
    throw new Error(error?.message ?? 'Failed to get the list of images.');
  }

  return result.map((file) => file.name);
}

export async function removeUnusedImages(
  directory: string,
  usedImages: string[]
) {
  try {
    const imageList = await getImageList(directory);
    const unusedImages = imageList.filter(
      (image) => !usedImages.includes(image)
    );
    unusedImages.forEach(async (image) => {
      try {
        deleteImage(`${directory}/${image}`);
      } catch (error) {
        console.error(error);
      }
      console.log(`${directory}/${image} deleted.`);
    });
  } catch (error) {
    console.error(error);
  }
}
