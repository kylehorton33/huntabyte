import PocketBase from "pocketbase";

const PB_HOST = process.env.POCKETBASE_HOST || "http://localhost:8090";

export const handle = async ({ event, resolve }) => {
  event.locals.pb = new PocketBase(PB_HOST);
  event.locals.pb.authStore.loadFromCookie(
    event.request.headers.get("cookie") || ""
  );

  try {
    if (event.locals.pb.authStore.isValid) {
      await event.locals.pb.collection("users").authRefresh();
      event.locals.user = structuredClone(event.locals.pb.authStore.model);
      event.locals.user.host = PB_HOST;
    }
  } catch (error) {
    console.log(error);
    event.locals.pb.authStore.clear();
    event.locals.user = undefined;
  }
  
  const response = await resolve(event);

  response.headers.set(
    "set-cookie",
    event.locals.pb.authStore.exportToCookie({ secure: false })
  );

  return response;
};
