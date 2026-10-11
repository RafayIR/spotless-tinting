/**
 * One-time migration: static gallery (src/data/projects.ts + public/portfolio-images)
 * -> Wix Media Manager + `PortfolioProjects` CMS collection.
 *
 *   npm run migrate:wix                         dry run (read-only, nothing is written)
 *   npm run migrate:wix -- --apply              upload images + create items
 *   npm run migrate:wix -- --apply --only lexus-es-hybrid-silver     one project
 *   npm run migrate:wix -- --apply --limit 3    first 3 projects
 *
 * Safe to re-run: uploaded files are remembered in scripts/.wix-migration-cache.json and
 * projects whose slug already exists in the collection are skipped.
 *
 * Needs WIX_API_KEY + WIX_SITE_ID in .env.local (key needs Wix Data read+write and
 * Media Manager upload permissions).
 */
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { extname, resolve } from 'node:path';
import { ApiKeyStrategy, createClient } from '@wix/sdk';
import { items } from '@wix/data';
import { files } from '@wix/media';
import { projects, type Project } from '../src/data/projects';

const ROOT = resolve(process.cwd());
const CACHE_FILE = resolve(ROOT, 'scripts/.wix-migration-cache.json');
const PUBLIC_DIR = resolve(ROOT, 'public');
const UPLOAD_CONCURRENCY = 3;

// ---------- args / env ----------
const args = process.argv.slice(2);
const apply = args.includes('--apply');
const argValue = (flag: string) => {
  const i = args.indexOf(flag);
  return i >= 0 ? args[i + 1] : undefined;
};
const only = argValue('--only');
const limit = argValue('--limit') ? Number(argValue('--limit')) : undefined;

