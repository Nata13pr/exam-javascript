let mainDiv = document.createElement('div');
mainDiv.classList.add('mainDiv');

let user = JSON.parse(localStorage.getItem('user')) || {};
const {address, company, email, id, name, phone, username, website} = user;

let h1 = document.createElement("h1");
h1.innerText = `Username - ${username}`;
let pName = document.createElement("p");
pName.innerText = `Name - ${name}`;
let pPhone = document.createElement("p");
pPhone.innerText = `Phone - ${phone}`;
let pEmail = document.createElement("p");
pEmail.innerText = `Email - ${email}`;
let pWebsite = document.createElement("p");
pWebsite.innerText = `Website - ${website}`;
let pId = document.createElement("p");
pId.innerText = `Id - ${id}`;
let pAddress = document.createElement("p");
pAddress.innerText = `Address details:`;
let addressUl = document.createElement("ul");

for (let key in address) {
    if (typeof address[key] === "object" && !Array.isArray(address[key]) && address[key] !== null) {
        let mainLi = document.createElement("li");
        mainLi.innerText = `${key}`;
        let ul = document.createElement("ul");

        for (let keyForAddress in address[key]) {
            let li = document.createElement("li");
            li.innerText = `${keyForAddress} - ${address[key][keyForAddress]}`;
            ul.appendChild(li);
        }
        mainLi.appendChild(ul);
        addressUl.appendChild(mainLi);
    } else {
        let li = document.createElement("li");
        li.innerText = `${key} - ${address[key]}`;
        addressUl.appendChild(li)
    }

}
let pCompany = document.createElement("p");
pCompany.innerText = `Company details:`;
let ulCompany = document.createElement("ul");

for (let key in company) {
    let li = document.createElement("li");
    li.innerText = `${key} - ${company[key]}`;
    ulCompany.appendChild(li);
}

let buttonToShowPost = document.createElement("button");
buttonToShowPost.classList.add("showPostButton");
buttonToShowPost.innerText = "post of current user";
let divWithPostsTitles=document.createElement('div');
divWithPostsTitles.classList.add("postsTitleDiv");

const createPostsTitleList = (posts) => {

    if (!Array.isArray(posts)) {
        throw new Error("posts must be an array");
    } else {
        let listOfPostTitles = document.createElement("ul");
        listOfPostTitles.classList.add("listOfPostTitles");
        posts.forEach((post) => {
            let li = document.createElement("li");
            li.classList.add("postTitleLi");
            let h2 = document.createElement("h2");
            h2.innerText = `Title`;
            let p = document.createElement("p");
            p.innerText = `${post.title}`;

            let button = document.createElement("button");
            button.classList.add("details");
            button.innerText = "Details of post";
            button.addEventListener("click", () => {
                window.location.href = '../post-details/post-details.html';

                localStorage.setItem('post', JSON.stringify(post));
            })
            li.append(h2, p,button)
            listOfPostTitles.appendChild(li);
        })
        divWithPostsTitles.appendChild(listOfPostTitles);
    }
}

buttonToShowPost.addEventListener("click", (e) => {
    e.preventDefault();
    fetch(`https://jsonplaceholder.typicode.com/users/${id}/posts`)
        .then(res => res.json())
        .then(posts => createPostsTitleList(posts));
})

mainDiv.append(h1, pName, pEmail, pEmail, pWebsite, pId, pAddress, addressUl, pCompany, ulCompany, buttonToShowPost,divWithPostsTitles);
document.body.appendChild(mainDiv);
