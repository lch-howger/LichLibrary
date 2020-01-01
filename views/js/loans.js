/**
 * get due date from select element
 * @returns {string}
 */
function getDueDateBySelect() {
    let y = 2000;
    let m = 1;
    let d = 1;
    let years = document.querySelectorAll('.option_year');
    years.forEach(function (year) {
        if (year.selected) {
            y = year.value;
        }
    });

    let months = document.querySelectorAll('.option_month');
    months.forEach(function (month) {
        if (month.selected) {
            m = month.value;
        }
    });

    let days = document.querySelectorAll('.option_day');
    days.forEach(function (day) {
        if (day.selected) {
            d = day.value;
        }
    });
    return '' + y + '-' + m + '-' + d;
}

/**
 * initialize the select element
 */
function initSelectTime() {
    let select_year = document.querySelector('#select_year');
    for (let i = 2000; i < 2100; i++) {
        let option = document.createElement('option');
        option.setAttribute('class', 'option_year');
        option.setAttribute('value', i);
        option.appendChild(document.createTextNode(i));
        select_year.appendChild(option);
    }

    let select_month = document.querySelector('#select_month');
    for (let i = 1; i < 13; i++) {
        let option = document.createElement('option');
        option.setAttribute('class', 'option_month');
        option.setAttribute('value', i);
        option.appendChild(document.createTextNode(i));
        select_month.appendChild(option);
    }

    let select_day = document.querySelector('#select_day');
    for (let i = 1; i < 32; i++) {
        let option = document.createElement('option');
        option.setAttribute('class', 'option_day');
        option.setAttribute('value', i);
        option.appendChild(document.createTextNode(i));
        select_day.appendChild(option);
    }
}

/**
 * create select element
 * @param add_div
 * @param id
 */
function initSelectInAddDiv(add_div, id) {
    let select = document.createElement('select');
    select.setAttribute('class', 'select_time');
    select.setAttribute('id', id);
    add_div.appendChild(select);
}