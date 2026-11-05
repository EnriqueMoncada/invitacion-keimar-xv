// Post-build para GitHub Pages (proyecto servido bajo /invitacion-keimar-xv/):
// - vuelve relativas las rutas /_astro/ que Astro emite en dist/index.html
// - crea .nojekyll para que Pages no ignore la carpeta _astro/
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const dist = "dist";
const index = join(dist, "index.html");
let html = readFileSync(index, "utf8");

const antes = html;
html = html.replaceAll('"/_astro/', '"_astro/').replaceAll("'/_astro/", "'_astro/");

writeFileSync(index, html, "utf8");

// .nojekyll: evita que Jekyll de GH Pages filtre carpetas que empiezan con _ _
writeFileSync(join(dist, ".nojekyll"), "");

const cambios = antes.length !== html.length;
console.log("[relativize] rutas ajustadas:", cambios, "| .nojekyll creado");
