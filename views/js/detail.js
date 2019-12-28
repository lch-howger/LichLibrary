let href = window.location.href;

function updateDetail() {
    let xhttp = new XMLHttpRequest();
    let query_url = href + '?allEntities=true';
    xhttp.open('GET', query_url);
    xhttp.addEventListener('load', function () {
        let div_content = document.querySelector('#div_content');
        div_content.innerHTML = "";

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
    window.location.href = href + '/addition';
}

function initAdditionButton() {
    let button = document.querySelector('#addition_button');
    if (first_path == 'authors') {
        button.setAttribute('value','Add Book For Author');
    }else if (first_path == 'books') {
        button.setAttribute('value','Add Author For Book');
    }else if (first_path == 'users') {
        button.setAttribute('value','Add Loan For User')
    }else if (first_path == 'loans') {
        button.setAttribute('class', 'addition_button');
    }
}

initAdditionButton();