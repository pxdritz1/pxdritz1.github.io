import { mkdir, stat } from "node:fs/promises";
import { join } from "node:path";
import sharp from "sharp";

const assets = join(process.cwd(), "public", "assets");
const output = join(assets, "optimized");
const artworkFiles = [
  "cujos.png",
  "jolyne-butterfly-aesthetic.png",
  "dragona.png",
  "dragona_cute.png",
  "jojo.png",
  "jolyne.png",
  "unitedtrans.png",
  "6e86120b-b056-46f7-978f-c517e3c1884e.png",
  "skin.png",
  "vectorbloom_lain.png",
];

await mkdir(output, { recursive: true });
const conversions = await Promise.all(artworkFiles.map(async (filename) => {
  const source = join(assets, filename);
  const target = join(output, `${filename.replace(/\.[^.]+$/, "")}.webp`);
  await sharp(source).rotate().webp({ quality: 88, effort: 5 }).toFile(target);
  const [original, optimized] = await Promise.all([stat(source), stat(target)]);
  return { original: original.size, optimized: optimized.size };
}));

const originalSize = conversions.reduce((total, item) => total + item.original, 0);
const optimizedSize = conversions.reduce((total, item) => total + item.optimized, 0);
console.log(`Generated ${artworkFiles.length} WebP artworks: ${(originalSize / 1e6).toFixed(1)} MB → ${(optimizedSize / 1e6).toFixed(1)} MB`);