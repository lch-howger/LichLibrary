function initList() {

    // initialize the placeholder of search bar
    // initialize the button of add
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

    // set up and make a GET request
    let xhttp = new XMLHttpRequest();
    let query_url = base_url + '/' + first_path + '/list';
    xhttp.open('GET', query_url);

    // load network data
    loadData(xhttp);
}

function loadData(xhttp) {
    // when the request is finished, go through the return data
    // and add each author to the list
    xhttp.addEventListener('load', function () {

        let author_list = document.querySelector('#authors_list');

        // clear the list of existing data
        author_list.innerHTML = '';

        // parse the response
        let authors = JSON.parse(this.response);

        // loop through all authors
        // create a new list item for each one and add to the list
        authors.forEach(function (author) {

            // create li element
            let list_item = document.createElement('li');
            list_item.setAttribute('class', 'list_item');
            author_list.appendChild(list_item);

            // create a element
            let list_item_a = document.createElement('a');
            list_item_a.setAttribute('href', base_url + '/' + first_path + '/' + author.id);
            list_item.appendChild(list_item_a);

            // create div element
            let list_item_div = document.createElement('div');
            list_item_div.setAttribute('class', 'list_item_div');
            list_item_a.appendChild(list_item_div);

            // create img element
            let img = document.createElement('img');
            if (first_path == 'authors') {
                img.setAttribute('src', 'http://127.0.0.1:3000/views/image/icon_author.png');
            } else if (first_path == 'books') {
                img.setAttribute('src', 'http://127.0.0.1:3000/views/image/icon_book.jpg');
            } else if (first_path == 'users') {
                img.setAttribute('src', 'http://127.0.0.1:3000/views/image/icon_author.png');
            } else if (first_path == 'loans') {
                img.setAttribute('src', 'http://127.0.0.1:3000/views/image/icon_book.jpg');
            }
            if (author.imgUrl != null) {
                img.setAttribute('src', author.imgUrl);
            }
            img.setAttribute('class', 'list_item_img');
            list_item_div.appendChild(img);

            // create text in each item
            let list_item_text_div = document.createElement('div');
            list_item_text_div.setAttribute('class', 'list_item_text_div');
            list_item_div.appendChild(list_item_text_div);

            // initialize list item
            initListItemTextDiv(list_item_text_div, author);

        })
    });

    // send the request
    xhttp.send();
}

/**
 * initialize list item
 * @param list_item_text_div
 * @param author
 */
function initListItemTextDiv(list_item_text_div, author) {
    let div = document.createElement('div');
    div.setAttribute('class', 'list_item_text');

    if (first_path == 'authors') {
        div.appendChild(document.createTextNode('Name: ' + author.name));
        div.appendChild(document.createElement('br'));
    } else if (first_path == 'books') {
        div.appendChild(document.createTextNode('Title: ' + author.title));
        div.appendChild(document.createElement('br'));
        div.appendChild(document.createTextNode('Isbn: ' + author.isbn));
        div.appendChild(document.createElement('br'));
    } else if (first_path == 'users') {
        div.appendChild(document.createTextNode('Name: ' + author.name));
        div.appendChild(document.createElement('br'));
        div.appendChild(document.createTextNode('Barcode: ' + author.barcode));
        div.appendChild(document.createElement('br'));
        div.appendChild(document.createTextNode('Member Type: ' + author.memberType));
        div.appendChild(document.createElement('br'));
    } else if (first_path == 'loans') {
        div.appendChild(document.createTextNode('DueDate: ' + author.dueDate));
        div.appendChild(document.createElement('br'));
    }

    list_item_text_div.appendChild(div);
}

/**
 * set click event to button for search
 */
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

    // set up and make a GET request
    let xhttp = new XMLHttpRequest();
    let query_url = base_url + '/search?type=' + type_value + '&' + search_type + '=' + search_value;
    xhttp.open('GET', query_url);

    // load network data
    loadData(xhttp);
});

/**
 * set click event to button for add
 */
document.querySelector('#add_button').addEventListener('click', function () {
    window.location.href = base_url + '/' + first_path + '/add';
})

// initialize the list
initList();






