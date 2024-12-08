export default defineNuxtRouteMiddleware(async (to, from) => {
  // if (import.meta.server) return; // skip middleware on server

  // const { isLoggedIn, user } = await checkAndGetAuthUser();
  const user = getAuthUser();

  if (user && user?.role == "admin") {
    return;
  } else {
    return abortNavigation();
    return navigateTo("/");
  }
});
