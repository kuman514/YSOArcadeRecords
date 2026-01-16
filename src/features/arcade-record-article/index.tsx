import Link from 'next/link';

import { ArcadeRecordPost } from '^/src/entities/types/post';
import { CopyLinkButton } from '^/src/shared/share/copy-link';
import { ShareToTwitterButton } from '^/src/shared/share/share-to-twitter';
import Tag from '^/src/shared/tag';
import UnorderedList from '^/src/shared/unordered-list';
import { parseDateToString } from '^/src/shared/util/parse-date';
import { parseEvaluation } from '^/src/shared/util/parse-evaluation';
import { EvaluationCriterion } from '^/src/shared/util/types';
import Container from '^/src/shared/ui/container';

import ArcadeRecordThumbnail from './arcade-record-thumbnail';

interface Props {
  post: ArcadeRecordPost;
}

export default function ArcadeRecordArticle({ post }: Props) {
  const createdAtText = parseDateToString(post.createdAt);
  const modifiedAtText = parseDateToString(post.modifiedAt);
  const legacyEvaluationObject = (() => {
    if (!post?.evaluation) {
      return null;
    }
    try {
      return parseEvaluation(post.evaluation);
    } catch {
      return null;
    }
  })();

  const renderCreatedAt = (
    <span className="w-full text-right text-sm">작성일자: {createdAtText}</span>
  );

  const renderModifiedAt =
    createdAtText !== modifiedAtText ? (
      <span className="w-full text-right text-sm">
        수정일자: {modifiedAtText}
      </span>
    ) : null;

  const renderEvaluation = legacyEvaluationObject
    ? (() => {
        switch (legacyEvaluationObject.evaluationCriterion) {
          case EvaluationCriterion.SCORE:
            return (
              <Container className="w-full" title="점수" titleAlignment="left">
                <strong className="block w-full font-press-start-2p text-2xl text-center">
                  {legacyEvaluationObject.value}
                </strong>
              </Container>
            );
          case EvaluationCriterion.TIME:
            return (
              <Container className="w-full" title="시간" titleAlignment="left">
                <strong className="block w-full font-press-start-2p text-2xl text-center">
                  {legacyEvaluationObject.value}
                </strong>
              </Container>
            );
          default:
            return null;
        }
      })()
    : null;

  const renderScore =
    (!legacyEvaluationObject ||
      legacyEvaluationObject.value.length === 0 ||
      legacyEvaluationObject.evaluationCriterion ===
        EvaluationCriterion.TIME) &&
    post.score ? (
      <Container className="w-full" title="점수">
        <strong className="block w-full font-press-start-2p text-2xl text-center">
          {parseEvaluation(post.score).value}
        </strong>
      </Container>
    ) : null;

  const renderElapsedTime =
    (!legacyEvaluationObject ||
      legacyEvaluationObject.value.length === 0 ||
      legacyEvaluationObject.evaluationCriterion ===
        EvaluationCriterion.SCORE) &&
    post.elapsedTime ? (
      <Container className="w-full" title="시간">
        <strong className="block w-full font-press-start-2p text-2xl text-center">
          {parseEvaluation(post.elapsedTime).value}
        </strong>
      </Container>
    ) : null;

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
          <Tag key={tag}>{tag}</Tag>
        ))}
      </div>
    ) : (
      <span>태그 없음</span>
    );

  const renderYouTube = post.youTubeId ? (
    <Container className="w-full" title="YouTube 영상">
      <div className="w-full aspect-video">
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
    </Container>
  ) : null;

  return (
    <>
      <h1 className="text-4xl font-bold">{post.title}</h1>
      <section>
        <span>
          <Link
            href={`/records/${post.arcade.arcadeId}`}
            className="hover:text-hovering cursor-pointer"
          >
            {post.arcade.label}
          </Link>{' '}
          {'>'} {parseDateToString(post.achievedAt)}
        </span>
      </section>
      <div className="w-full flex flex-col">
        {renderCreatedAt}
        {renderModifiedAt}
      </div>
      <div className="w-full flex flex-row justify-end gap-2">
        <ShareToTwitterButton postTitle={post.title} />
        <CopyLinkButton />
      </div>
      <section className="w-full flex flex-col gap-8 justify-center items-center">
        <ArcadeRecordThumbnail
          thumbnailUrl={post.thumbnailUrl}
          originalImageUrls={post.imageUrls}
        />
        <Container className="w-full" title="최종 스테이지">
          <strong className="block w-full font-press-start-2p text-2xl text-center">
            {post.stage}
          </strong>
        </Container>
        <section className="w-full flex flex-col sm:flex-row gap-8 justify-center items-center">
          {renderEvaluation}
          {renderScore}
          {renderElapsedTime}
        </section>
      </section>
      <Container className="w-full" title="그 외 정보">
        <UnorderedList>
          <li>
            <span className="font-bold">장소 및 수단</span>: {post.method.label}
          </li>
          {renderRank}
          {renderNote}
        </UnorderedList>
      </Container>
      <Container className="w-full" title="코멘터리">
        <p className="first-letter:ml-2">{post.comment}</p>
      </Container>
      <Container className="w-full" title="태그">
        {renderTagContents}
      </Container>
      {renderYouTube}
    </>
  );
}
