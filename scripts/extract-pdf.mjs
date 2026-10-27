// Extrai o texto do PDF oficial para inspeção (uso em build-time, não embarca no app).
import { getDocument } from 'pdfjs-dist/legacy/build/pdf.mjs';
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';

const pdfPath = process.argv[2] ?? 'public/assets/oficio-diario-lecionario-reb.pdf';
const data = new Uint8Array(readFileSync(pdfPath));
const doc = await getDocument({ data, useSystemFonts: true }).promise;
console.log('pages:', doc.numPages);

mkdirSync('scripts/out', { recursive: true });
const all = [];
for (let i = 1; i <= doc.numPages; i++) {
  const page = await doc.getPage(i);
  const content = await page.getTextContent();
  const text = content.items.map((it) => ('str' in it ? it.str : '')).join(' ');
  all.push(`\n===== PÁGINA ${i} =====\n${text}`);
}
writeFileSync('scripts/out/full-text.txt', all.join('\n'), 'utf8');
console.log('written scripts/out/full-text.txt, chars:', all.join('').length);
// Amostra das primeiras páginas e de uma página do lecionário
console.log(all.slice(0, 3).join('\n').slice(0, 1500));
