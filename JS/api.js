export let token;
// "Bearer asb4c4boc86gasb4c4boc86g37w3cc3bo3b83k4g37k3bk3cg3c03ck4k";

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
    if (textarea.value.length <= 3 || nameInput.value.length <= 3) {
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

// {
// 	"user": {
// 		"_id": "6421860c32e0301869fb3301",
// 		"login": "admin",
// 		"password": "admin",
// 		"name": "Админ",
// 		"token": "asb4c4boc86gasb4c4boc86g37w3cc3bo3b83k4g37k3bk3cg3c03ck4k",
// 		"imageUrl": "https://storage.yandexcloud.net/skypro-webdev-homework-bucket/1680601502867-%25C3%2590%25C2%25A1%25C3%2590%25C2%25BD%25C3%2590%25C2%25B8%25C3%2590%25C2%25BC%25C3%2590%25C2%25BE%25C3%2590%25C2%25BA%2520%25C3%2591%25C2%258D%25C3%2590%25C2%25BA%25C3%2591%25C2%2580%25C3%2590%25C2%25B0%25C3%2590%25C2%25BD%25C3%2590%25C2%25B0%25202023-04-04%2520%25C3%2590%25C2%25B2%252014.04.29.png"
// 	}
// }
