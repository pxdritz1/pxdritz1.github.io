export interface Artwork {
  src: string;
  alt: string;
  title: string;
  credit: string;
}

export interface DockTool {
  name: string;
  href: string;
  icon: string;
  description: string;
}

export const heroArtworks: Artwork[] = [
  {
    src: "assets/jolyne-butterfly-aesthetic.png",
    alt: "Jolyne and butterflies, artwork by Chloe",
    title: "Jolyne, through my lens.",
    credit: "Jolyne butterfly aesthetic",
  },
  {
    src: "assets/jolyne.png",
    alt: "Jolyne, artwork by Chloe",
    title: "Jolyne, in another light.",
    credit: "Jolyne",
  },
  {
    src: "assets/cujos.png",
    alt: "Cujos, a character study by Chloe",
    title: "Cujos, a character study.",
    credit: "Cujos",
  },
];

export const dockTools: DockTool[] = [
  { name: "TypeScript", href: "https://www.typescriptlang.org/", icon: "typescript.svg", description: "TypeScript / Web experiments & BrainShake." },
  { name: "Java", href: "https://www.java.com/", icon: "java.svg", description: "Java / Minecraft plugins & useful little tools." },
  { name: "Kotlin", href: "https://kotlinlang.org/", icon: "kotlin.svg", description: "Kotlin / Part of my Minecraft toolkit." },
  { name: "Rust", href: "https://www.rust-lang.org/", icon: "rust.svg", description: "Rust / Native Linux tools, like Rusted Light." },
  { name: "Go", href: "https://go.dev/", icon: "go.svg", description: "Go / Another language in my toolbox." },
  { name: "Git", href: "https://git-scm.com/", icon: "git.svg", description: "Git / Keeping every small change in place." },
  { name: "Zed", href: "https://zed.dev/", icon: "zed.svg", description: "Zed / One of the editors in my orbit." },
  { name: "Arch Linux", href: "https://archlinux.org/", icon: "archlinux.svg", description: "Arch Linux / My corner of the Linux world." },
  { name: "Godot", href: "https://godotengine.org/", icon: "godot.svg", description: "Godot / A place to play with interactive ideas." },
  { name: "Krita", href: "https://krita.org/", icon: "krita.svg", description: "Krita / Pixels becoming a little more personal." },
  { name: "Figma", href: "https://www.figma.com/", icon: "figma.svg", description: "Figma / Shapes, interfaces & ideas taking form." },
  { name: "Obsidian", href: "https://obsidian.md/", icon: "obsidian.svg", description: "Obsidian / A home for connected thoughts." },
];