import { NextResponse } from 'next/server';

import { GalleryPostDBInput } from '^/src/entities/types/post';
import { updateData } from '^/src/shared/supabase/database';
import { createServerSideClient } from '^/src/shared/supabase/server';
import { ConditionType } from '^/src/shared/supabase/types';

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ galleryId: string }> }
) {
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

  const galleryId = (await params).galleryId;

  const title = formData.get('title')?.toString();
  const galleryThemeId = formData.get('galleryThemeId')?.toString();

  const presentThumbnailUrl = formData.get('presentThumbnailUrl')?.toString();
  const presentImageUrl = formData.get('presentImageUrl')?.toString();

  const thumbnailUrl = formData.get('thumbnailUrl')?.toString();
  const originalImageUrl = formData.get('originalImageUrl')?.toString();

  if (
    !galleryId ||
    !title ||
    !galleryThemeId ||
    (!thumbnailUrl && !presentThumbnailUrl) ||
    (!originalImageUrl && !presentImageUrl)
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
    await updateData<Partial<GalleryPostDBInput>>({
      update: 'gallery',
      set: {
        title,
        gallery_id: galleryId,
        gallery_theme_id: galleryThemeId,
        thumbnail_url: thumbnailUrl ?? presentThumbnailUrl,
        image_url: originalImageUrl ?? presentImageUrl,
        created_at: formattedDate,
        modified_at: formattedDate,
      },
      where: [
        {
          type: ConditionType.EQUAL,
          column: 'gallery_id',
          value: galleryId,
        },
      ],
    });
  } catch {
    return NextResponse.json(
      {
        result: 'failed',
        error: '아케이드 기록 등록 실패. 다시 시도하여 주십시오.',
      },
      { status: 500 }
    );
  }
}
