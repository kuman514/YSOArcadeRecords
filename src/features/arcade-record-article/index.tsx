import { ArcadeRecordPost } from '^/src/entities/types/post';
import Tag from '^/src/shared/tag';
import UnorderedList from '^/src/shared/unordered-list';
import { parseDateToString } from '^/src/shared/util/parse-date';
import { parseEvaluation } from '^/src/shared/util/parse-evaluation';
import { EvaluationCriterion } from '^/src/shared/util/types';

import ArcadeRecordThumbnail from './arcade-record-thumbnail';
import { PLAYER_CLASS } from './constants';

interface Props {
  post: ArcadeRecordPost;
}

export default function ArcadeRecordArticle({ post }: Props) {
  const createdAtText = parseDateToString(post.createdAt);
  const modifiedAtText = parseDateToString(post.modifiedAt);
  const evaluationObject = parseEvaluation(post.evaluation);

  const renderCreatedAt = (
    <span className="w-full text-right text-sm">작성일자: {createdAtText}</span>
  );

  const renderModifiedAt =
    createdAtText !== modifiedAtText ? (
      <span className="w-full text-right text-sm">
        수정일자: {modifiedAtText}
      </span>
    ) : null;

  const renderPlayerInfo =
    post.playerInfo.players === 1 ? (
      <li>
        <span className="font-bold">플레이 위치</span>:{' '}
        <span className={PLAYER_CLASS[post.playerInfo.playerSide]}>
          {post.playerInfo.playerSide}P
        </span>{' '}
        사이드
      </li>
    ) : (
      <li>
        <span className="font-bold">플레이어 수</span>:{' '}
        {post.playerInfo.players}명 (작성자 본인은{' '}
        <span className={PLAYER_CLASS[post.playerInfo.playerSide]}>
          {post.playerInfo.playerSide}P
        </span>{' '}
        사이드)
      </li>
    );

  const renderEvaluation = (() => {
    switch (evaluationObject.evaluationCriterion) {
      case EvaluationCriterion.SCORE:
        return (
          <li>
            <span className="font-bold">점수</span>: {evaluationObject.value}
          </li>
        );
      case EvaluationCriterion.TIME:
        return (
          <li>
            <span className="font-bold">시간</span>: {evaluationObject.value}
          </li>
        );
      default:
        return null;
    }
  })();

  const renderRank = post.rank ? (
    <li>
      <span className="font-bold">등급</span>: {post.rank}
    </li>
  ) : null;

  const renderNote = post.note ? (
    <li>
      <span className="font-bold">비고</span>: {post.note}
    </li>
  ) : null;

  const renderTagContents =
    post.tags.length > 0 ? (
      <div className="flex flex-row flex-wrap gap-2">
        {post.tags.map((tag) => (
          <Tag key={tag.tagId}>{tag.label}</Tag>
        ))}
      </div>
    ) : (
      <span>태그 없음</span>
    );

  const renderYouTube = post.youTubeId ? (
    <section className="w-full flex flex-col gap-2">
      <h2 className="text-2xl font-bold">YouTube 영상</h2>
      <div className="w-full h-60 sm:h-80">
        <iframe
          width="100%"
          height="100%"
          src={`https://www.youtube.com/embed/${post.youTubeId}`}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          style={{
            borderWidth: 0,
          }}
        />
      </div>
    </section>
  ) : null;

  return (
    <>
      <h1 className="text-4xl font-bold">{post.title}</h1>
      <div className="w-full flex flex-col">
        {renderCreatedAt}
        {renderModifiedAt}
      </div>
      <section className="w-full flex flex-col sm:flex-row sm:items-center gap-2">
        <ArcadeRecordThumbnail
          thumbnailUrl={post.thumbnailUrl}
          originalImageUrls={post.imageUrls}
        />
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-bold">요약</h2>
          <UnorderedList>
            <li>
              <span className="font-bold">달성일자</span>:{' '}
              {parseDateToString(post.achievedAt)}
            </li>
            <li>
              <span className="font-bold">장소 및 수단</span>:{' '}
              {post.method.label}
            </li>
            {renderPlayerInfo}
            {renderEvaluation}
            <li>
              <span className="font-bold">최종 스테이지</span>: {post.stage}
            </li>
            {renderRank}
            {renderNote}
          </UnorderedList>
        </div>
      </section>
      <section className="w-full flex flex-col gap-2">
        <h2 className="text-2xl font-bold">태그</h2>
        {renderTagContents}
      </section>
      <section className="w-full flex flex-col gap-2">
        <h2 className="text-2xl font-bold">코멘터리</h2>
        <p className="first-letter:ml-2">{post.comment}</p>
      </section>
      {renderYouTube}
    </>
  );
}
