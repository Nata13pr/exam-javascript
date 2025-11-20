let mainDiv = document.getElementById("mainDiv");
const listOfUsersElement = document.createElement('ul');
listOfUsersElement.classList.add('listOfUsers');

const createUserFunction = (users) => {
    if (!Array.isArray(users)) {
        throw new Error('This is not an array');
    }
    users.forEach(user => {
        const {name, id} = user;
        let li = document.createElement("li");
        li.classList.add('elementOfList');

        let h1 = document.createElement("h1");
        h1.innerText = `Name - ${name}`;
        let p = document.createElement("p");
        p.innerText = `Id - ${id}`;

        let button = document.createElement("button");
        button.innerText = 'Деталі';
        button.addEventListener("click", () => {
            window.location.href = 'user-details/user-details.html'
            localStorage.setItem('user', JSON.stringify(user));
        })
        li.append(h1, p, button);
        listOfUsersElement.appendChild(li);
    })
}
mainDiv.appendChild(listOfUsersElement);

document.body.appendChild(mainDiv);
fetch('https://jsonplaceholder.typicode.com/users')
    .then(res => res.json())
    .then(users => createUserFunction(users));