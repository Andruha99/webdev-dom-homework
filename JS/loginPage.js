import { login, setToken, token } from "./api.js";
import { setUserName } from "./renderComments.js";

export const renderLogin = ({ fetchAndRenderComments }) => {
  const appElement = document.getElementById("app");
  const loginHtml = `
  <div class="container">
      <div class="add-form" id="form">
        <input
          type="text"
          class="add-form-name login-form-login"
          placeholder="Введите логин"
          id="login-input"
        />
        <input
          type="password"
          class="add-form-name login-form-password"
          placeholder="Введите пароль"
          id="password-input"
        />
        <div class="add-form-row">
          <button class="enter-form-button" id="enter-button">Войти</button>
        </div>
      </div>
    </div>
  `;

  appElement.innerHTML = loginHtml;

  const buttonElement = document.getElementById("enter-button");
  const loginInputElement = document.getElementById("login-input");
  const passwordInputElement = document.getElementById("password-input");

  buttonElement.addEventListener("click", () => {
    login({
      login: loginInputElement.value,
      password: passwordInputElement.value,
    })
      .then((responseData) => {
        console.log(responseData);
        console.log(token);
        setToken(responseData.user.token);
        setUserName(responseData.user.name);
        console.log(token);
      })
      .then(() => {
        fetchAndRenderComments();
      });
  });
};
