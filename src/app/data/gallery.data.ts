export interface GalleryArtwork {
  src: string;
  displaySrc: string;
  title: string;
  type: string;
  alt: string;
  wide?: boolean;
}

export const galleryArtworks: GalleryArtwork[] = [
  {
    src: "assets/6e86120b-b056-46f7-978f-c517e3c1884e.png",
    displaySrc: "assets/optimized/6e86120b-b056-46f7-978f-c517e3c1884e.webp",
    title: "Abstract",
    type: "Wallpaper",
    alt: "Abstract wallpaper from Chloe's portfolio",
    wide: true,
  },
  {
    src: "assets/unitedtrans.png",
    displaySrc: "assets/optimized/unitedtrans.webp",
    title: "United Trans",
    type: "Poster study",
    alt: "United Trans poster study from Chloe's portfolio",
  },
  {
    src: "assets/dragona.png",
    displaySrc: "assets/optimized/dragona.webp",
    title: "Dragona",
    type: "Wallpaper",
    alt: "Dragona, ink drawing on warm paper",
  },
  {
    src: "assets/jolyne-butterfly-aesthetic.png",
    displaySrc: "assets/optimized/jolyne-butterfly-aesthetic.webp",
    title: "Jolyne butterfly",
    type: "Wallpaper",
    alt: "Jolyne with butterflies in a green and cream collage",
  },
  {
    src: "assets/jolyne.png",
    displaySrc: "assets/optimized/jolyne.webp",
    title: "Jolyne",
    type: "Wallpaper",
    alt: "Jolyne wallpaper artwork by Chloe",
  },
];