export let token;

export const setToken = (newToken) => {
  token = newToken;
};

export const getComments = () => {
  return fetch("https://wedev-api.sky.pro/api/v2/andrew-korovin/comments", {
    method: "GET",
  }).then((response) => {
    if (response.status === 500) {
      throw new Error("Server's problem");
    } else {
      return response.json();
    }
  });
};

export const postComments = ({ textarea }) => {
  return fetch("https://wedev-api.sky.pro/api/v2/andrew-korovin/comments", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      text: textarea.value,
    }),
  }).then((response) => {
    console.log(response);
    if (textarea.value.length <= 3) {
      throw new Error("Too little symbols");
    } else if (response.status === 500) {
      throw new Error("Server's problem");
    } else {
      return response.json();
    }
  });
};

export const login = ({ login, password }) => {
  return fetch("https://wedev-api.sky.pro/api/user/login", {
    method: "POST",
    body: JSON.stringify({
      login,
      password,
    }),
  })
    .then((response) => {
      if (response.status === 400) {
        throw new Error("Wrong login or password");
      } else {
        return response.json();
      }
    })
    .catch((err) => {
      if (err.message === "Wrong login or password") {
        alert("Неверный логин или пароль");
      }
    });
};
