import { NextResponse } from 'next/server';

import { resizeImage, saveImage } from '^/src/shared/supabase/image';

export async function POST(request: Request) {
  const formData = await request.formData();
  const image = formData.get('image') as File;
  const size = formData.get('size')?.toString();
  const path = formData.get('path')?.toString();
  const fileName = formData.get('fileName')?.toString();

  if (image.name === 'undefined' || !size || !path || !fileName) {
    return NextResponse.json(
      {
        result: 'failed',
        error: 'Requires an image, the size, the path, and the image name.',
      },
      { status: 400 }
    );
  }

  const finalSize = parseInt(size);

  try {
    const imageUrl = await saveImage(
      await resizeImage(image, { maxWidth: finalSize, maxHeight: finalSize }),
      fileName,
      path
    );
    return NextResponse.json({ result: 'success', imageUrl }, { status: 201 });
  } catch {
    return NextResponse.json(
      { result: 'failed', error: 'Failed to save image.' },
      { status: 500 }
    );
  }
}
