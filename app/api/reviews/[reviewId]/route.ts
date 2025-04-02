import { NextResponse } from 'next/server';

import { ReviewPostDBInput } from '^/src/entities/types/post';
import { updateData } from '^/src/shared/supabase/database';
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
  const keyFeatures = formData.getAll('keyFeatures') as string[];
  const expectations = formData.getAll('expectations') as string[];
  const firstImpressions = formData.getAll('firstImpressions') as string[];
  const positives = formData.getAll('positives') as string[];
  const negatives = formData.getAll('negatives') as string[];
  const conclusions = formData.getAll('conclusions') as string[];
  const reviewScore = formData.get('reviewScore')?.toString();
  const youTubeId = formData.get('youTubeId')?.toString();

  const presentThumbnailUrl = formData.get('presentThumbnailUrl')?.toString();
  const presentImageUrls = formData.getAll('presentImageUrls') as string[];
  const thumbnailUrl = formData.get('thumbnailUrl')?.toString();
  const originalImageUrls = formData.getAll('originalImageUrls') as string[];

  if (
    !reviewId ||
    !title ||
    !subjectName ||
    !subjectType ||
    !createdBy ||
    !releaseDate ||
    keyFeatures.length === 0 ||
    expectations.length === 0 ||
    firstImpressions.length === 0 ||
    positives.length === 0 ||
    negatives.length === 0 ||
    conclusions.length === 0 ||
    !reviewScore ||
    (!thumbnailUrl && !presentThumbnailUrl) ||
    (presentImageUrls.length === 0 && originalImageUrls.length === 0)
  ) {
    return NextResponse.json(
      {
        result: 'failed',
        error: '올바르지 않은 입력이 있습니다. 확인해 주십시오.',
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
        key_features: keyFeatures,
        expectations: expectations,
        first_impressions: firstImpressions,
        positives: positives,
        negatives: negatives,
        conclusions: conclusions,
        review_score: parseInt(reviewScore),
        youtube_id: youTubeId,
        thumbnail_url: thumbnailUrl ?? presentThumbnailUrl,
        image_urls: presentImageUrls.concat(originalImageUrls),
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

    revalidatePath('/reviews');
    return NextResponse.json({ result: 'success' }, { status: 200 });
  } catch {
    return NextResponse.json(
      {
        result: 'failed',
        error: '리뷰 수정 실패. 다시 시도하여 주십시오.',
      },
      { status: 500 }
    );
  }
}
