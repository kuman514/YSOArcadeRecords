import { NextResponse } from 'next/server';

import { resizeImage, saveImage } from '^/src/shared/supabase/image';
import { createServerSideClient } from '^/src/shared/supabase/server';

export async function POST(request: Request) {
  const supabase = await createServerSideClient();
  const { data, error } = await supabase.auth.getUser();

  if (error || !data?.user) {
    return NextResponse.json(
      {
        result: 'failed',
        error: '로그인이 필요합니다.',
      },
      { status: 401 }
    );
  }

  const formData = await request.formData();
  const image = formData.get('image') as File;
  const size = formData.get('size')?.toString();
  const path = formData.get('path')?.toString();
  const fileName = formData.get('fileName')?.toString();

  if (image.name === 'undefined' || !size || !path || !fileName) {
    return NextResponse.json(
      {
        result: 'failed',
        error:
          '이미지 파일과 저장할 경로, 최대 사이즈, 저장할 파일명을 지정하셔야 합니다.',
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
      {
        result: 'failed',
        error: '이미지 업로드에 실패하였습니다. 다시 시도해 주십시오.',
      },
      { status: 500 }
    );
  }
}
