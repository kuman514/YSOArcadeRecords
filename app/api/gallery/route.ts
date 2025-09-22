import { NextResponse } from 'next/server';

import { GalleryPostDBInput } from '^/src/entities/types/post';
import { insertData } from '^/src/shared/supabase/database';
import { removeUnusedImages } from '^/src/shared/supabase/image';
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

  if (!galleryId) {
    {
      return NextResponse.json(
        {
          result: 'failed',
          error:
            '갤러리 ID가 존재하지 않습니다. 새로고침하여 다시 시도해주십시오.',
        },
        { status: 400 }
      );
    }
  }
  if (!title) {
    {
      return NextResponse.json(
        {
          result: 'failed',
          error: '제목을 입력해주세요.',
        },
        { status: 400 }
      );
    }
  }
  if (!galleryThemeId) {
    {
      return NextResponse.json(
        {
          result: 'failed',
          error: '주제를 선택해주세요.',
        },
        { status: 400 }
      );
    }
  }
  if (!thumbnailUrl || !originalImageUrl) {
    {
      return NextResponse.json(
        {
          result: 'failed',
          error: '사진을 첨부해주세요.',
        },
        { status: 400 }
      );
    }
  }

  const createdDate = new Date().toISOString();

  try {
    await insertData<Omit<GalleryPostDBInput, 'id'>>({
      insertInto: 'gallery',
      value: {
        title,
        gallery_id: galleryId,
        gallery_theme_id: galleryThemeId,
        thumbnail_url: thumbnailUrl,
        image_url: originalImageUrl,
        created_at: createdDate,
        modified_at: createdDate,
      },
    });

    revalidatePath('/gallery', 'layout');

    const imagePath = `gallery/${galleryId}`;
    const usedImages = [originalImageUrl!, thumbnailUrl!].map(
      (image) => image.split('/').pop()!
    );
    removeUnusedImages(imagePath, usedImages);

    return NextResponse.json({ result: 'success' }, { status: 201 });
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
