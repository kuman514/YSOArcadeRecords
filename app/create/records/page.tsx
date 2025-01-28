import RecordForm from '^/src/features/arcade-record-article/record-form';

export default function CreateRecordPage() {
  return (
    <main className="w-full h-full max-w-3xl flex flex-col items-center px-4 sm:px-8 py-32 gap-8">
      <h1 className="text-4xl font-bold">새 기록 만들기</h1>
      <RecordForm />
    </main>
  );
}
