import { NextResponse } from 'next/server';

import {
  checkIsSafeStoragePath,
  resizeImage,
  saveImage,
} from '^/src/shared/supabase/image';
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
  const image = formData.get('image');
  const size = formData.get('size')?.toString();
  const path = formData.get('path')?.toString();
  const fileName = formData.get('fileName')?.toString();

  if (
    !(image instanceof File) ||
    image.name === 'undefined' ||
    !size ||
    !path ||
    !fileName
  ) {
    return NextResponse.json(
      {
        result: 'failed',
        error:
          '이미지 파일과 저장할 경로, 최대 사이즈, 저장할 파일명을 지정하셔야 합니다.',
      },
      { status: 400 }
    );
  }

  if (!checkIsSafeStoragePath(path, fileName)) {
    return NextResponse.json(
      {
        result: 'failed',
        error: '저장할 경로 또는 파일명이 올바르지 않습니다.',
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
  } catch (error) {
    return NextResponse.json(
      {
        result: 'failed',
        error: `서버에서 에러가 발생했습니다. (${error})`,
      },
      { status: 502 }
    );
  }
}
