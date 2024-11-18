# Inclus Frontend

Based on Create React App + React Router and easily deployed to Vercel.

## Local development

Install dependencies

```bash
npm install
```

Install eslint pre-commit hook. If you're using a GUI for Git, you might need this [fix for Husky](https://dev.to/studiospindle/using-husky-s-pre-commit-hook-with-a-gui-21ch).

```bash
npm run prepare-hooks
```

Run development server (should start on http://localhost:3000)

```bash
npm start
```

To run a local development server with HTTPS enabled, which is necessary for Geolocation

```bash
HTTPS=true npm start
```

# Deploy your own

1. Adjust imprint and privacy disclaimer in `public/content/imprint.md`, `public/content/privacy-disclaimer.md` and `src/components/Imprint/Imprint.tsx`
2. Set up your own Typeforms and enter the form IDs in `constants/forms.ts`
3. Add your API keys for Mapbox in `constants/api.ts`
4. Add your storage path for photos `constants/api.ts`
5. Add/import data to `public/data/cache-munich.json` (see examples)
