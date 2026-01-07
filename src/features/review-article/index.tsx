import FilledStarSvgRepoComSvg from '^/public/icons/filled-star-svgrepo-com.svg';
import StarSvgRepoComSvg from '^/public/icons/star-svgrepo-com.svg';
import { ReviewPost } from '^/src/entities/types/post';
import { CopyLinkButton } from '^/src/shared/share/copy-link';
import { ShareToTwitterButton } from '^/src/shared/share/share-to-twitter';
import Tag from '^/src/shared/tag';
import { parseDateToString } from '^/src/shared/util/parse-date';
import Container from '^/src/shared/ui/container';
import UnorderedList from '^/src/shared/unordered-list';

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

      <Container className="w-full" title="평점">
        <span className="w-full flex flex-row justify-center items-center stroke-black fill-black dark:stroke-white dark:fill-white">
          {[1, 2, 3, 4, 5].map((score) => (
            <div key={`${score}점`} className="w-1/6">
              {post.reviewScore >= score ? (
                <FilledStarSvgRepoComSvg width="100%" height="100%" />
              ) : (
                <StarSvgRepoComSvg width="100%" height="100%" />
              )}
            </div>
          ))}
        </span>
        <span className="text-2xl font-bold w-full flex flex-row justify-center items-center">
          {post.reviewScore} / 5점
        </span>
      </Container>

      <Container className="w-full" title="상세">
        <UnorderedList>
          {post.details.map((detail, index) => (
            <li key={index}>{detail}</li>
          ))}
        </UnorderedList>
      </Container>

      <Container className="w-full" title="태그">
        {renderTagContents}
      </Container>
      {renderYouTube}
    </>
  );
}
