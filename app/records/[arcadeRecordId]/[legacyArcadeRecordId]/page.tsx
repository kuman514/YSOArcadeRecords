import { redirect } from 'next/navigation';

interface Props {
  params: Promise<{
    legacyArcadeRecordId: string;
  }>;
}

export default async function LegacyRecordArticleRedirectPage({
  params,
}: Props) {
  const { legacyArcadeRecordId } = await params;
  redirect(`/records/${legacyArcadeRecordId}`);
}
