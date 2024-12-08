import axios from "axios";
const API_BASE_URL = useRuntimeConfig().public.API_BASE_URL;

export const apiGet = (url, config) => {
  const token = useCookie("token");
  // const user = useCookie("user");

  return new Promise((resolve, reject) => {
    axios
      .get(`${API_BASE_URL}${url}`, {
        ...config,
        headers: {
          Authorization: `Bearer ${token.value}`,
        },
      })
      .then((res) => {
        if (res.status == 401) {
          token.value = null;
          resolve({ isLoggedIn: false, user: null });
        }
        resolve(res);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const apiPost = (url, body, config = null) => {
  const token = useCookie("token");
  const API_BASE_URL = useRuntimeConfig().public.API_BASE_URL;

  return new Promise((resolve, reject) => {
    axios
      .post(`${API_BASE_URL}${url}`, body, {
        headers: {
          Authorization: `Bearer ${token.value}`,
        },
        ...config,
      })
      .then((res) => {
        if (res.status == 401) {
          token.value = null;
          resolve({ isLoggedIn: false, user: null });
        }
        resolve(res);
      })
      .catch((error) => {
        if (error.response.status == 422) {
          alert(Object.values(error?.response?.data.validation_errors)[0][0]);
        } else {
          alert(error?.response?.data.message);
        }
        reject(error);
      });
  });
};

export const apiPut = (url, body) => {
  const token = useCookie("token");
  // const API_BASE_URL = useRuntimeConfig().public.API_BASE_URL;

  return new Promise((resolve, reject) => {
    axios
      .put(`${API_BASE_URL}${url}`, body, {
        headers: {
          Authorization: `Bearer ${token.value}`,
        },
      })
      .then((res) => {
        resolve(res);
      })
      .catch((error) => {
        if (error.response.status == 422) {
          alert(Object.values(error?.response?.data.validation_errors)[0][0]);
        } else {
          alert(error?.response?.data.message);
        }
        reject(error);
      });
  });
};

export const apiDelete = (url) => {
  const token = useCookie("token");
  // const API_BASE_URL = useRuntimeConfig().public.API_BASE_URL;

  return new Promise((resolve, reject) => {
    axios
      .delete(`${API_BASE_URL}${url}`, {
        headers: {
          Authorization: `Bearer ${token.value}`,
        },
      })
      .then((res) => {
        resolve(res);
      })
      .catch((error) => {
        alert(error?.response?.data.message);
        reject(error);
      });
  });
};
