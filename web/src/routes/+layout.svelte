<script>
  import "../app.pcss";
  import AuthLinks from "$lib/components/AuthLinks.svelte";
  import UserLinks from "$lib/components/UserLinks.svelte";
  export let data;
</script>

<div class="min-h-full">
  <nav class="navbar bg-base-100 border-b">
    <div class="flex-1">
      <a href="/" class="btn btn-ghost normal-case text-xl">Showcase</a>
    </div>
    <div class="flex-none">
      {#if !data.user}
        <AuthLinks />
      {:else}
        <UserLinks />
      {/if}
    </div>
  </nav>
  <div class="py-4">
    <div class="mx-auto max-w-7xl sm:px-6 lg:px-8 px-2">
      <slot />
    </div>
  </div>
</div>
