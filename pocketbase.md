# How to use PocketBase

https://pocketbase.io/docs/

```console
mkdir backend
cd backend/
curl -L -o pb19 https://github.com/pocketbase/pocketbase/releases/download/v0.19.4/pocketbase_0.19.4_linux_amd64.zip
unzip pb19
rm pb19
echo "/pb_data" >> .gitignore
./pocketbase serve
```

This will start a server at `http://127.0.0.1:8090` with a REST API at `/api` and an Admin UI at `/_`. Visit the Admin UI to create admin login credentials and create collections.

# Access PocketBase from Front End (Svelte)

Create the Svelte Application

```
npm create svelte@latest web
cd web
npm i
npm i pocketbase
```

Add files to the `src/` directory:

```
├── src/
    ├── lib/
    ├── routes/
        ├── +layout.server.js
        ├── +layout.svelte
        └── +page.svelte
    ├── app.html
    └── hooks.server.js
```

Use `hooks.server.js` to instantiate link to PocketBase, get user cookie (if it exists), and make data avilable to app through `event.locals`

```javascript
import PocketBase from 'pocketbase'

export const handle = async({event, resolve}) => {
    // create a new client instane
    event.locals.pb = new PocketBase('http://localhost:8090')

    // get cookie (if it exists) and load user from cookie
    event.locals.pb.authStore.loadFromCookie(event.request.headers.get('cookie') || '')

    // if the auth data is valid, set event.locals.user with user data
    if (event.locals.pb.authStore.isValid) {
        event.locals.user = structuredClone(event.locals.pb.authStore.model)
    } else {
        event.locals.user = undefined
    }

    // resolve() genenerates a response from the event/request
    const response = await resolve(event);

    // set-cookie to new auth data
    response.headers.set('set-cookie', event.locals.pb.authStore.exportToCookie({ secure: false }))

    // send the response back to the client
    return response;
}
```


- https://kit.svelte.dev/docs/hooks
- `handle` runs every time SvelteKit server receives a request
- `event.locals` object can be populated to be passed to handlers in `+server.js` files.


Get the user from `+layout.server.js`

```javascript
export const load = ({locals}) => {
    if (locals.user) {
        return {
            user: locals.user
        }
    } else {
        return {
            user: undefined
        }
    }
}
```

Use the user info in `+layout.svelte`

```javascript
<script>
  export let data;
</script>

<div class="min-h-full">
  <nav>
      {#if !data.user}
        <PublicData />
      {:else}
        <UserData />
      {/if}
  </nav>
  <div class="py-4">
      <slot />
  </div>
</div>
```