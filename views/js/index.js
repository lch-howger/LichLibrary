const base_url = "http://127.0.0.1:3000";

function updateAuthorList() {


    // set up and make a GET request to the Authors endpoint
    var xhttp = new XMLHttpRequest();
    var authors_url = "/authors";

    var query_url = base_url + authors_url;
    xhttp.open('GET', query_url);

    // when the request is finished, go through the return data
    // and add each author to the list
    xhttp.addEventListener('load', function () {


        var author_list = document.querySelector('#authors_list');
        // clear the list of existing data
        author_list.innerHTML = "";

        var authors = JSON.parse(this.response);
        // loop through all authors
        authors.forEach(function (author) {
            // create a new list item for each one and add to the list
            var text = document.createTextNode(author.name);
            var list_item = document.createElement('li');
            list_item.appendChild(text);
            author_list.appendChild(list_item);
        })
    });
    xhttp.send();


}

document.querySelector('#authors').addEventListener('click', function () {

    updateAuthorList()
});


