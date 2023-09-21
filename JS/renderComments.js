export const renderComments = ({
  comments,
  list,
  addButton,
  textarea,
  initLikesListeners,
}) => {
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

  list.innerHTML = commentsHTML;
  addButton.disabled = true;

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

  initLikesListeners();
};
