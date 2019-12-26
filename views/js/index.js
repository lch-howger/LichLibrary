const base_url = "http://127.0.0.1:3000";

let url_pathname = window.location.pathname;

function updateList(target_url) {

    // set up and make a GET request to the Authors endpoint
    let xhttp = new XMLHttpRequest();
    let query_url = base_url + target_url + '/list';
    xhttp.open('GET', query_url);

    // when the request is finished, go through the return data
    // and add each author to the list
    xhttp.addEventListener('load', function () {

        let author_list = document.querySelector('#authors_list');
        // clear the list of existing data
        author_list.innerHTML = "";

        let authors = JSON.parse(this.response);
        // loop through all authors
        authors.forEach(function (author) {
            // create a new list item for each one and add to the list

            //li
            let list_item = document.createElement('li');
            list_item.setAttribute('class', 'list_item');
            author_list.appendChild(list_item);

            //div
            let list_item_div = document.createElement('div');
            list_item_div.setAttribute('class', 'list_item_div');
            list_item.appendChild(list_item_div);

            //img
            let img = document.createElement('img');
            img.setAttribute('src', '../views/image/more.png');
            img.setAttribute('class', 'list_item_img');
            list_item_div.appendChild(img);

            //text_div
            let list_item_text_div = document.createElement('div');
            list_item_text_div.setAttribute('class', 'list_item_text_div');
            list_item_div.appendChild(list_item_text_div);

            //p
            initListItemTextDiv(target_url, list_item_text_div, author);


        })
    });

    xhttp.send();
}

function initListItemTextDiv(target_url, list_item_text_div, author) {
    let text = document.createTextNode('Null');
    if (target_url == '/authors') {
        text = document.createTextNode(author.name);
    } else if (target_url == '/books') {
        text = document.createTextNode(author.title);
    } else if (target_url == '/users') {
        text = document.createTextNode(author.name);
    } else if (target_url == '/loans') {
        text = document.createTextNode(author.dueDate);
    }

    let p = document.createElement('p');
    p.setAttribute('class', 'list_item_text');
    p.appendChild(text);
    list_item_text_div.appendChild(p);
}

updateList(url_pathname);

// document.querySelector('#authors').addEventListener('click', function () {
//     updateList('/authors');
// });
//
// document.querySelector('#books').addEventListener('click', function () {
//     updateList('/books');
// });
//
// document.querySelector('#users').addEventListener('click', function () {
//     updateList('/users');
// });
//
// document.querySelector('#loans').addEventListener('click', function () {
//     updateList('/loans');
// });



