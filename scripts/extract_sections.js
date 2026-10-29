import fs from 'fs';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const { PDFParse } = require('pdf-parse');

async function inspectSections() {
  const buf = fs.readFileSync('public/assets/aistudio/Oficio-Diario-e-Lecionario-REB__1__30c52349.pdf');
  const parser = new PDFParse({ data: buf });
  await parser.load();
  const res = await parser.getText();
  
  const sections = {
    matutino: { start: 17, end: 32 },
    meioDia: { start: 33, end: 38 },
    vespertino: { start: 39, end: 50 },
    completas: { start: 51, end: 58 },
    canticos: { start: 59, end: 70 },
    familias: { start: 71, end: 92 },
    semana: { start: 93, end: 110 }
  };

  const output = {};
  for (const [key, range] of Object.entries(sections)) {
    let text = '';
    for (let p = range.start; p <= range.end; p++) {
      const pageObj = res.pages[p - 1]; // 1-indexed to 0-indexed
      text += `\n\n==================== [PÁGINA ${p}] ====================\n` + (pageObj ? pageObj.text : '');
    }
    output[key] = text;
    fs.writeFileSync(`scripts/${key}_pages.txt`, text);
    console.log(`Saved scripts/${key}_pages.txt (p. ${range.start} - ${range.end})`);
  }

  await parser.destroy();
}

inspectSections().catch(console.error);
