let post = JSON.parse(localStorage.getItem('post')) || {};
const {body, id, title, userId} = post;

let mainDiv = document.createElement('div');
let h1 = document.createElement('h1');
h1.innerText = `Title - ${title}`;
let h2 = document.createElement('h2');
h2.innerText = `Body - ${body}`;
let pId = document.createElement('p');
pId.innerText = `Id: ${id}`;
let p = document.createElement('p');
p.innerText = `UserId: ${userId}`;

const createComments = (comments) => {
    console.log(comments);
    if (!Array.isArray(comments)) {
        throw new Error('Comments must be an array');
    } else {
        let h3 = document.createElement('h3');
        h3.innerText = `Comments :`;
        let ul = document.createElement('ul');
        comments.forEach((comment) => {

            const {body, email, id, name, postId} = comment;
            let li = document.createElement('li');
            let h4 = document.createElement('h4');
            h4.innerText = `Name - ${name}`;
            let h5 = document.createElement('h5');
            h5.innerText = `Body - ${body}`;
            let h6 = document.createElement('h6');
            h6.innerText = `Email - ${email}`;
            let pId = document.createElement('p');
            pId.innerText = `Id: ${id}`;
            let p = document.createElement('p');
            p.innerText = `PostId: ${postId}`;
            li.append(h4, h5, h6, pId, p);
            ul.append(li);
        })
        mainDiv.append(h3,ul)
    }
}

fetch(`https://jsonplaceholder.typicode.com/posts/${id}/comments`)
    .then(res => res.json())
    .then(comments => createComments(comments));

mainDiv.append(h1, h2, pId, p);
document.body.appendChild(mainDiv);