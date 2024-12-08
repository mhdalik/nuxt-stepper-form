import axios from "axios";

const config = useRuntimeConfig();
const API_BASE_URL_V1_AUTH = config.public.API_BASE_URL_V1_AUTH;

export const login = (email, password) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${API_BASE_URL_V1_AUTH}/login`, {
        email: email,
        password: password,
      })
      .then((res) => {
        // if (res.status == 200) {
        const token = useCookie("token", { maxAge: 86400 * 30 * 6 });
        const user = useCookie("user");
        token.value = res.data.token;
        user.value = res.data.user;

        resolve({ isLoggedIn: true, user: res.data.user });
      })
      .catch((error) => {
        if (error.response.status == 422) {
          alert(Object.values(error?.response?.data.validation_errors)[0][0]);
        } else if (error.response.status == 401) {
          alert("Invalid email or password");
        } else {
          alert("Login failed");
        }
        // console.log(error.response.status);
        // resolve({ isLoggedIn: false, user: null });
        reject({ isLoggedIn: false, user: null });
      });
  });
};

export const checkAndGetAuthUser = () => {
  const token = useCookie("token");
  const user = useCookie("user");

  return new Promise((resolve, reject) => {
    if (!token.value) reject({ isLoggedIn: false, user: null });

    axios
      .get(`${API_BASE_URL_V1_AUTH}/user`, {
        headers: {
          Authorization: `Bearer ${token.value}`,
        },
      })
      .then((res) => {
        if (res.status == 200) {
          user.value = null;
          user.value = res.data;
          resolve({ isLoggedIn: true, user: res.data });
        } else if (res.status == 403) {
          alert("User not verified");
          reject({ isLoggedIn: false, user: null });
        } else if (res.status == 401) {
          token.value = null; // uncomment these after replacing axios.get by axiosGet composable
          user.value = null;
          reject({ isLoggedIn: false, user: null });
        } else {
          token.value = null;
          user.value = null;
          reject({ isLoggedIn: false, user: null });
        }
      })
      // handle 401 :unauthenticated statu code
      .catch((error) => {
        if (error.response.status == 401) {
          token.value = null;
          user.value = null;
        }
        reject({ isLoggedIn: false, user: null });
        // reject(error);
      });
  });
};

export const getAuthUser = () => {
  const token = useCookie("token");
  const user = useCookie("user");

  if (token.value && user.value) {
    return user.value;
  }
  return null;
};

export const logout = () => {
  const config = useRuntimeConfig();

  const token = useCookie("token");
  const user = useCookie("user");

  return new Promise((resolve, reject) => {
    // token.value = null;
    // user.value = null;
    // navigateTo("/");
    // resolve(true);
    // return true;

    if (!token.value) {
      console.log("User Alredy Unauthenticated");
      // reject("User Unauthenticated");
      // return true;
      resolve(true);
    }
    axios
      .post(`${API_BASE_URL_V1_AUTH}/logout`, null, {
        headers: {
          Authorization: `Bearer ${token.value}`,
        },
      })
      .then((res) => {
        token.value = null;
        user.value = null;
        navigateTo("/");
        resolve(true);
      })
      .catch((error) => {
        token.value = null;
        user.value = null;
        navigateTo("/");
        resolve(true);
        return true;
        reject(error);
      });
  });
};
