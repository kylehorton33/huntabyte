# Tailwind and DaisyUI with SvelteKit

Create the Svelte Application

```
npm create svelte@latest web
cd web
npx svelte-add@latest tailwindcss
npm i
npm i -D daisyui
```
In `tailwind.config.cjs` update to include `daisyui`.

```javascript
9   plugins: [require('daisyui')],
```

Add files to the `src/` directory:

```
├── src/
    ├── lib/
    ├── routes/
        ├── +layout.svelte
        └── +page.svelte
    ├── app.html
    └── app.pcss
```