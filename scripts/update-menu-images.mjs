import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const envPath = path.join(root, '.env');
const menuPath = path.join(root, 'lib/data/menu.ts');

function parseEnv(text) {
  const result = {};
  text.split('\n').forEach((line) => {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) return;
    const index = trimmed.indexOf('=');
    if (index === -1) return;
    const key = trimmed.slice(0, index).trim();
    const value = trimmed.slice(index + 1).trim();
    result[key] = value;
  });
  return result;
}

const envText = await readFile(envPath, 'utf8');
const env = parseEnv(envText);
const accessKey = process.env.UNSPLASH_ACCESS_KEY || env.UNSPLASH_ACCESS_KEY;

if (!accessKey) {
  console.error('Missing UNSPLASH_ACCESS_KEY in .env');
  process.exit(1);
}

const menuText = await readFile(menuPath, 'utf8');

const itemRegex = /\{\n\s+id: '([^']+)'[\s\S]*?\n\s+image:\n\s+'([^']+)'[\s\S]*?\n\s+\}/g;
const nameRegex = /name: '([^']+)'/;
const descriptionRegex = /description: '([^']+)'/;

let match;
let updated = menuText;

while ((match = itemRegex.exec(menuText)) !== null) {
  const block = match[0];
  const id = match[1];
  const nameMatch = block.match(nameRegex);
  const descriptionMatch = block.match(descriptionRegex);
  if (!nameMatch || !descriptionMatch) continue;
  const name = nameMatch[1];
  const description = descriptionMatch[1];

  const candidates = [`${name} ${description}`, name];
  let imageUrl = null;

  for (const candidate of candidates) {
    const query = encodeURIComponent(candidate);
    const url = `https://api.unsplash.com/search/photos?query=${query}&per_page=3&orientation=landscape`;

    const response = await fetch(url, {
      headers: {
        Authorization: `Client-ID ${accessKey}`
      }
    });

    if (!response.ok) {
      console.warn(`Unsplash search failed for ${id}: ${response.status}`);
      continue;
    }

    const data = await response.json();
    const first = data?.results?.[0];
    if (first?.urls?.raw) {
      imageUrl = `${first.urls.raw}&w=800&auto=format&fit=crop&q=80`;
      break;
    }
  }

  if (!imageUrl) {
    console.warn(`No Unsplash result for ${id}`);
    continue;
  }
  const updatedBlock = block.replace(/image:\n\s+'[^']+'/m, `image:\n      '${imageUrl}'`);
  updated = updated.replace(block, updatedBlock);
  console.log(`Updated ${id} -> ${imageUrl}`);
}

await writeFile(menuPath, updated, 'utf8');
console.log('Menu images updated.');
