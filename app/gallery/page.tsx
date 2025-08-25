import GalleryListElement from '^/src/features/gallery/gallery-list/element';

export default function GalleryListPage() {
  return (
    <main className="w-full h-full max-w-3xl px-4 sm:px-8 py-32">
      <div className="w-full h-full flex flex-row flex-wrap items-start">
        <GalleryListElement />
        <GalleryListElement />
        <GalleryListElement />
        <GalleryListElement />
        <GalleryListElement />
        <GalleryListElement />
        <GalleryListElement />
        <GalleryListElement />
        <GalleryListElement />
        <GalleryListElement />
      </div>
    </main>
  );
}
