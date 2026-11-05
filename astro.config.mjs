import { defineConfig } from 'astro/config';

export default defineConfig({
  // URL principal en producción (Netlify)
  // Si cambias el nombre del sitio, actualiza aquí también
  site: 'https://enriquemoncada.github.io/invitacion-keimar-xv/',
  trailingSlash: 'never',
  // CSS incrustado en el HTML: las url('assets/...') resuelven relativas (GitHub Pages)
  build: { inlineStylesheets: 'always' },
});
