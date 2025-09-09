import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';

import { ArcadeRecordPostDBInput } from '^/src/entities/types/post';
import { updateData } from '^/src/shared/supabase/database';
import { createServerSideClient } from '^/src/shared/supabase/server';
import { ConditionType } from '^/src/shared/supabase/types';
import { parseEvaluation } from '^/src/shared/util/parse-evaluation';
import { EvaluationCriterion } from '^/src/shared/util/types';

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ arcadeRecordId: string }> }
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

  const arcadeRecordId = (await params).arcadeRecordId;

  const title = formData.get('title')?.toString();
  const arcadeId = formData.get('arcadeId')?.toString();
  const methodId = formData.get('methodId')?.toString();
  const achievedAt = formData.get('achievedAt')?.toString();
  const score = formData.get('score')?.toString() ?? '';
  const elapsedTime = formData.get('elapsedTime')?.toString() ?? '';
  const stage = formData.get('stage')?.toString();
  const rank = formData.get('rank')?.toString();
  const comment = formData.get('comment')?.toString();
  const note = formData.get('note')?.toString();
  const youTubeId = formData.get('youTubeId')?.toString();
  const tags = formData.get('tags')?.toString();

  const presentThumbnailUrl = formData.get('presentThumbnailUrl')?.toString();
  const thumbnailUrl = formData.get('thumbnailUrl')?.toString();
  const originalImageUrls = formData.getAll('originalImageUrls') as string[];

  const isScoreVerified = (() => {
    try {
      const result = parseEvaluation(score);
      return result.evaluationCriterion === EvaluationCriterion.SCORE;
    } catch {
      return false;
    }
  })();
  const isElapsedTimeVerified = (() => {
    if (elapsedTime.length === 0) {
      return true;
    }
    try {
      const result = parseEvaluation(elapsedTime);
      return result.evaluationCriterion === EvaluationCriterion.TIME;
    } catch {
      return false;
    }
  })();
  const isEvaluationInputted = score.length > 0 || elapsedTime.length > 0;
  const isEvaluationVerified =
    isEvaluationInputted && isScoreVerified && isElapsedTimeVerified;

  if (!arcadeRecordId) {
    return NextResponse.json(
      {
        result: 'failed',
        error:
          '아케이드 기록 ID가 존재하지 않습니다. 새로고침하여 다시 시도해주십시오.',
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

  if (!arcadeId) {
    return NextResponse.json(
      {
        result: 'failed',
        error: '아케이드 부문을 선택해주세요.',
      },
      { status: 400 }
    );
  }

  if (!methodId) {
    return NextResponse.json(
      {
        result: 'failed',
        error: '플레이 수단을 선택해주세요.',
      },
      { status: 400 }
    );
  }

  if (!achievedAt) {
    return NextResponse.json(
      {
        result: 'failed',
        error: '달성 일자를 입력해주세요.',
      },
      { status: 400 }
    );
  }

  if (!isEvaluationVerified) {
    return NextResponse.json(
      {
        result: 'failed',
        error: '점수나 시간을 올바르게 입력해주세요.',
      },
      { status: 400 }
    );
  }

  if (!stage) {
    return NextResponse.json(
      {
        result: 'failed',
        error: '최종 스테이지를 입력해주세요.',
      },
      { status: 400 }
    );
  }

  if (!comment) {
    return NextResponse.json(
      {
        result: 'failed',
        error: '코멘터리를 입력해주세요.',
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
    await updateData<Partial<ArcadeRecordPostDBInput>>({
      update: 'records',
      set: {
        title: title,
        arcade_id: arcadeId,
        method_id: methodId,
        score,
        evaluation: '',
        elapsed_time: elapsedTime,
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
        thumbnail_url: thumbnailUrl ?? presentThumbnailUrl,
        image_urls: originalImageUrls,
        achieved_at: achievedAt,
        modified_at: formattedDate,
      },
      where: [
        {
          type: ConditionType.EQUAL,
          column: 'arcade_record_id',
          value: arcadeRecordId!,
        },
      ],
    });

    revalidatePath('/', 'page');
    revalidatePath('/records', 'layout');
    return NextResponse.json({ result: 'success' }, { status: 200 });
  } catch {
    return NextResponse.json(
      {
        result: 'failed',
        error: '아케이드 기록 수정 실패. 다시 시도하여 주십시오.',
      },
      { status: 502 }
    );
  }
}
