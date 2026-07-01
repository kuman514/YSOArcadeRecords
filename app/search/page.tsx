import { Metadata } from 'next';

import EmptySvg from '^/public/status/empty.svg';
import { ITEMS_PER_PAGE } from '^/src/entities/constants/pagenation';
import { APP_NAME } from '^/src/shared/util/is-production';
import { getArcadeRecordPostList } from '^/src/features/arcade-record-article/arcade-record-post-list/data';
import SearchResult from '^/src/features/search/search-result';
import { EvaluationCriterion } from '^/src/shared/util/types';
import { parseEvaluation } from '^/src/shared/util/parse-evaluation';

interface Props {
  searchParams: Promise<{
    searchText?: string;
  }>;
}

export async function generateMetadata({
  searchParams,
}: Props): Promise<Metadata> {
  const { searchText } = await searchParams;
  return {
    title: `${searchText} 검색 결과 :: ${APP_NAME}`,
  };
}

export default async function SearchPage({ searchParams }: Props) {
  const { searchText } = await searchParams;
  const rawData = await getArcadeRecordPostList(
    {
      from: 0,
      to: ITEMS_PER_PAGE,
    },
    {
      searchText,
    }
  );

  const renderData = rawData.map((post) => {
    const evaluations = [post.evaluation, post.score, post.elapsedTime]
      .filter(
        (evaluationValue) => evaluationValue && evaluationValue.length > 0
      )
      .map((evaluationValue) => {
        const parsed = parseEvaluation(evaluationValue);
        if (parsed.evaluationCriterion === EvaluationCriterion.SCORE) {
          return `${parsed.value}점`;
        }
        return parsed.value;
      })
      .join(', ');

    return (
      <SearchResult
        key={post.arcadeRecordId}
        title={post.title}
        subheading={evaluations}
        description={post.comment}
        href={`/records/${post.arcadeRecordId}`}
        thumbnailUrl={post.thumbnailUrl}
        emphasize={searchText ?? ''}
      />
    );
  });

  return (
    <main className="w-full h-full max-w-3xl flex flex-col items-start px-4 sm:px-8 py-32 gap-8">
      <h1 className="text-4xl font-bold">
        "{searchText}" 아케이드 기록 검색 결과
      </h1>
      {renderData.length > 0 ? (
        <ul className="w-full flex flex-col gap-4">{renderData}</ul>
      ) : (
        <div className="w-full flex flex-col items-center gap-12 sm:gap-16">
          <div className="w-full flex flex-col items-center pt-12">
            <EmptySvg width={`${(100 * 5) / 9}%`} />
          </div>
          <span className="text-2xl font-bold text-center">
            검색 결과가 없습니다.
          </span>
        </div>
      )}
    </main>
  );
}
