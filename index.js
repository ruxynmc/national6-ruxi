console.log("JavaScript - AJAX");

const articleListHtml = document.querySelector(".article-list");

document.getElementById("get-data").addEventListener('click', getData);

function getData() {
    fetch("https://simple-json-server-scit.herokuapp.com/posts")
        .then(handleFetchResponse)
        .then(useJSONResponse);
  }

function handleFetchResponse(response) {
    console.log("response", response);
    return response.json();
}

function useJSONResponse(json) {
    console.log(json);
    renderArticles(json);
}

function renderArticles(articleList) {
    articleListHtml.innerText = "";
    for (const articleData of articleList) {
        console.log(articleData);
        renderArticle(articleData);
    }
}

function renderArticle(articleData) {
    const article = document.createElement("div");
    const articleTitle = document.createElement("h3");
    const articleContent = document.createElement("p");

    article.appendChild(articleTitle);
    article.appendChild(articleContent);

    articleListHtml.appendChild(article);

    articleTitle.innerText = articleData.title;
    articleContent.innerText = articleData.content;

    fetch(`https://simple-json-server-scit.herokuapp.com/comments?postId=${articleData.id}`)
    .then(handleFetchResponse)
    .then(function() {
        const commentList = document.createElement("div");
        commentList.classList.add("comment-list");
        article.appendChild(commentList);

        for (const commentData of commentList) {
            const articleComment = document.createElement("div");
            articleComment.classList.add("comment");
            const commentUser = document.createElement("h4");
            const commentContent = document.createElement("p");

            articleComment.appendChild(commentUser);
            articleComment.appendChild(commentContent);

            commentList.appendChild(articleComment);

            commentUser.innerText = commentData.username;
            commentContent.innerText = commentData.content;
        }
    });
}