import sharp from 'sharp';
import { createServerSideClient } from './server';

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
  const extension = file.name.split('.').pop();
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
