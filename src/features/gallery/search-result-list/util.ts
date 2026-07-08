import { SearchResultProps } from '^/src/entities/search/types';
import { GalleryPost } from '^/src/entities/types/post';

export function convertGalleryPostToSearchResultProps({
  theme,
  title,
  galleryId,
  thumbnailUrl,
}: GalleryPost): Omit<SearchResultProps, 'emphasize'> {
  return {
    title: `${theme.galleryThemeTitle} 사진`,
    description: title,
    href: `/gallery/${galleryId}`,
    thumbnailUrl,
  };
}
