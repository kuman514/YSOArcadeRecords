import { deleteImage, getImageList } from '^/src/shared/supabase/image';

interface Params {
  directory: string;
  usedImages: string[];
}

export async function removeUnusedImages({ directory, usedImages }: Params) {
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
