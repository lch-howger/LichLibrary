function createTextAndInput(add_div, name, num) {
    let text = document.createTextNode(name);
    let input = document.createElement('input');
    input.setAttribute('class', 'add_input');
    input.setAttribute('id', 'add_input' + num);
    add_div.appendChild(text);
    add_div.appendChild(input);
    add_div.appendChild(document.createElement('br'));
}

function initInputText() {
    if (url_pathname.length == 4 && url_pathname[3]=='change') {
        document.querySelector('#add_submit').setAttribute('value', 'Change');
    }

    let add_div = document.querySelector('#add_div');
    if (first_path == 'authors') {
        createTextAndInput(add_div, 'Name', '01');
    } else if (first_path == 'books') {
        createTextAndInput(add_div, 'Title', '01');
        createTextAndInput(add_div, 'Isbn', '02');
    } else if (first_path == 'users') {
        createTextAndInput(add_div, 'Name', '01');
        createTextAndInput(add_div, 'Barcode', '02');

        let select = document.createElement('select');
        select.setAttribute('id', 'select_type');
        let option01 = document.createElement('option');
        let option02 = document.createElement('option');
        option01.setAttribute('value', 'Staff');
        option02.setAttribute('value', 'Student');
        option01.setAttribute('class', 'select_option');
        option02.setAttribute('class', 'select_option');
        option01.appendChild(document.createTextNode('Staff'));
        option02.appendChild(document.createTextNode('Student'));
        select.appendChild(option01);
        select.appendChild(option02);
        add_div.appendChild(document.createTextNode('Member Type'));
        add_div.appendChild(select);
    } else if (first_path == 'loans') {
        createTextAndInput(add_div, 'DueDate', '01');
    }
}

initInputText();

document.querySelector('#add_submit').addEventListener('click', function () {
    let xhttp = new XMLHttpRequest();
    let params = {};
    if (first_path == 'authors') {
        let value = document.querySelector('#add_input01').value;
        params = {
            name: value
        };
    } else if (first_path == 'books') {
        let value01 = document.querySelector('#add_input01').value;
        let value02 = document.querySelector('#add_input02').value;
        params = {
            title: value01,
            isbn: value02
        };
    } else if (first_path == 'users') {
        let value01 = document.querySelector('#add_input01').value;
        let value02 = document.querySelector('#add_input02').value;
        let value03 = 'Null';
        document.querySelectorAll('.select_option').forEach(function (option) {
            if (option.selected == true) {
                value03 = option.value;
            }
        });
        params = {
            name: value01,
            barcode: value02,
            memberType: value03,
        };
    } else if (first_path == 'loans') {
        let value = document.querySelector('#add_input01').value;
        params = {
            dueDate: value
        };
    }

    if (url_pathname.length == 4 && url_pathname[3] == 'change') {
        let query_url = base_url + '/' + url_pathname[1] + '/' + url_pathname[2];
        xhttp.open("PUT", query_url);

        xhttp.addEventListener('load', function () {
            alert('ok');
            window.location.href = base_url + '/' + first_path;
        });
    } else {
        let query_url = base_url + "/" + first_path;
        xhttp.open("POST", query_url);

        xhttp.addEventListener('load', function () {
            alert('ok');
            window.location.href = base_url + '/' + first_path;
        });
    }

    xhttp.setRequestHeader('Content-Type', 'application/json');
    xhttp.send(JSON.stringify(params));
})


