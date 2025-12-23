import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';

import { GalleryPostDBInput } from '^/src/entities/types/post';
import { updateData } from '^/src/shared/supabase/database';
import { removeUnusedImages } from '^/src/shared/supabase/image';
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
  const thumbnailUrl = formData.get('thumbnailUrl')?.toString();
  const originalImageUrls = formData.getAll('originalImageUrls') as string[];

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
  if (!thumbnailUrl && !presentThumbnailUrl) {
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

  if (originalImageUrls.length === 0) {
    return NextResponse.json(
      {
        result: 'failed',
        error: '원본 이미지를 첨부해주세요.',
      },
      { status: 400 }
    );
  }

  const modifiedDate = new Date().toISOString();

  try {
    await updateData<Partial<GalleryPostDBInput>>({
      update: 'gallery',
      set: {
        title,
        gallery_id: galleryId,
        gallery_theme_id: galleryThemeId,
        thumbnail_url: thumbnailUrl ?? presentThumbnailUrl,
        image_url: '',
        image_urls: originalImageUrls,
        modified_at: modifiedDate,
      },
      where: [
        {
          type: ConditionType.EQUAL,
          column: 'gallery_id',
          value: galleryId,
        },
      ],
    });

    revalidatePath('/gallery', 'layout');

    const imagePath = `gallery/${galleryId}`;
    const usedImages = originalImageUrls
      .concat(
        thumbnailUrl || presentThumbnailUrl
          ? [thumbnailUrl! ?? presentThumbnailUrl!]
          : []
      )
      .map((image) => image.split('/').pop()!);
    removeUnusedImages(imagePath, usedImages);

    return NextResponse.json({ result: 'success' }, { status: 200 });
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
