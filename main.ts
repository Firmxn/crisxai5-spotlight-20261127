import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const BOT_DIR = process.env.MAKEFUN_BOT_DIR ?? '/bot';
const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

mkdirSync(OUTPUT_DIR, { recursive: true });
try {
  const raw = readFileSync(join(BOT_DIR, 'POST.json'), 'utf8');
  const parsed = JSON.parse(raw) as { url?: unknown };
  if (typeof parsed.url !== 'string' || !parsed.url.startsWith('https://')) {
    throw new Error('POST.json missing valid https url');
  }
  writeFileSync(join(OUTPUT_DIR, 'POST.json'), JSON.stringify({ url: parsed.url.trim() }) + '\n');
} catch (err) {
  console.error(`POST.json could not be processed from ${BOT_DIR}: ${(err as Error).message}`);
  process.exit(1);
}
