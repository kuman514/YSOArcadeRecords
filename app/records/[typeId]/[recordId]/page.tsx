import ArcadeRecordArticle from '^/src/features/arcade-record-article';
import { temporaryArcadeRecordArticle } from '^/src/features/arcade-record-article/temp';

interface Props {
  params: {
    typeId: string;
    recordId: string;
  };
}

export default function RecordArticlePage({}: Props) {
  return (
    <main className="w-full h-full max-w-3xl flex flex-col items-start px-4 sm:px-8 py-32 gap-8">
      <ArcadeRecordArticle post={temporaryArcadeRecordArticle} />
    </main>
  );
}
