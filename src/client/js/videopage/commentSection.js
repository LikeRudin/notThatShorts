const videoContainer = document.getElementById("videoContainer");
const form = document.getElementById("commentForm");

const deleteBtnArray = document.querySelectorAll(".comment__delete__btn");

const paintComment = (text, id) => {
  const videoComments = document.querySelector(".video__comments ul");
  const comment = document.createElement("li");
  
  comment.dataset.id = id;
  comment.className = "video__comment";
  
  const icon = document.createElement("i");
  icon.className = "fas fa-comment";
  const commentText = document.createElement("span");
  commentText.innerText = ` ${text}`;
  const deleteBtn = document.createElement("span");
  deleteBtn.innerText = "❌";
  
  comment.appendChild(icon);
  comment.appendChild(commentText);
  comment.appendChild(deleteBtn);
  videoComments.prepend(comment);
};

const handleSubmit = async (event) => {
  event.preventDefault();
  const textarea = form.querySelector("textarea");
  const text = textarea.value;
  const videoId = videoContainer.dataset.id;
  if (text === "") {
    return;
  }
  const response = await fetch(`/api/videos/${videoId}/comment`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text }),
  });
  if (response.status === 201) {
    textarea.value = "";
    const { newCommentId } = await response.json();
    paintComment(text, newCommentId);
  }
};

if (form) {
  form.addEventListener("submit", handleSubmit);
}

const handleDelete = async (event) => {
    const comment = event.target.parentElement;
    const {
      dataset: { id },
    } = event.target.parentElement;
  
    const videoId = videoContainer.dataset.id;
  
    const response = await fetch(`/api/videos/${videoId}/comment/delete`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ commentId: id }),
    });
  
    if (response.status === 200) {
        comment.remove();
    }
  };

  if (deleteBtnArray) {
    deleteBtnArray.forEach((span) => span.addEventListener("click", handleDelete));
  }