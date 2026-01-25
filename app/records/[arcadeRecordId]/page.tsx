import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import ArcadeRecordArticle from '^/src/features/arcade-record-article';
import { convertArcadeRecordPostToPostListItem } from '^/src/features/arcade-record-article/arcade-record-post-list/util';
import { getArcadeRecordPostArticleById } from '^/src/features/arcade-record-article/data';
import DeleteArcadeRecordForm from '^/src/features/arcade-record-article/delete-form';
import { APP_NAME } from '^/src/shared/lib/is-production';
import { createServerSideClient } from '^/src/shared/supabase/server';

interface Props {
  params: Promise<{
    arcadeRecordId: string;
  }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { arcadeRecordId } = await params;
  const article = await getArcadeRecordPostArticleById(arcadeRecordId);

  if (!article) {
    return {
      title: `페이지를 찾을 수 없음 :: ${APP_NAME}`,
    };
  }

  const convertedArticle = convertArcadeRecordPostToPostListItem(article);

  return {
    title: `${convertedArticle.title} :: ${APP_NAME}`,
    description: `${convertedArticle.memo} :: ${article.comment}`,
    openGraph: {
      images: [convertedArticle.thumbnailUrl],
    },
  };
}

export default async function RecordArticlePage({ params }: Props) {
  const supabase = await createServerSideClient();
  const { data, error } = await supabase.auth.getUser();

  const { arcadeRecordId } = await params;
  const article = await getArcadeRecordPostArticleById(arcadeRecordId);
  if (!article) {
    notFound();
  }

  const renderModifyButton = !(error || !data?.user) ? (
    <div className="w-full flex flex-row justify-end items-center gap-4">
      <Link href={`/records/${arcadeRecordId}/modify`}>수정하기</Link>
      <DeleteArcadeRecordForm arcadeRecordId={article.arcadeRecordId} />
    </div>
  ) : null;

  return (
    <main className="w-full h-full max-w-3xl flex flex-col items-start px-4 sm:px-8 py-32 gap-8">
      {renderModifyButton}
      <ArcadeRecordArticle post={article} />
    </main>
  );
}

