import { mkdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";

const dist = join(process.cwd(), "dist");
const baseUrl = "https://pxdritz1.github.io";
const rootPath = join(dist, "index.html");
let rootHtml = await readFile(rootPath, "utf8");

const homeContent = `
<main class="seo-content">
  <h1>Chloe — pxdritz, also known as pxotitas</h1>
  <p>I'm Chloe, a woman developer and artist known online as <strong>pxdritz</strong> and <strong>pxotitas</strong>. I build Minecraft mods, developer tools, wallpapers, and digital artwork. I'm COO at EdonMe Studios.</p>
  <p>My work includes Java and Kotlin Minecraft projects, Rust and Go tools, web experiments, and visual design. I care about useful software, thoughtful details, and creative projects.</p>
  <nav aria-label="Portfolio sections">
    <a href="/projects/">Projects</a>
    <a href="/gallery/">Gallery</a>
    <a href="/about/">About</a>
    <a href="/contact/">Contact</a>
  </nav>
</main>`;

if (!rootHtml.includes("<!-- SEO_PRERENDER -->")) {
  throw new Error("Missing SEO_PRERENDER marker in dist/index.html");
}
rootHtml = rootHtml.replace("<!-- SEO_PRERENDER -->", homeContent);
await writeFile(rootPath, rootHtml);

const stylesheets = [...rootHtml.matchAll(/<link[^>]+href="([^"]+\.css)"[^>]*>/g)]
  .map((match) => match[1].replace(/^\.\//, ""));
const pageStyle = `
<style>
:root{color-scheme:light;--paper:#fbf9ff;--ink:#262321;--accent:#78649f}
*{box-sizing:border-box}body{margin:0;background:var(--paper);color:var(--ink);font:16px/1.7 system-ui,-apple-system,sans-serif}
main{max-width:900px;margin:0 auto;padding:4rem 1.5rem 3rem}header,footer{max-width:900px;margin:auto;padding:1.5rem}
a{color:var(--accent);text-underline-offset:3px}nav{display:flex;flex-wrap:wrap;gap:1rem;margin:2rem 0}
h1,h2{line-height:1.15;letter-spacing:-.035em}h1{font-size:clamp(2.2rem,7vw,4rem)}h2{margin-top:2.5rem}
p,li{max-width:72ch}li{margin:.4rem 0}.eyebrow{font-size:.8rem;letter-spacing:.12em;text-transform:uppercase;color:var(--accent)}
</style>`;

const pages = {
  projects: {
    title: "Projects — Chloe (pxdritz)",
    description: "Minecraft mods, developer tools, open-source software, and creative coding projects by Chloe, also known as pxdritz and pxotitas.",
    body: `<main><p class="eyebrow">selected work</p><h1>Projects</h1>
      <p>I'm Chloe, a developer known as pxdritz and pxotitas. I make Minecraft mods, plugins, developer tools, and small software experiments.</p>
      <h2>Software and tools</h2><ul>
        <li><a href="https://github.com/pxdritz1/BrainShake">BrainShake</a> — a local-first visual canvas for organizing ideas, with browser autosave and portable project files.</li>
        <li><a href="https://github.com/pxdritz1/rusted-light">Rusted Light</a> — a Linux application launcher built with Rust and GTK4.</li>
        <li><a href="https://github.com/pxdritz1/smarkdown-reforged">Smarkdown</a> — a terminal-based Markdown notepad.</li>
        <li><a href="https://github.com/pxdritz1">More open-source projects on GitHub</a>.</li>
      </ul>
      <h2>Minecraft projects</h2><p>I publish Minecraft mods and tools on <a href="https://modrinth.com/user/pxotitas">Modrinth as pxotitas</a>, including server utilities, optimization projects, and gameplay extensions.</p>
      <nav><a href="/#projects">Open the interactive project section</a><a href="/">Home</a><a href="/gallery/">Gallery</a></nav></main>`
  },
  gallery: {
    title: "Gallery — Chloe (pxdritz)",
    description: "Wallpapers, digital art, character illustrations, and visual experiments by Chloe, also known as pxdritz.",
    body: `<main><p class="eyebrow">visual work</p><h1>Gallery</h1>
      <p>A collection of wallpapers, character artwork, commissioned pieces, and visual experiments made by Chloe (pxdritz / pxotitas).</p>
      <ul>
        <li><a href="/assets/dragona.png">Dragona — wallpaper</a></li>
        <li><a href="/assets/jolyne.png">Jolyne — wallpaper</a></li>
        <li><a href="/assets/jolyne-butterfly-aesthetic.png">Jolyne butterfly aesthetic — wallpaper</a></li>
        <li><a href="/assets/unitedtrans.png">United Trans — poster study</a></li>
        <li><a href="/assets/6e86120b-b056-46f7-978f-c517e3c1884e.png">Abstract — wallpaper</a></li>
      </ul><nav><a href="/#gallery">Open the interactive gallery</a><a href="/">Home</a><a href="/projects/">Projects</a></nav></main>`
  },
  about: {
    title: "About Chloe (pxdritz / pxotitas)",
    description: "Learn about Chloe, a woman developer and artist known as pxdritz and pxotitas, working with Minecraft, software, and digital art.",
    body: `<main><p class="eyebrow">about me</p><h1>Hi, I'm Chloe.</h1>
      <p>I'm a woman in tech, developer and artist, and COO at EdonMe Studios. Online, I'm known as <strong>pxdritz</strong>, <strong>pxotitas</strong>, and <strong>px</strong>.</p>
      <p>I work with Java, Kotlin, Go, and Rust to build Minecraft mods and useful tools. I also make wallpapers, digital illustrations, and commissioned artwork.</p>
      <p>I'm interested in creative software, open-source projects, programming, visual design, and helping beginners learn.</p>
      <h2>Elsewhere on the web</h2><ul>
        <li><a href="https://github.com/pxdritz1">GitHub — pxdritz1</a></li>
        <li><a href="https://modrinth.com/user/pxotitas">Modrinth — pxotitas</a></li>
        <li><a href="https://ko-fi.com/pxdritz1">Ko-fi — pxdritz1</a></li>
      </ul><nav><a href="/#about">Open the interactive about section</a><a href="/">Home</a><a href="/contact/">Contact</a></nav></main>`
  },
  contact: {
    title: "Contact Chloe (pxdritz)",
    description: "Find Chloe (pxdritz / pxotitas) for commissions, collaborations, Minecraft projects, and friendly conversations.",
    body: `<main><p class="eyebrow">say hello</p><h1>Let's make something nice.</h1>
      <p>For commissions, collaborations, or a friendly hello, you can find me through these public profiles:</p>
      <ul>
        <li><a href="https://discord.com/users/pxotitas">Discord — pxotitas</a></li>
        <li><a href="https://github.com/pxdritz1">GitHub — pxdritz1</a></li>
        <li><a href="https://modrinth.com/user/pxotitas">Modrinth — pxotitas</a></li>
        <li><a href="https://ko-fi.com/pxdritz1">Ko-fi — pxdritz1</a></li>
      </ul><nav><a href="/#contact">Open the interactive contact section</a><a href="/">Home</a></nav></main>`
  }
};

for (const [slug, page] of Object.entries(pages)) {
  const directory = join(dist, slug);
  await mkdir(directory, { recursive: true });
  const cssLinks = stylesheets.map((href) => `<link rel="stylesheet" href="../${href}">`).join("\n    ");
  const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="${page.description}">
    <meta name="author" content="Chloe (pxdritz)">
    <meta name="robots" content="index,follow">
    <link rel="canonical" href="${baseUrl}/${slug}/">
    <meta property="og:type" content="website">
    <meta property="og:site_name" content="pxdritz">
    <meta property="og:title" content="${page.title}">
    <meta property="og:description" content="${page.description}">
    <meta property="og:url" content="${baseUrl}/${slug}/">
    <meta property="og:image" content="${baseUrl}/assets/dragona.png">
    <title>${page.title}</title>
    ${cssLinks}
    ${pageStyle}
  </head>
  <body>
    <header><a href="/">pxdritz.</a></header>
    ${page.body}
    <footer><p>Chloe · pxdritz · pxotitas</p></footer>
  </body>
</html>`;
  await writeFile(join(directory, "index.html"), html);
}

const urls = ["", "projects/", "gallery/", "about/", "contact/"];
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((url) => `  <url><loc>${baseUrl}/${url}</loc><lastmod>2026-10-31</lastmod></url>`).join("\n")}
</urlset>
`;
await writeFile(join(dist, "sitemap.xml"), sitemap);
console.log("Generated prerendered homepage, four SEO pages, and sitemap.");
