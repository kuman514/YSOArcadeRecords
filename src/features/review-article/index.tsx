import Image from 'next/image';

import FilledStarSvgRepoComSvg from '^/public/icons/filled-star-svgrepo-com.svg';
import StarSvgRepoComSvg from '^/public/icons/star-svgrepo-com.svg';
import { ReviewPost } from '^/src/entities/types/post';
import { CopyLinkButton } from '^/src/shared/share/copy-link';
import { ShareToTwitterButton } from '^/src/shared/share/share-to-twitter';
import Tag from '^/src/shared/tag';
import UnorderedList from '^/src/shared/unordered-list';
import { parseDateToString } from '^/src/shared/util/parse-date';

import ReviewThumbnail from './review-thumbnail';

interface Props {
  post: ReviewPost;
}

export default function ReviewArticle({ post }: Props) {
  const createdAtText = parseDateToString(post.createdAt);
  const modifiedAtText = parseDateToString(post.modifiedAt);

  const renderCreatedAt = (
    <span className="w-full text-right text-sm">작성일자: {createdAtText}</span>
  );

  const renderModifiedAt =
    createdAtText !== modifiedAtText ? (
      <span className="w-full text-right text-sm">
        수정일자: {modifiedAtText}
      </span>
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
        {post.subjectName} - {post.createdBy}({post.releaseDate.getFullYear()}
        년)
      </div>
      <div className="w-full flex flex-col">
        {renderCreatedAt}
        {renderModifiedAt}
      </div>
      <div className="w-full flex flex-row gap-2 justify-end">
        <ShareToTwitterButton postTitle={post.title} />
        <CopyLinkButton />
      </div>
      <section className="w-full flex justify-center items-center">
        <ReviewThumbnail
          thumbnailUrl={post.thumbnailUrl}
          originalImageUrls={post.imageUrls}
        />
      </section>

      <section className="w-full flex flex-col gap-2">
        <h2 className="text-2xl font-bold">평점: {post.reviewScore} / 5점</h2>
        <span className="w-full flex flex-row justify-center items-center dark:invert">
          {[1, 2, 3, 4, 5].map((score) =>
            post.reviewScore >= score ? (
              <Image
                className="w-1/6"
                key={score}
                src={FilledStarSvgRepoComSvg}
                alt={`${score}점`}
              />
            ) : (
              <Image
                className="w-1/6"
                key={score}
                src={StarSvgRepoComSvg}
                alt={`${score}점`}
              />
            )
          )}
        </span>
      </section>

      <section className="w-full flex flex-col gap-2">
        <h2 className="text-2xl font-bold">기대사항</h2>
        <UnorderedList>
          {post.expectations.map((expectation, index) => (
            <li key={index}>{expectation}</li>
          ))}
        </UnorderedList>
      </section>

      <section className="w-full flex flex-col gap-2">
        <h2 className="text-2xl font-bold">첫인상</h2>
        <UnorderedList>
          {post.firstImpressions.map((firstImpression, index) => (
            <li key={index}>{firstImpression}</li>
          ))}
        </UnorderedList>
      </section>

      <section className="w-full flex flex-col gap-2">
        <h2 className="text-2xl font-bold">좋았던 점</h2>
        <UnorderedList>
          {post.positives.map((positive, index) => (
            <li key={index}>{positive}</li>
          ))}
        </UnorderedList>
      </section>

      <section className="w-full flex flex-col gap-2">
        <h2 className="text-2xl font-bold">아쉬웠던 점</h2>
        <UnorderedList>
          {post.negatives.map((negative, index) => (
            <li key={index}>{negative}</li>
          ))}
        </UnorderedList>
      </section>

      <section className="w-full flex flex-col gap-2">
        <h2 className="text-2xl font-bold">결론</h2>
        <UnorderedList>
          {post.conclusions.map((conclusion, index) => (
            <li key={index}>{conclusion}</li>
          ))}
        </UnorderedList>
      </section>

      <section className="w-full flex flex-col gap-2">
        <h2 className="text-2xl font-bold">태그</h2>
        {renderTagContents}
      </section>
      {renderYouTube}
    </>
  );
}
