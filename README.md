# pxdritz portfolio

Personal portfolio of Chloe (pxdritz), developer and artist. The interface follows the “Quiet character” reference in `context/`, including its typography, neutral palette, artwork treatments, motion, and responsive layout.

## Stack

- Angular 22 standalone components
- TypeScript 6 with strict template checking
- Tailwind CSS 4 design tokens and the original CSS system
- GitHub Pages deployment through GitHub Actions

## Development

```bash
npm ci
npm start
```

The dev server is available at `http://localhost:4200/`.

## Build

```bash
npm run build
```

Angular writes the application to `dist/pxdritz-portfolio/browser`; the build then generates static SEO pages for `/about/`, `/projects/`, `/gallery/`, and `/contact/`, plus the sitemap. GitHub Pages publishes that browser directory.

## Source layout

- `src/app/components/` contains standalone page and interaction components.
- `src/app/services/` contains shared live project data and toast state.
- `src/app/data/` contains typed artwork and project data.
- `src/styles.css` defines Tailwind tokens and the original visual system.
- `public/assets/` contains the original artwork, font, and icons.
- `context/` is the preserved design reference and source material.

## License

The source code is available under the [pxdritz attribution license](LICENSE). Reuse requires credit to **pxdritz1** and a link to [this repository](https://github.com/pxdritz1/pxdritz1.github.io). Artwork, media, third-party dependencies, and external services may have separate terms.
