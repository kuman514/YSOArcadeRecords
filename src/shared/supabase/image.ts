import { createServerSideClient } from './server';

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
    throw new Error('Failed to save image.');
  }

  const {
    data: { publicUrl },
  } = supabase.storage
    .from(process.env.NEXT_PUBLIC_SUPABASE_UPLOAD_BUCKET_ID!)
    .getPublicUrl(result.path);

  return publicUrl;
}
