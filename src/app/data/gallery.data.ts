export interface GalleryArtwork {
  src: string;
  title: string;
  type: string;
  alt: string;
  wide?: boolean;
}

export const galleryArtworks: GalleryArtwork[] = [
  {
    src: "assets/cujos.png",
    title: "Cujos",
    type: "Character study",
    alt: "Cujos, character artwork from Chloe's portfolio",
    wide: true,
  },
  {
    src: "assets/jolyne-butterfly-aesthetic.png",
    title: "Jolyne",
    type: "Wallpaper",
    alt: "Jolyne with butterflies in a green and cream collage",
  },
  {
    src: "assets/dragona.png",
    title: "Dragona",
    type: "Wallpaper",
    alt: "Dragona, ink drawing on warm paper",
  },
  {
    src: "assets/jolyne.png",
    title: "Jolyne",
    type: "Wallpaper",
    alt: "Jolyne wallpaper artwork by Chloe",
  },
  {
    src: "assets/unitedtrans.png",
    title: "United Trans",
    type: "Poster study",
    alt: "United Trans poster study from Chloe's portfolio",
  },
  {
    src: "assets/6e86120b-b056-46f7-978f-c517e3c1884e.png",
    title: "Abstract",
    type: "Wallpaper",
    alt: "Abstract wallpaper from Chloe's portfolio",
  },
];