import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';

import { ArcadeRecordPostDBInput } from '^/src/entities/types/post';
import { insertData } from '^/src/shared/supabase/database';
import { createServerSideClient } from '^/src/shared/supabase/server';
import { parseEvaluation } from '^/src/shared/util/parse-evaluation';

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

  const arcadeRecordId = formData.get('arcadeRecordId')?.toString();
  const title = formData.get('title')?.toString();
  const arcadeId = formData.get('arcadeId')?.toString();
  const methodId = formData.get('methodId')?.toString();
  const achievedAt = formData.get('achievedAt')?.toString();
  const players = formData.get('players')?.toString();
  const playerSide = formData.get('playerSide')?.toString();
  const evaluation = formData.get('evaluation')?.toString();
  const stage = formData.get('stage')?.toString();
  const rank = formData.get('rank')?.toString();
  const comment = formData.get('comment')?.toString();
  const note = formData.get('note')?.toString();
  const youTubeId = formData.get('youTubeId')?.toString();
  const tags = formData.get('tags')?.toString();

  const thumbnailUrl = formData.get('thumbnailUrl')?.toString();
  const originalImageUrls = formData.getAll('originalImageUrls') as string[];

  const isEvaluationVerified = (() => {
    try {
      parseEvaluation(evaluation ?? '');
      return true;
    } catch {
      return false;
    }
  })();

  if (
    !arcadeRecordId ||
    !title ||
    !arcadeId ||
    !methodId ||
    !achievedAt ||
    !players ||
    !playerSide ||
    !evaluation ||
    !isEvaluationVerified ||
    !stage ||
    !comment ||
    !thumbnailUrl ||
    originalImageUrls.length === 0
  ) {
    return NextResponse.json(
      {
        result: 'failed',
        error: '올바르지 않은 입력이 있습니다. 확인해 주십시오.',
      },
      { status: 400 }
    );
  }

  const createdDate = new Date();
  const formattedDate = `${createdDate.getFullYear()}-${String(
    createdDate.getMonth() + 1
  ).padStart(2, '0')}-${String(createdDate.getDate()).padStart(2, '0')}`;

  try {
    await insertData<Omit<ArcadeRecordPostDBInput, 'id'>>({
      insertInto: 'records',
      value: {
        title: title,
        arcade_id: arcadeId,
        arcade_record_id: arcadeRecordId,
        method_id: methodId,
        evaluation: evaluation,
        stage: stage,
        rank,
        comment: comment,
        tags:
          tags
            ?.split(',')
            .map((tag) => tag.trim())
            .filter((tag) => tag.length > 0) ?? [],
        note,
        youtube_id: youTubeId,
        thumbnail_url: thumbnailUrl,
        image_urls: originalImageUrls,
        achieved_at: achievedAt,
        created_at: formattedDate,
        modified_at: formattedDate,
      },
    });

    revalidatePath('/', 'page');
    revalidatePath('/records', 'layout');
    return NextResponse.json({ result: 'success' }, { status: 201 });
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
