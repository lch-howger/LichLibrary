function updateDetail() {
    let xhttp = new XMLHttpRequest();
    let query_url = href + '?allEntities=true';
    xhttp.open('GET', query_url);
    xhttp.addEventListener('load', function () {
        let div_content = document.querySelector('#div_content');
        div_content.innerHTML = '';

        let result = JSON.stringify(JSON.parse(this.response), null, 4);

        div_content.innerText = result;
        // let text = document.createTextNode(result);
        // div_content.appendChild(text);
    });
    xhttp.send();
}

updateDetail();

function detailChange() {
    window.location.href = href + '/change';
}

function detailDelete() {
    let dialog = confirm("Delete?");
    if (dialog == true) {
        axios.delete(href)
            .then(function (response) {
                window.location.href = base_url + '/' + first_path;
            });
    }
}

function detailAdd() {
    if (first_path == 'authors') {
        window.location.href = href + '/books';
    } else if (first_path == 'books') {
        window.location.href = href + '/authors';
    } else if (first_path == 'users') {
        window.location.href = href + '/loans';
    }
}

function initAdditionButton() {
    let button = document.querySelector('#addition_button');
    if (first_path == 'authors') {
        button.setAttribute('value', 'Add Book For Author');
    } else if (first_path == 'books') {
        button.setAttribute('value', 'Add Author For Book');
    } else if (first_path == 'users') {
        button.setAttribute('value', 'Add Loan For User')
        initUserLoans();
    } else if (first_path == 'loans') {
        button.setAttribute('class', 'display_none');
    }
}

initAdditionButton();

function initUserLoans() {
    let query_url = href + '/loans/list';
    axios.get(query_url)
        .then(function (response) {
            let div_user_loans = document.querySelector('#div_user_loans');
            div_user_loans.innerHTML = '';
            let result = JSON.stringify(response.data, null, 4);
            div_user_loans.innerText = result;
        });
}