import Image from 'next/image';

import ArcadeRecordThumbnailInteractivity from './interactivity';

interface Props {
  thumbnailUrl: string;
  originalImageUrls: string[];
}

/**
 * @todo
 * Unify with `ReviewThumbnail`.
 */

export default function ArcadeRecordThumbnail({
  thumbnailUrl,
  originalImageUrls,
}: Props) {
  const additionalFigCaptionText =
    originalImageUrls.length > 1 ? `${originalImageUrls.length}개 ` : null;

  return (
    <figure className="w-full flex flex-col justify-center items-center gap-2">
      <div className="relative w-full h-80 bg-black">
        <Image
          src={thumbnailUrl}
          alt="아케이드 기록 썸네일"
          className="object-contain"
          fill
          sizes="20rem"
        />
        <ArcadeRecordThumbnailInteractivity
          originalImageUrls={originalImageUrls}
        />
      </div>
      <figcaption className="text-xs">
        [ 썸네일을 클릭하여 이미지 {additionalFigCaptionText}보기 ]
      </figcaption>
    </figure>
  );
}
