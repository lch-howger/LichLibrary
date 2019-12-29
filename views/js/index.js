function updateList(target_url) {

    if (first_path == 'authors') {
        document.querySelector('#search_text').setAttribute('placeholder', 'Search Authors');
        document.querySelector('#add_button').setAttribute('value', '+ Add Author');
    } else if (first_path == 'books') {
        document.querySelector('#search_text').setAttribute('placeholder', 'Search Books');
        document.querySelector('#add_button').setAttribute('value', '+ Add Book');
    } else if (first_path == 'users') {
        document.querySelector('#search_text').setAttribute('placeholder', 'Search Users');
        document.querySelector('#add_button').setAttribute('value', '+ Add User');
    }

    // set up and make a GET request to the Authors endpoint
    let xhttp = new XMLHttpRequest();
    let query_url = base_url + '/' + target_url + '/list';
    xhttp.open('GET', query_url);

    loadData(xhttp, target_url);
}

function loadData(xhttp, target_url) {
    // when the request is finished, go through the return data
    // and add each author to the list
    xhttp.addEventListener('load', function () {

        let author_list = document.querySelector('#authors_list');
        // clear the list of existing data
        author_list.innerHTML = '';

        let authors = JSON.parse(this.response);
        // loop through all authors
        authors.forEach(function (author) {
            // create a new list item for each one and add to the list

            //li
            let list_item = document.createElement('li');
            list_item.setAttribute('class', 'list_item');
            author_list.appendChild(list_item);

            //a
            let list_item_a = document.createElement('a');
            list_item_a.setAttribute('href', base_url + '/' + target_url + '/' + author.id);
            list_item.appendChild(list_item_a);

            //div
            let list_item_div = document.createElement('div');
            list_item_div.setAttribute('class', 'list_item_div');
            list_item_a.appendChild(list_item_div);

            //img
            let img = document.createElement('img');
            if (first_path == 'authors') {
                img.setAttribute('src', '../views/image/icon_author.png');
            }else if (first_path == 'books') {
                img.setAttribute('src', '../views/image/icon_book.jpg');
            }else if (first_path == 'users') {
                img.setAttribute('src', '../views/image/icon_author.png');
            }else if (first_path == 'loans') {
                img.setAttribute('src', '../views/image/icon_book.jpg');
            }
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
    let div = document.createElement('div');
    div.setAttribute('class', 'list_item_text');

    if (target_url == 'authors') {
        div.appendChild(document.createTextNode('Name: ' + author.name));
        div.appendChild(document.createElement('br'));
    } else if (target_url == 'books') {
        div.appendChild(document.createTextNode('Title: ' + author.title));
        div.appendChild(document.createElement('br'));
        div.appendChild(document.createTextNode('Isbn: ' + author.isbn));
        div.appendChild(document.createElement('br'));
    } else if (target_url == 'users') {
        div.appendChild(document.createTextNode('Name: ' + author.name));
        div.appendChild(document.createElement('br'));
        div.appendChild(document.createTextNode('Barcode: ' + author.barcode));
        div.appendChild(document.createElement('br'));
        div.appendChild(document.createTextNode('Member Type: ' + author.memberType));
        div.appendChild(document.createElement('br'));
    } else if (target_url == 'loans') {
        div.appendChild(document.createTextNode('DueDate: ' + author.dueDate));
        div.appendChild(document.createElement('br'));
    }

    list_item_text_div.appendChild(div);
}

updateList(first_path);

document.querySelector('#search_button').addEventListener('click', function () {
    let search_value = document.querySelector('#search_text').value;

    let search_type = '';
    let allSearchTypes = document.querySelectorAll('.search_type');
    allSearchTypes.forEach(function (type) {
        if (type.checked) {
            search_type = type.value;
        }
    });

    let type_value = '';
    if (first_path == 'authors') {
        type_value = 'author';
    } else if (first_path == 'books') {
        type_value = 'book';
    } else if (first_path == 'users') {
        type_value = 'user';
    }

    // set up and make a GET request to the Authors endpoint
    let xhttp = new XMLHttpRequest();
    let query_url = base_url + '/search?type=' + type_value + '&' + search_type + '=' + search_value;
    xhttp.open('GET', query_url);
    loadData(xhttp, first_path);
});

document.querySelector('#add_button').addEventListener('click', function () {
    window.location.href = base_url + '/' + first_path + '/add';
})