function loadEnvFile(path: string) {
  if (!existsSync(path)) return;
  for (const line of readFileSync(path, 'utf8').split(/\r?\n/)) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
    if (!m || process.env[m[1]] !== undefined) continue;
    process.env[m[1]] = m[2].replace(/^["']|["']$/g, '');
  }
}
loadEnvFile(resolve(ROOT, '.env.local'));
loadEnvFile(resolve(ROOT, '.env'));

const apiKey = process.env.WIX_API_KEY;
const siteId = process.env.WIX_SITE_ID;
const collectionId = process.env.WIX_PORTFOLIO_COLLECTION || 'PortfolioProjects';
if (!apiKey || !siteId) {
  console.error('Missing WIX_API_KEY or WIX_SITE_ID in .env.local');
  process.exit(1);
}

const wix = createClient({
  auth: ApiKeyStrategy({ apiKey, siteId }),
  modules: { items, files },
});

// ---------- upload cache ----------
type Uploaded = { src: string; url: string };
const cache: Record<string, Uploaded> = existsSync(CACHE_FILE)
  ? JSON.parse(readFileSync(CACHE_FILE, 'utf8'))
  : {};
const saveCache = () => writeFileSync(CACHE_FILE, JSON.stringify(cache, null, 2));

const MIME: Record<string, string> = {
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.webp': 'image/webp',
};

/** `/portfolio-images/a/b.jpg` -> absolute path inside /public. */
const localPath = (publicUrl: string) => resolve(PUBLIC_DIR, publicUrl.replace(/^\//, ''));

function mediaIdFromUrl(url: string): string | null {
  const m = url.match(/\/media\/([^/?#]+)/);
  return m ? m[1] : null;
}

async function uploadImage(publicUrl: string): Promise<Uploaded> {
  const hit = cache[publicUrl];
  if (hit) return hit;

  const path = localPath(publicUrl);
  const mime = MIME[extname(path).toLowerCase()];
  if (!mime) throw new Error(`Unsupported image type: ${publicUrl}`);
  const bytes = readFileSync(path);
  const fileName = publicUrl.replace(/^\/portfolio-images\//, '').replace(/\//g, '_');

  const { uploadUrl } = await wix.files.generateFileUploadUrl(mime, {
    fileName,
    sizeInBytes: String(bytes.length),
  });

  const res = await fetch(`${uploadUrl}?filename=${encodeURIComponent(fileName)}`, {
    method: 'PUT',
    headers: { 'Content-Type': mime },
    body: bytes,
  });
  if (!res.ok) throw new Error(`Upload failed (${res.status}) for ${publicUrl}: ${await res.text()}`);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const json = (await res.json()) as any;
  const file = json.file ?? json;
  const url: string | undefined = file.url;
  if (!url) throw new Error(`Upload response had no file url for ${publicUrl}`);

  // Prefer the wix:image:// URI (carries dimensions); fall back to the static URL
  const imageUri: string | undefined = file.media?.image?.image;
  const mediaId = mediaIdFromUrl(url);
  const src =
    typeof imageUri === 'string' && imageUri.startsWith('wix:image')
      ? imageUri
      : mediaId
        ? `wix:image://v1/${mediaId}/${encodeURIComponent(fileName)}`
        : url;

  const uploaded = { src, url };
  cache[publicUrl] = uploaded;
  saveCache();
  return uploaded;
}

async function mapLimit<T, R>(list: T[], n: number, fn: (item: T) => Promise<R>): Promise<R[]> {
  const out: R[] = new Array(list.length);
  let next = 0;
  await Promise.all(
    Array.from({ length: Math.min(n, list.length) }, async () => {
      while (next < list.length) {
        const i = next++;
        out[i] = await fn(list[i]);
      }
    }),
  );
  return out;
}

// ---------- main ----------
async function existingSlugs(): Promise<Set<string>> {
  const slugs = new Set<string>();
  const res = await wix.items.query(collectionId).limit(1000).find();
  for (const it of res.items as Array<{ slug?: string }>) if (it.slug) slugs.add(it.slug);
  return slugs;
}

function imagesOf(p: Project): string[] {
  const all = [p.image, ...(p.gallery ?? [])];
  return Array.from(new Set(all));
}

async function main() {
  let selected = projects.map((p, i) => ({ project: p, order: i }));
  if (only) selected = selected.filter(({ project }) => project.slug === only);
  if (limit) selected = selected.slice(0, limit);
  if (selected.length === 0) {
    console.error(only ? `No project with slug "${only}"` : 'No projects selected');
    process.exit(1);
  }

  const missing: string[] = [];
  let imageCount = 0;
  for (const { project } of selected) {
    for (const img of imagesOf(project)) {
      imageCount++;
      if (!existsSync(localPath(img))) missing.push(img);
    }
  }

  console.log(`Mode: ${apply ? 'APPLY (writes to Wix)' : 'DRY RUN (read-only)'}`);
  console.log(`Collection: ${collectionId}`);
  console.log(`Projects: ${selected.length}, images: ${imageCount}, already uploaded: ${Object.keys(cache).length}`);
  if (missing.length) {
    console.error(`\n${missing.length} image file(s) not found locally:`);
    missing.slice(0, 20).forEach((m) => console.error('  ' + m));
    process.exit(1);
  }

  const have = await existingSlugs();
  const todo = selected.filter(({ project }) => !have.has(project.slug));
  console.log(`Already in Wix (skipped): ${selected.length - todo.length}`);
  console.log(`To create: ${todo.length}\n`);

  if (!apply) {
    for (const { project, order } of todo) {
      console.log(`  #${order + 1} ${project.slug}  [${project.category}]  ${imagesOf(project).length} image(s)`);
    }
    console.log('\nDry run only. Re-run with --apply to upload and create items.');
    return;
  }

  let created = 0;
  for (const { project, order } of todo) {
    process.stdout.write(`${project.slug} ... `);
    const imgs = imagesOf(project);
    const uploaded = await mapLimit(imgs, UPLOAD_CONCURRENCY, uploadImage);
    const bySource = new Map(imgs.map((u, i) => [u, uploaded[i]]));
    const cover = bySource.get(project.image)!;
    const gallery = (project.gallery?.length ? project.gallery : [project.image]).map(
      (u) => bySource.get(u)!,
    );

    await wix.items.insert(collectionId, {
      title: project.title,
      slug: project.slug,
      shortDescription: project.description,
      description: project.description,
      coverImage: cover.src,
      galleryImages: gallery.map((g) => ({ type: 'image', src: g.src })),
      category: project.category,
      location: project.location ?? '',
      service: project.service,
      featured: false,
      displayOrder: order,
      published: true,
    });
    created++;
    console.log(`ok (${imgs.length} images)`);
  }
  console.log(`\nDone. Created ${created} item(s).`);
}

main().catch((err) => {
  console.error('\nMigration failed:', err instanceof Error ? err.message : err);
  process.exit(1);
});
