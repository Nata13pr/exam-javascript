let form = document.forms[0];

let array = [];

const createList = (arrayList) => {
    for (let item of arrayList) {
        let li = document.createElement("li");
        li.innerText = item;
        li.style.fontSize = '20px'

        ul.appendChild(li);
    }
}
let ul = document.getElementById('listOfNamesAndValues');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    let nameValue = form.nameValue.value.trim();

    const regExp = /^[a-zA-Z0-9]+[ \W]+[a-zA-Z0-9]+$/g

    const match = nameValue.match(regExp)

    if (!match) {
        throw new Error('Треба 2 слова')
    }
    let correctTypeOfString = nameValue.replace(/[ \W]/, '=')
    array.push(correctTypeOfString);
    ul.innerText = ''
    createList(array);
    form.nameValue.value = '';
})
let buttonSortByName = document.getElementById('sortByNameButton');
buttonSortByName.addEventListener('click', (e) => {
    e.preventDefault();
    const sortedArray = array.sort((a, b) => a.split('=')[0].localeCompare(b.split('=')[0]));
    ul.innerText = ''
    createList(sortedArray)
})

let buttonSortByValue = document.getElementById('sortByValueButton');
buttonSortByValue.addEventListener('click', (e) => {
    e.preventDefault();
    const sortedArray = array.sort((a, b) => a.split('=')[1].localeCompare(b.split('=')[1]));
    ul.innerText = ''
    createList(sortedArray)
})

let buttonDeleteList = document.getElementById('deleteButton');
buttonDeleteList.addEventListener('click', (e) => {
    e.preventDefault();
    ul.innerText = '';
    array = [];
    console.log(array);
})


