import fs from 'node:fs';

/**
 * @todo
 * Change into real remote storage
 */

const BASE_FILE_STORAGE_ROOT = 'temp';

export async function saveImage(
  file: File,
  fileName: string,
  directory: string
) {
  const extension = file.name.split('.').pop();
  const finalFileName = `${fileName}.${extension}`;

  const stream = fs.createWriteStream(
    `public/${BASE_FILE_STORAGE_ROOT}/${directory}/${finalFileName}`
  );
  const bufferedImage = await file.arrayBuffer();

  stream.write(Buffer.from(bufferedImage), (error) => {
    if (error) {
      throw new Error('Failed to save image.');
    }
  });

  return `/${BASE_FILE_STORAGE_ROOT}/${directory}/${finalFileName}`;
}
