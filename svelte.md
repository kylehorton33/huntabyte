# Svelte Knowledge

Using svg icons in SvelteKit: Save the SVG in `src/lib/icons`. Import to route as needed

```javascript
// src/lib/icons/Icon.svelte

<script>
    export let cls;
</script>

<svg aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" class={cls} xmlns="http://www.w3.org/2000/svg">
  <path d="..." stroke-linecap="round" stroke-linejoin="round" />
</svg>

// src/lib/icons/index.js

import Icon from './Icon.svelte';

export { Icon }

// src/routes/path/to/+page.svelte

<script>
    import { Icon } from "$lib/icons";
</script>

<div>
    <Icon cls="h-4 w-4" />
</div>
```

# SvelteKit Hooks

```javascript
// src/hooks.server.js

export const handle = async ({ event, resolve }) => {
  event.locals.pb = SomeConnectionToDB();
  event.locals.user = structuredClone(event.locals.db.getUser());

  const response = await resolve(event);

  return response;
};

// src/+layout.server.js

export const load = ({ locals }) => {
  if (locals.user) {
    return { user: locals.user };
  } else {
    return {
      user: undefined,
    };
  }
};
```

```html
<!-- src/+layout.svelte -->

<script>
  import "../app.pcss";  
  export let data;
</script>

<div class="min-h-full">
      {#if !data.user}
        <PublicData />
      {:else}
        <UserData />
      {/if}
  <div class="py-4">
      <slot />
  </div>
</div>

```