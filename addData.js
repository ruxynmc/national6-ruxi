console.log("JavaScript - AJAX");
console.log("CRUD Operation - Create");


document
    .getElementById("add-article-button")
    .addEventListener("click", function () {
        const articleTitle = document.getElementById('article-title').value;
        console.log('articleTitle', articleTitle);

        const articleContent = document.getElementById('article-content').value;
        console.log('articleContent', articleContent);

        if (articleTitle && articleContent) {
            const payload = {
                articleTitle: articleTitle,
                articleContent: articleContent,
            };
    
            console.log('Payload:', payload);
            console.log('Payload Text:', JSON.stringify(payload));
    
            fetch('https://simple-json-server-scit.herokuapp.com/posts', {
                method: 'POST', 
                mode: 'cors', // no-cors, *cors, same-origin
                cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                credentials: 'same-origin', // include, *same-origin, omit
                headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                redirect: 'follow', // manual, *follow, error
                referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
                body: JSON.stringify(payload) // body data type must match "Content-Type" header
            }).then(getData);
        }

    });