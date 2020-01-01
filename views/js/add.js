/**
 * initialize text of input element for different page
 * type:
 *      1.authors
 *      2.books
 *      3.users
 *      4.loans
 */
function initInputText() {
    // if the size of pathname is 4 and the last pathname is 'change'
    // location is the page of change
    if (url_pathname.length == 4 && url_pathname[3] == 'change') {
        document.querySelector('#add_submit').setAttribute('value', 'Change');

        // initialize the network data
        initDetailData();
    }

    //create text and input element for different page
    let add_div = document.querySelector('#add_div');
    if (first_path == 'authors') {
        createTextAndInput(add_div, 'Name', '01');
    } else if (first_path == 'books') {
        createTextAndInput(add_div, 'Title', '01');
        createTextAndInput(add_div, 'Isbn', '02');
    } else if (first_path == 'users') {
        createTextAndInput(add_div, 'Name', '01');
        createTextAndInput(add_div, 'Barcode', '02');

        //create select element for users page
        createSelect(add_div);

    } else if (first_path == 'loans') {
        // hide the upload area in loans page
        document.querySelector('#label_upload').setAttribute('class', 'display_none');

        //create select element for select time in loans page
        add_div.appendChild(document.createTextNode('Due Date'));
        initSelectInAddDiv(add_div, 'select_year');
        initSelectInAddDiv(add_div, 'select_month');
        initSelectInAddDiv(add_div, 'select_day');
        initSelectTime();
    }
}

/**
 * create select element in users page
 * @param add_div
 */
function createSelect(add_div) {
    let select = document.createElement('select');
    select.setAttribute('id', 'select_type');
    let option01 = document.createElement('option');
    let option02 = document.createElement('option');
    option01.setAttribute('value', 'Staff');
    option02.setAttribute('value', 'Student');
    option01.setAttribute('class', 'select_option');
    option02.setAttribute('class', 'select_option');
    option01.setAttribute('id', 'select_option_sta');
    option02.setAttribute('id', 'select_option_stu');
    option01.appendChild(document.createTextNode('Staff'));
    option02.appendChild(document.createTextNode('Student'));
    select.appendChild(option01);
    select.appendChild(option02);
    add_div.appendChild(document.createTextNode('Member Type'));
    add_div.appendChild(select);
}

function createTextAndInput(add_div, name, num) {
    let text = document.createTextNode(name);
    let input = document.createElement('input');
    input.setAttribute('class', 'add_input');
    input.setAttribute('id', 'add_input' + num);
    add_div.appendChild(text);
    add_div.appendChild(input);
    add_div.appendChild(document.createElement('br'));
}

function initDetailData() {
    let query_url = base_url + '/' + url_pathname[1] + '/' + url_pathname[2] + '?allEntities=false';
    axios.get(query_url)
        .then(function (response) {
            if (first_path == 'authors') {
                document.querySelector('#add_input01').value = response.data.name;
            } else if (first_path == 'books') {
                document.querySelector('#add_input01').value = response.data.title;
                document.querySelector('#add_input02').value = response.data.isbn;
            } else if (first_path == 'users') {
                document.querySelector('#add_input01').value = response.data.name;
                document.querySelector('#add_input02').value = response.data.barcode;
                if (response.data.memberType == 'Staff') {
                    document.querySelector('#select_option_sta').selected = true;
                    document.querySelector('#select_option_stu').selected = false;
                } else {
                    document.querySelector('#select_option_sta').selected = false;
                    document.querySelector('#select_option_stu').selected = true;
                }
            }

            if (response.data.imgUrl != null) {
                document.querySelector('#img_upload').setAttribute('src', response.data.imgUrl);
            }
        });
}

document.querySelector('#add_submit').addEventListener('click', function () {
    let xhttp = new XMLHttpRequest();
    let params = {};
    let img_url = document.querySelector('#img_upload').getAttribute('src');
    if (img_url.indexOf('icon_upload') != -1) {
        img_url = null;
    }
    if (first_path == 'authors') {
        let value = document.querySelector('#add_input01').value;
        params = {
            name: value,
            imgUrl: img_url
        };
    } else if (first_path == 'books') {
        let value01 = document.querySelector('#add_input01').value;
        let value02 = document.querySelector('#add_input02').value;
        params = {
            title: value01,
            isbn: value02,
            imgUrl: img_url
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
            imgUrl: img_url
        };
    } else if (first_path == 'loans') {
        let value = getDueDateBySelect();
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
});

function uploadImg() {
    let btn_upload = document.querySelector('#btn_upload');
    if (btn_upload.files.length > 0) {
        upload(btn_upload.files[0]);
    }
}

function upload(file) {
    const param = new FormData();
    param.append("file", file);
    const config = {
        headers: {"Content-Type": "multipart/form-data"}
    };
    axios.post(base_url + "/upload", param, config)
        .then(function (response) {
            handleImgName(response.data.img);
        })
        .catch(function (error) {
            alert(error);
        });
}

function handleImgName(imgName) {
    let img_upload = document.querySelector('#img_upload');
    let img_url = base_url + '/images/' + imgName;
    img_upload.setAttribute('src', img_url);
    img_upload.setAttribute('imgUrl', img_url);
}

/**
 * initialize text of input element for different page
 */
initInputText();

