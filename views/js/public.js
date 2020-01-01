//base url
const base_url = "http://127.0.0.1:3000";

//current url
let href = window.location.href;

//current pathname
let pathname = window.location.pathname;

//current pathname array
let url_pathname = pathname.split('/');

//current first pathname
let first_path = url_pathname[1];

/**
 * initialize page title
 */
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

// initialize page title
initPageTitle()