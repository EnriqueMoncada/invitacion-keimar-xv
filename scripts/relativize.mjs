// Post-build para GitHub Pages / Netlify:
// - vuelve relativas las rutas /_astro/ que Astro emite en todos los archivos HTML
// - crea .nojekyll para que Pages no ignore la carpeta _astro/
import { readFileSync, writeFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const dist = "dist";

function getHtmlFiles(dir) {
  let results = [];
  const list = readdirSync(dir);
  for (const file of list) {
    const fullPath = join(dir, file);
    const stat = statSync(fullPath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getHtmlFiles(fullPath));
    } else if (file.endsWith(".html")) {
      results.push(fullPath);
    }
  }
  return results;
}

const htmlFiles = getHtmlFiles(dist);
let totalCambios = 0;

for (const filePath of htmlFiles) {
  const content = readFileSync(filePath, "utf8");
  // Si está en una subcarpeta (ej. dist/fotos/index.html), la ruta relativa a _astro es ../_astro/
  const relativeDepth = filePath.replace(dist, "").split(/[\\/]/).filter(Boolean).length - 1;
  const prefix = relativeDepth > 0 ? "../".repeat(relativeDepth) + "_astro/" : "_astro/";
  
  const nuevo = content
    .replaceAll('"/_astro/', `"${prefix}`)
    .replaceAll("'/_astro/", `'${prefix}`);
    
  if (nuevo !== content) {
    writeFileSync(filePath, nuevo, "utf8");
    totalCambios++;
  }
}

// .nojekyll: evita que Jekyll de GH Pages filtre carpetas que empiezan con _
writeFileSync(join(dist, ".nojekyll"), "");

console.log(`[relativize] ${totalCambios} archivo(s) HTML ajustados | .nojekyll creado`);
