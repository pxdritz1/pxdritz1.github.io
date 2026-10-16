export const githubUser = "pxdritz1";
export const asset = (path) => `${import.meta.env.BASE_URL}${path.replace(/^\//, "")}`;
export const fallbackAvatar = asset("/assets/oc-icon.png");

export const galleryItems = [
  [asset("/assets/unitedtrans.png"), "united trans", "poster study"],
  [asset("/assets/cujos.png"), "cujos", "character art"],
  [
    asset("/assets/6e86120b-b056-46f7-978f-c517e3c1884e.png"),
    "abstract",
    "wallpaper",
  ],
  [asset("/assets/dragona.png"), "dragona", "wallpaper"],
  [asset("/assets/jolyne.png"), "jolyne", "wallpaper"],
  [
    asset("/assets/jolyne-butterfly-aesthetic.png"),
    "jolyne butterfly aesthetic",
    "wallpaper",
  ],
];

export const homeWallpapers = galleryItems.filter(
  ([src]) => !src.endsWith("/cujos.png"),
);

export const languages = [
  ["html", "https://developer.mozilla.org/en-US/docs/Web/HTML"],
  ["css", "https://developer.mozilla.org/en-US/docs/Web/CSS"],
  ["kotlin", "https://kotlinlang.org/"],
  ["java", "https://www.java.com/"],
  ["lua", "https://www.lua.org/"],
  ["cs", "https://dotnet.microsoft.com/en-us/languages/csharp"],
  ["rust", "https://www.rust-lang.org/"],
  ["python", "https://www.python.org/"],
  ["js", "https://developer.mozilla.org/en-US/docs/Web/JavaScript"],
  ["ts", "https://www.typescriptlang.org/"],
  ["go", "https://go.dev/"],
  ["cpp", "https://en.cppreference.com/w/"],
];

export const navItems = [
  ["home", "home"],
  ["projects", "projects"],
  ["gallery", "gallery"],
  ["about", "about"],
  ["contact", "contact"],
];