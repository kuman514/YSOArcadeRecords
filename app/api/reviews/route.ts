import { NextResponse } from 'next/server';

import { ReviewPostDBInput } from '^/src/entities/types/post';
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

  const reviewId = formData.get('reviewId')?.toString();

  const title = formData.get('title')?.toString();
  const tags = formData.get('tags')?.toString();
  const subjectName = formData.get('subjectName')?.toString();
  const subjectType = formData.get('subjectType')?.toString();
  const createdBy = formData.get('createdBy')?.toString();
  const releaseDate = formData.get('releaseDate')?.toString();
  const details = formData.getAll('details') as string[];
  const reviewScore = formData.get('reviewScore')?.toString();
  const youTubeId = formData.get('youTubeId')?.toString();
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

  if (!thumbnailUrl) {
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

  const createdDate = new Date();
  const formattedDate = `${createdDate.getFullYear()}-${String(
    createdDate.getMonth() + 1
  ).padStart(2, '0')}-${String(createdDate.getDate()).padStart(2, '0')}`;

  try {
    await insertData<Omit<ReviewPostDBInput, 'id'>>({
      insertInto: 'reviews',
      value: {
        review_id: reviewId,
        title,
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
        thumbnail_url: thumbnailUrl,
        image_urls: originalImageUrls,
        created_at: formattedDate,
        modified_at: formattedDate,
      },
    });

    revalidatePath('/', 'page');
    revalidatePath('/reviews', 'layout');
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
