export default defineNuxtRouteMiddleware(async (to, from) => {
  const user = getAuthUser();

  if (user && user?.role == "club_owner") {
    return;
  } else {
    return abortNavigation();
    return navigateTo("/");
  }
});

// export default defineNuxtRouteMiddleware(async (to, from) => {
//   // return
//   console.log("isLoggedIn: ");
//   const { isLoggedIn, user } = await checkAndGetAuthUser();
//   console.log("isLoggedIn: " + isLoggedIn);
//   if (isLoggedIn && user?.role == "club_owner") {
//     return;
//   } else {
//     console.log("club middleware elseblock");
//     alert("You must be logged in as club user");
//     return navigateTo("/");
//   }
//   console.log("club middleware end");
// });
