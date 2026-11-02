import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";

const output = join(process.cwd(), "dist", "pxdritz-portfolio", "browser");
const baseUrl = "https://pxdritz1.github.io";
const lastModified = new Date().toISOString().slice(0, 10);

const pages = [
  {
    slug: "about",
    title: "About Chloe (pxdritz)",
    description: "Meet Chloe (pxdritz), a developer and artist making Minecraft mods, useful tools, wallpapers, and commissioned art.",
    heading: "Curious by default.",
    body: `<p>I’m Chloe, a developer and artist. I build mods and useful little tools with Java, Kotlin, Go, and Rust, and I also make wallpapers and commissioned art.</p>
      <p>I care about simple solutions, elegant code, and visual details that feel a little alive. I’m COO at <a href="https://edonme.dev">EdonMe Studios</a>.</p>
      <p>Outside the editor, I enjoy tea, travelling, JoJo’s, helping beginners, and quiet moments.</p>
      <h2>Languages and tools</h2><p>TypeScript, Java, Kotlin, Rust, Go, Git, Zed, Arch Linux, Godot, Krita, Figma, and Obsidian.</p>`,
    section: "about",
  },
  {
    slug: "projects",
    title: "Projects — Chloe (pxdritz)",
    description: "Minecraft projects, developer tools, open-source software, and creative work by Chloe (pxdritz).",
    heading: "Ideas, made useful.",
    body: `<ul>
      <li><a href="https://pxdritz1.github.io/BrainShake/">BrainShake</a> — a local-first freeform canvas for notes, sketches, and connected ideas.</li>
      <li><a href="https://github.com/pxdritz1/rusted-light">Rusted Light</a> — a quick launcher for Linux, built with Rust and GTK4.</li>
      <li><a href="https://github.com/pxdritz1/chloe-s-design-hub">Chloe’s design hub</a> — a growing home for creative tools.</li>
      <li><a href="https://modrinth.com/user/pxotitas">Minecraft projects on Modrinth</a>.</li>
    </ul>`,
    section: "work",
  },
  {
    slug: "gallery",
    title: "Art and wallpapers — Chloe (pxdritz)",
    description: "Character artwork, wallpapers, poster studies, and visual experiments by Chloe (pxdritz).",
    heading: "Another side of me.",
    body: `<ul>
      <li><a href="/assets/cujos.png">Cujos — character study</a></li>
      <li><a href="/assets/jolyne-butterfly-aesthetic.png">Jolyne — butterfly wallpaper</a></li>
      <li><a href="/assets/dragona.png">Dragona — wallpaper</a></li>
      <li><a href="/assets/dragona_cute.png">Dragona, dressed in green — character art</a></li>
      <li><a href="/assets/jojo.png">JoJo collection — wallpaper</a></li>
      <li><a href="/assets/jolyne.png">Jolyne — wallpaper</a></li>
      <li><a href="/assets/unitedtrans.png">United Trans — poster study</a></li>
      <li><a href="/assets/6e86120b-b056-46f7-978f-c517e3c1884e.png">Abstract — wallpaper</a></li>
      <li><a href="/assets/skin.png">Pixel character — Minecraft skin</a></li>
      <li><a href="/assets/vectorbloom_lain.png">Lain, in blue — character art</a></li>
    </ul>`,
    section: "art",
  },
  {
    slug: "contact",
    title: "Contact Chloe (pxdritz)",
    description: "Contact Chloe for projects, art commissions, collaborations, and friendly hellos.",
    heading: "Let’s make something nice.",
    body: `<p>For a project, an art commission, or just a hello, find me through these public profiles:</p>
      <ul>
        <li><a href="https://discord.com/users/pxotitas">Discord — pxotitas</a></li>
        <li><a href="https://github.com/pxdritz1">GitHub — pxdritz1</a></li>
        <li><a href="https://modrinth.com/user/pxotitas">Modrinth — pxotitas</a></li>
        <li><a href="https://ko-fi.com/pxdritz1">Ko-fi — pxdritz1</a></li>
        <li><a href="https://discord.gg/BDKNDHvjrD">Code’s Café</a></li>
      </ul>`,
    section: "contact",
  },
];

