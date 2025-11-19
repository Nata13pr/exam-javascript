let mainDiv = document.createElement('div');
mainDiv.classList.add('mainDiv');
let user = JSON.parse(localStorage.getItem('user')) || {};
const {address, company, email, id, name, phone, username, website} = user;

let h1 = document.createElement("h1");
h1.innerText = `Username - ${username}`;
let h2 = document.createElement("h2");
h2.innerText =`Name - ${name}`;
let h3 = document.createElement("h3");
h3.innerText = `Phone - ${phone}`;
let h4 = document.createElement("h4");
h4.innerText = `Email - ${email}`;
let h5 = document.createElement("h5");
h5.innerText = `Website - ${website}`;
let pId = document.createElement("p");
pId.innerText = `Id - ${id}`;
let pAddress = document.createElement("p");
pAddress.innerText = `Address details:`;
let addressUl = document.createElement("ul");
for (let key in address) {
   if(typeof address[key] === "object" && !Array.isArray(address[key]) && address[key]!==null ) {
        let mainLi=document.createElement("li");
       mainLi.innerText =`${key}`;
        let ul = document.createElement("ul");
        for (let keyForAddress in address[key]) {
            let li = document.createElement("li");
            li.innerText = `${keyForAddress} - ${address[key][keyForAddress]}`;
            ul.appendChild(li);
        }
        mainLi.appendChild(ul);
        addressUl.appendChild(mainLi);
    }else{
        let li = document.createElement("li");
        li.innerText = `${key} - ${address[key]}`;
        addressUl.appendChild(li)
    }

}
let pCompany=document.createElement("p");
pCompany.innerText = `Company details:`;
let ulCompany=document.createElement("ul");
for (let key in company ){
    let li = document.createElement("li");
    li.innerText = `${key} - ${company[key]}`;
    ulCompany.appendChild(li);
}
let buttonToShowPost = document.createElement("button");
buttonToShowPost.classList.add("showPostButton");
buttonToShowPost.innerText = "post of current user";
const createPostsTitleList=(posts)=>{
    console.log(posts);
    if(!Array.isArray(posts)){
        throw new Error("posts must be an array");
    }else{
        let listOfPostTitles=document.createElement("ul");
        posts.forEach((post)=>{
            let li = document.createElement("li");
            li.innerText = `Title - ${post.title}`;
            let button = document.createElement("button");
            button.innerText = "Details of post";
            button.addEventListener("click", () =>{
                window.location.href ='../post-details/post-details.html';

                localStorage.setItem('post', JSON.stringify(post));
            })
            li.appendChild(button);
            listOfPostTitles.appendChild(li);

        })
        mainDiv.appendChild(listOfPostTitles);
    }
}

buttonToShowPost.addEventListener("click", (e) => {
    e.preventDefault();
    fetch(`https://jsonplaceholder.typicode.com/users/${id}/posts`)
    .then(res => res.json())
    .then(posts => createPostsTitleList(posts));
})

mainDiv.append(h1,h2,h3,h4,h5,pId,pAddress,addressUl,pCompany,ulCompany,buttonToShowPost);
document.body.appendChild(mainDiv);