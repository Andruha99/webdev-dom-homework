export const getComments = () => {
  return fetch("https://wedev-api.sky.pro/api/v1/andrew-korovin/comments", {
    method: "GET",
  }).then((response) => {
    if (response.status === 500) {
      throw new Error("Server's problem");
    } else {
      return response.json();
    }
  });
};

export const postComments = ({ textarea, nameInput }) => {
  return fetch("https://wedev-api.sky.pro/api/v1/andrew-korovin/comments", {
    method: "POST",
    body: JSON.stringify({
      text: textarea.value,
      name: nameInput.value,
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
