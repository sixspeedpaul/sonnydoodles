# Sonny Doodles Website

## Google Analytics 4 setup

1. In GA4 Admin, create or choose a Web Data Stream and copy the Measurement ID (format: `G-XXXXXXXXXX`).
2. Create a local `.env` file in the project root.
3. Add:

```bash
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

4. Deploy to GitHub Pages after setting the same value as a GitHub Actions secret/variable in your repo settings.

If `VITE_GA_MEASUREMENT_ID` is missing, analytics stays disabled automatically.

## Search indexing sweep

This repo now includes:

- `public/sitemap.xml` with canonical `https://www.sonnydoodles.com/`
- `public/robots.txt` pointing to canonical sitemap URL
- IndexNow key file at `public/54bb180f2d54c9f46767bd867f4f6565.txt`
- Automated post-deploy submission in `.github/workflows/deploy.yml`

Manual one-time account steps still required:

1. Verify `https://www.sonnydoodles.com/` in Google Search Console and submit `https://www.sonnydoodles.com/sitemap.xml`.
2. Use URL Inspection in Google Search Console to request indexing for `https://www.sonnydoodles.com/`.
3. Verify `https://www.sonnydoodles.com/` in Bing Webmaster Tools and submit the same sitemap.

Manual fallback command (if needed):

```bash
npm run indexnow:submit
```

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
