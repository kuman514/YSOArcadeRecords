import { NextResponse } from 'next/server';

import { GalleryPostDBInput } from '^/src/entities/types/post';
import { insertData } from '^/src/shared/supabase/database';
import { createServerSideClient } from '^/src/shared/supabase/server';
import { revalidatePath } from 'next/cache';

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

  const galleryId = formData.get('galleryId')?.toString();
  const title = formData.get('title')?.toString();
  const galleryThemeId = formData.get('galleryThemeId')?.toString();

  const thumbnailUrl = formData.get('thumbnailUrl')?.toString();
  const originalImageUrl = formData.get('originalImageUrl')?.toString();

  if (
    !galleryId ||
    !title ||
    !galleryThemeId ||
    !thumbnailUrl ||
    !originalImageUrl
  ) {
    {
      return NextResponse.json(
        {
          result: 'failed',
          error: '올바르지 않은 입력이 있습니다. 확인해 주십시오.',
        },
        { status: 400 }
      );
    }
  }

  const createdDate = new Date();
  const formattedDate = `${createdDate.getFullYear()}-${String(
    createdDate.getMonth() + 1
  ).padStart(2, '0')}-${String(createdDate.getDate()).padStart(2, '0')}`;

  try {
    await insertData<Omit<GalleryPostDBInput, 'id'>>({
      insertInto: 'gallery',
      value: {
        title,
        gallery_id: galleryId,
        gallery_theme_id: galleryThemeId,
        thumbnail_url: thumbnailUrl,
        image_url: originalImageUrl,
        created_at: formattedDate,
        modified_at: formattedDate,
      },
    });

    revalidatePath('/gallery', 'layout');
    return NextResponse.json({ result: 'success' }, { status: 201 });
  } catch {
    return NextResponse.json(
      {
        result: 'failed',
        error: '갤러리 사진 등록 실패. 다시 시도하여 주십시오.',
      },
      { status: 500 }
    );
  }
}
