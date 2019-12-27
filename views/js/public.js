const base_url = "http://127.0.0.1:3000";
let pathname = window.location.pathname;
let url_pathname = pathname.split('/');
let first_path = url_pathname[1];

function initPageTitle() {
    let text = '';

    if (first_path == '') {
        text = 'Home';
    } else if (first_path == 'authors') {
        text = 'Authors';
    } else if (first_path == 'books') {
        text = 'Books';
    } else if (first_path == 'users') {
        text = 'Users';
    } else if (first_path == 'loans') {
        text = 'Loans';
    }
    let title = document.createTextNode(text);
    let page_title = document.querySelector('#page_title');
    page_title.appendChild(title);
}

initPageTitle()