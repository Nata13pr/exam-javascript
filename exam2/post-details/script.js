let post = JSON.parse(localStorage.getItem('post')) || {};
const {body, id, title, userId} = post;

let mainDiv = document.createElement('div');
mainDiv.classList.add('mainDiv')
let h1 = document.createElement('h1');
h1.innerText = `Title - ${title}`;
let pBody = document.createElement('p');
pBody.innerText = `Body - ${body}`;
let pId = document.createElement('p');
pId.innerText = `Id: ${id}`;
let p = document.createElement('p');
p.innerText = `UserId: ${userId}`;
let h2 = document.createElement('h2');
h2.innerText = `Comments :`;
let commentsDiv = document.createElement('div');
commentsDiv.classList.add('commentsDiv');

const createComments = (comments) => {
    console.log(comments);
    if (!Array.isArray(comments)) {
        throw new Error('Comments must be an array');
    } else {

        let ulComments = document.createElement('ul');
        ulComments.classList.add('commentsUl');
        comments.forEach((comment) => {

            const {body, email, id, name, postId} = comment;
            let li = document.createElement('li');
            li.classList.add('commentLi');
            let h3 = document.createElement('h3');
            h3.innerText = `Name - ${name}`;
            let pBodyComment = document.createElement('p');
            pBodyComment.innerText = `Body - ${body}`;
            let pEmail = document.createElement('p');
            pEmail.innerText = `Email - ${email}`;
            let pId = document.createElement('p');
            pId.innerText = `Id: ${id}`;
            let p = document.createElement('p');
            p.innerText = `PostId: ${postId}`;
            li.append(h3, pBodyComment, pEmail, pId, p);
            ulComments.append(li);
        })
        commentsDiv.appendChild( ulComments)
        // mainDiv.append(commentsDiv)
    }
}

fetch(`https://jsonplaceholder.typicode.com/posts/${id}/comments`)
    .then(res => res.json())
    .then(comments => createComments(comments));


mainDiv.append(h1, pBody, pId, p,h2, commentsDiv);
document.body.appendChild(mainDiv);