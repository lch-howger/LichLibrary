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
    alert('change');
}

function detailDelete() {
    alert('delete');
}

function detailAdd() {
    alert('add');
}