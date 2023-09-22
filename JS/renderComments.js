import { postComments } from "./api.js";

export const renderComments = ({ comments, fetchAndRenderComments }) => {
  const appElement = document.getElementById("app");

  const commentsHTML = comments
    .map((comment, index) => {
      return `
            <li class="comment" data-item=${index}>
              <div class="comment-header">
                <div>${comment.author}</div>
                <div>${comment.date}</div>
              </div>
              <div class="comment-body">
                <div class="comment-text">
                  ${comment.comment}
                </div>
              </div>
              <div class="comment-footer">
                <div class="likes">
                  <span class="likes-counter">${comment.likes}</span>
                  <button class="like-button ${
                    comment.isLiked ? "-active-like" : ""
                  }" data-index="${index}"></button>
                </div>
              </div>
            </li>
            `;
    })
    .join("");

  const appHtml = `
    <div class="container">
      <ul class="comments" id="comments-list">${commentsHTML}</ul>
      <div class="add-form" id="form">
        <input
          value="Админ"
          type="text"
          class="add-form-name"
          placeholder="Введите ваше имя"
          id="name-input"
          readonly
        />
        <textarea
          type="textarea"
          class="add-form-text"
          placeholder="Введите ваш коментарий"
          rows="4"
          id="textarea-input"
        ></textarea>
        <div class="add-form-row">
          <button class="add-form-button" id="add-button">Написать</button>
          <button class="add-form-button" id="delete-button">Удалить</button>
        </div>
      </div>
      <a href="./login.html"
        ><p class="auth-text">Чтобы добавить комментарий, авторизируйтесь</p></a
      >
    </div>
    `;

  appElement.innerHTML = appHtml;

  const list = document.getElementById("comments-list");
  const form = document.getElementById("form");
  const nameInput = document.getElementById("name-input");
  const textarea = document.getElementById("textarea-input");
  let addButton = document.getElementById("add-button");
  const delButton = document.getElementById("delete-button");
  const item = document.getElementById("comment");

  // addButton.disabled = true;

  const commentsElements = document.querySelectorAll(".comment");

  for (const editComment of commentsElements) {
    editComment.addEventListener("click", (event) => {
      const i = editComment.dataset.item;

      textarea.value = `
          >${comments[i].comment}
          ${comments[i].author}
          `;
    });
  }

  const addItem = () => {
    const newDate = new Date();
    let day = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();
    let hour = newDate.getHours();
    let minutes = newDate.getMinutes();

    nameInput.classList.remove("error");
    textarea.classList.remove("error");

    if (textarea.value === "" && nameInput.value === "") {
      nameInput.classList.add("error");
      textarea.classList.add("error");
      return;
    } else if (textarea.value === "") {
      textarea.classList.add("error");
      return;
    } else if (nameInput.value === "") {
      nameInput.classList.add("error");
      return;
    }

    if (day < 10) {
      day = "0" + day;
    }
    if (month < 10) {
      month = "0" + month;
    }
    if (hour < 10) {
      hour = "0" + hour;
    }
    if (minutes < 10) {
      minutes = "0" + minutes;
    }

    form.style.display = "none";
    const addMessage = document.createElement("div");
    addMessage.textContent = "Погодите секундочку, комментарий загружается...";
    addMessage.classList.add("add-message");
    form.before(addMessage);

    postComments({ textarea })
      .then(() => {
        return fetchAndRenderComments();
      })
      .then((response) => {
        textarea.value = "";

        // addButton.disabled = true;
      });
    // .catch((err) => {
    //   if (err.message === "Too little symbols") {
    //     alert("Введите более 3 символов");
    //   } else if (err.message === "Server's problem") {
    //     alert("Проблемы с сервером. Попробуйте снова");
    //   } else {
    //     alert("Какие-то проблемы с сетью. Попробуйте позже");
    //   }

    //   addButton.disabled = false;
    // });

    form.style.display = "flex";
    addMessage.remove();

    renderComments({ comments, fetchAndRenderComments });
  };

  const delLast = () => {
    const list = document.getElementById("comments-list");

    list.innerHTML = list.innerHTML.replace(
      list.innerHTML.slice(list.innerHTML.lastIndexOf(`<li >`)),
      ""
    );

    comments.pop();
    initLikesListeners();
    renderComments({ comments, fetchAndRenderComments });
  };

  form.addEventListener("keyup", (e) => {
    if (e.code === "Enter") {
      addItem();
    }
  });

  // addButton.disabled = true;

  nameInput.addEventListener("input", (event) => {
    textarea.addEventListener("input", (e) => {
      if (event.target.value.length > 0 && e.target.value.length > 0) {
        // addButton.disabled = false;
      } else if (event.target.value.length > 0 && e.target.value.length === 0) {
        // addButton.disabled = true;
      } else if (event.target.value.length === 0 && e.target.value.length > 0) {
        // addButton.disabled = true;
      } else if (
        event.target.value.length === 0 &&
        e.target.value.length === 0
      ) {
        // addButton.disabled = true;
      }
    });
  });

  textarea.addEventListener("input", (event) => {
    nameInput.addEventListener("input", (e) => {
      if (event.target.value.length > 0 && e.target.value.length > 0) {
        // addButton.disabled = false;
      } else if (event.target.value.length > 0 && e.target.value.length === 0) {
        // addButton.disabled = true;
      } else if (event.target.value.length === 0 && e.target.value.length > 0) {
        // addButton.disabled = true;
      } else if (
        event.target.value.length === 0 &&
        e.target.value.length === 0
      ) {
        // addButton.disabled = true;
      }
    });
  });

  const initLikesListeners = () => {
    const likesBtns = document.querySelectorAll(".like-button");
    const likes = document.querySelectorAll(".likes");

    for (let likeBtn of likesBtns) {
      likeBtn.addEventListener("click", (event) => {
        const i = likeBtn.dataset.index;
        if (!comments[i].isLiked) {
          comments[i].isLiked = true;
          comments[i].likes = comments[i].likes + 1;
        } else {
          comments[i].isLiked = false;
          comments[i].likes = comments[i].likes - 1;
        }

        event.stopPropagation();
        renderComments({ comments, fetchAndRenderComments });
      });
    }
  };

  initLikesListeners();

  // fetchAndRenderComments();

  addButton.addEventListener("click", () => addItem());
  delButton.addEventListener("click", () => delLast());

  // list.innerHTML = "<li>Комментарии загружаются...</li>";
};