const pageStyles = `
@font-face{font-family:'SF Pro';src:url('/assets/sf-pro.woff') format('woff');font-weight:100 1000;font-display:swap}
:root{color-scheme:light;--paper:#fafafa;--surface:#fff;--ink:#1d1d1f;--muted:#6e6e73;--line:#e5e5e7;--accent:#6e5b88}
*{box-sizing:border-box}body{margin:0;background:var(--paper);color:var(--ink);font:20px/1.55 'SF Pro',-apple-system,BlinkMacSystemFont,sans-serif;-webkit-font-smoothing:antialiased}
header,main,footer{width:min(1240px,calc(100% - 64px));margin-inline:auto}header{height:112px;display:flex;align-items:center;border-bottom:1px solid var(--line)}main{min-height:65vh;padding:72px 0}footer{padding:24px 0;border-top:1px solid var(--line);color:var(--muted);font-size:16px}
a{color:inherit;text-underline-offset:4px}a:hover{color:var(--accent)}.wordmark{font-size:28px;font-weight:650;text-decoration:none}h1{max-width:780px;margin:12px 0 24px;font-size:clamp(48px,7vw,80px);font-weight:560;line-height:1.04;letter-spacing:-.05em}h2{font-size:28px;margin-top:44px}.eyebrow{color:var(--muted);font-size:16px}p,li{max-width:72ch}li{margin:10px 0}nav{display:flex;gap:24px;flex-wrap:wrap;margin-top:32px}.muted{color:var(--muted)}
@media(max-width:600px){header,main,footer{width:calc(100% - 48px)}header{height:88px}main{padding:48px 0}body{font-size:18px}}
@media(prefers-reduced-motion:reduce){*,*::before,*::after{scroll-behavior:auto!important;transition:none!important}}
`;

for (const page of pages) {
  const canonical = `${baseUrl}/${page.slug}/`;
  const directory = join(output, page.slug);
  await mkdir(directory, { recursive: true });
  const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="${page.description}">
    <meta name="author" content="Chloe (pxdritz)">
    <meta name="robots" content="index,follow,max-image-preview:large">
    <link rel="canonical" href="${canonical}">
    <link rel="icon" type="image/png" href="/assets/oc-icon.png">
    <meta property="og:site_name" content="pxdritz">
    <meta property="og:type" content="website">
    <meta property="og:title" content="${page.title}">
    <meta property="og:description" content="${page.description}">
    <meta property="og:url" content="${canonical}">
    <meta property="og:image" content="${baseUrl}/assets/dragona.png">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${page.title}">
    <meta name="twitter:description" content="${page.description}">
    <meta name="twitter:image" content="${baseUrl}/assets/dragona.png">
    <title>${page.title}</title>
    <style>${pageStyles}</style>
  </head>
  <body>
    <a class="skip-link" href="#main">Skip to content</a>
    <header><a class="wordmark" href="/">pxdritz.</a></header>
    <main id="main">
      <p class="eyebrow">Chloe / pxdritz</p>
      <h1>${page.heading}</h1>
      ${page.body}
      <nav aria-label="Portfolio sections">
        <a href="/#${page.section}">Open the interactive ${page.slug} section</a>
        <a href="/">Home</a>
      </nav>
    </main>
    <footer>Chloe / developer &amp; artist · <a href="https://github.com/pxdritz1">GitHub</a></footer>
  </body>
</html>`;
  await writeFile(join(directory, "index.html"), html);
}

const urls = ["", ...pages.map((page) => `${page.slug}/`)];
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((url) => `  <url><loc>${baseUrl}/${url}</loc><lastmod>${lastModified}</lastmod></url>`).join("\n")}
</urlset>
`;
await writeFile(join(output, "sitemap.xml"), sitemap);
console.log(`Generated ${pages.length} SEO pages and sitemap in ${output}`);