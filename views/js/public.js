let pathname = window.location.pathname;
let url_pathname = pathname.split('/');

function initPageTitle() {
    let first_path = url_pathname[1];

    if (first_path == '') {
        first_path = 'Home';
    } else if (first_path == 'authors') {
        first_path = 'Authors';
    } else if (first_path == 'books') {
        first_path = 'Books';
    } else if (first_path == 'users') {
        first_path = 'Users';
    } else if (first_path == 'loans') {
        first_path = 'Loans';
    }
    let title = document.createTextNode(first_path);

    let page_title = document.querySelector('#page_title');
    page_title.appendChild(title);
}

initPageTitle()