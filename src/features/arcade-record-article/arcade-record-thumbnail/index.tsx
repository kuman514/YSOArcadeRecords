import Image from 'next/image';

import ArcadeRecordThumbnailInteractivity from './interactivity';

interface Props {
  thumbnailUrl: string;
  originalImageUrls: string[];
}

export default function ArcadeRecordThumbnail({
  thumbnailUrl,
  originalImageUrls,
}: Props) {
  return (
    <div className="relative w-full sm:w-80 h-80">
      <Image
        src={thumbnailUrl}
        alt="Test thumbnail"
        className="object-contain"
        fill
      />
      <ArcadeRecordThumbnailInteractivity
        originalImageUrls={originalImageUrls}
      />
    </div>
  );
}
