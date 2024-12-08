export default defineNuxtRouteMiddleware(async (to, from) => {
  const user = getAuthUser();

  if (user?.role == "admin") {
    return navigateTo("/admins/candidates");
  }
  if (user?.role == "club_owner") {
    return navigateTo("/clubs/candidates");
  }

  return;
});

// export default defineNuxtRouteMiddleware(async (to, from) => {
//   // const token = useCookie("token");
//   console.log("g");
//   // const { isLoggedIn, user } = await checkAndGetAuthUser();
//   const user = getAuthUser();
//   console.log("from " + from.path);
//   console.log("to " + to.path);
//   if (user?.role == "admin" && from.fullPath != "/") {
//     return navigateTo(to.path);
//     return navigateTo("/admins/candidates");
//   }

//   if (user?.role == "club_owner") {
//     return navigateTo("/clubs/candidates");
//   }
//   return;
//   // if (user?.role == "admin" && from.fullPath == "/") {
//   // }
//   // if (user?.role == "club_owner" && from.fullPath == "/") {
//   //   return navigateTo("/clubs/candidates");
//   // }

//   // return abortNavigation();
// });
