let href = window.location.href;

function updateDetail() {
    let xhttp = new XMLHttpRequest();
    let query_url = href + '?allEntities=true';
    xhttp.open('GET', query_url);
    xhttp.addEventListener('load', function () {
        let div_content = document.querySelector('#div_content');
        div_content.innerHTML = "";

        let text = document.createTextNode(this.response);
        div_content.appendChild(text);
    });
    xhttp.send();
}

updateDetail();