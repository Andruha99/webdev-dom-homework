import { renderComments } from "./renderComments.js";
import { getComments, postComments } from "./api.js";
import { renderLogin } from "./loginPage.js";
import { format } from "date-fns";

let comments = [];

export const fetchAndRenderComments = () => {
  getComments().then((response) => {
    comments = response.comments.map((comment) => {
      const createDate = format(new Date(comment.date), "yyyy-MM-dd hh.mm.ss");

      const commentDate = new Date(comment.date);
      let day = commentDate.getDate();
      let month = commentDate.getMonth() + 1;
      let year = commentDate.getFullYear();
      let hour = commentDate.getHours();
      let minutes = commentDate.getMinutes();

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

      const stringDate = `${day}.${month}.${year} ${hour}:${minutes}`;

      return {
        author: comment.author.name,
        date: createDate,
        comment: comment.text,
        likes: comment.likes,
        isLiked: comment.isLiked,
      };
    });
    renderComments({ comments, fetchAndRenderComments });
  });
};

fetchAndRenderComments();
