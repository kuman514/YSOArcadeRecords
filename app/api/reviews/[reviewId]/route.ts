import { NextResponse } from 'next/server';

import { ReviewPostDBInput } from '^/src/entities/types/post';
import { updateData } from '^/src/shared/supabase/database';
import { removeUnusedImages } from '^/src/shared/supabase/image';
import { createServerSideClient } from '^/src/shared/supabase/server';
import { ConditionType } from '^/src/shared/supabase/types';
import { revalidatePath } from 'next/cache';

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ reviewId: string }> }
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

  const reviewId = (await params).reviewId;

  const title = formData.get('title')?.toString();
  const tags = formData.get('tags')?.toString();
  const subjectName = formData.get('subjectName')?.toString();
  const subjectType = formData.get('subjectType')?.toString();
  const createdBy = formData.get('createdBy')?.toString();
  const releaseDate = formData.get('releaseDate')?.toString();
  const details = formData.getAll('details') as string[];
  const reviewScore = formData.get('reviewScore')?.toString();
  const youTubeId = formData.get('youTubeId')?.toString();

  const presentThumbnailUrl = formData.get('presentThumbnailUrl')?.toString();
  const thumbnailUrl = formData.get('thumbnailUrl')?.toString();
  const originalImageUrls = formData.getAll('originalImageUrls') as string[];

  const isDetailsVerified = details.length > 0;

  if (!reviewId) {
    return NextResponse.json(
      {
        result: 'failed',
        error: '리뷰 ID가 존재하지 않습니다. 새로고침하여 다시 시도해주십시오.',
      },
      { status: 400 }
    );
  }

  if (!title) {
    return NextResponse.json(
      {
        result: 'failed',
        error: '제목을 입력해주세요.',
      },
      { status: 400 }
    );
  }

  if (!subjectName) {
    return NextResponse.json(
      {
        result: 'failed',
        error: '리뷰 대상을 입력해주세요.',
      },
      { status: 400 }
    );
  }

  if (!subjectType) {
    return NextResponse.json(
      {
        result: 'failed',
        error: '리뷰 대상의 종류를 입력해주세요.',
      },
      { status: 400 }
    );
  }

  if (!createdBy) {
    return NextResponse.json(
      {
        result: 'failed',
        error: '제작사를 입력해주세요.',
      },
      { status: 400 }
    );
  }

  if (!releaseDate) {
    return NextResponse.json(
      {
        result: 'failed',
        error: '출시 일자를 입력해주세요.',
      },
      { status: 400 }
    );
  }

  if (!isDetailsVerified) {
    return NextResponse.json(
      {
        result: 'failed',
        error: '상세 내용을 입력해주세요.',
      },
      { status: 400 }
    );
  }

  if (!reviewScore) {
    return NextResponse.json(
      {
        result: 'failed',
        error: '총점을 입력해주세요.',
      },
      { status: 400 }
    );
  }

  if (!thumbnailUrl && !presentThumbnailUrl) {
    return NextResponse.json(
      {
        result: 'failed',
        error: '썸네일을 첨부해주세요.',
      },
      { status: 400 }
    );
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

  const modifiedDate = new Date();
  const formattedDate = `${modifiedDate.getFullYear()}-${String(
    modifiedDate.getMonth() + 1
  ).padStart(2, '0')}-${String(modifiedDate.getDate()).padStart(2, '0')}`;

  try {
    await updateData<Partial<ReviewPostDBInput>>({
      update: 'reviews',
      set: {
        review_id: reviewId,
        title: title,
        tags:
          tags
            ?.split(',')
            .map((tag) => tag.trim())
            .filter((tag) => tag.length > 0) ?? [],
        subject_name: subjectName,
        subject_type: subjectType,
        created_by: createdBy,
        release_date: releaseDate,
        details: details,
        key_features: [],
        expectations: [],
        first_impressions: [],
        positives: [],
        negatives: [],
        conclusions: [],
        review_score: parseInt(reviewScore),
        youtube_id: youTubeId,
        thumbnail_url: thumbnailUrl ?? presentThumbnailUrl,
        image_urls: originalImageUrls,
        modified_at: formattedDate,
      },
      where: [
        {
          type: ConditionType.EQUAL,
          column: 'review_id',
          value: reviewId,
        },
      ],
    });

    revalidatePath('/', 'page');
    revalidatePath('/reviews', 'layout');

    const imagePath = `reviews/${reviewId}`;
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
