
/*
 ДЗ 7 - Создать редактор cookie с возможностью фильтрации
 7.1: На странице должна быть таблица со списком имеющихся cookie. Таблица должна иметь следующие столбцы:
   - имя
   - значение
   - удалить (при нажатии на кнопку, выбранная cookie удаляется из браузера и таблицы)
 7.2: На странице должна быть форма для добавления новой cookie. Форма должна содержать следующие поля:
   - имя
   - значение
   - добавить (при нажатии на кнопку, в браузер и таблицу добавляется новая cookie с указанным именем и значением)
 Если добавляется cookie с именем уже существующией cookie, то ее значение в браузере и таблице должно быть обновлено
 7.3: На странице должно быть текстовое поле для фильтрации cookie
 В таблице должны быть только те cookie, в имени или значении которых, хотя бы частично, есть введенное значение
 Если в поле фильтра пусто, то должны выводиться все доступные cookie
 Если дабавляемая cookie не соответсвуте фильтру, то она должна быть добавлена только в браузер, но не в таблицу
 Если добавляется cookie, с именем уже существующией cookie и ее новое значение не соответствует фильтру,
 то ее значение должно быть обновлено в браузере, а из таблицы cookie должна быть удалена
 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

/*
 homeworkContainer - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то дабавляйте их только в этот контейнер
 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */
const homeworkContainer = document.querySelector('#homework-container');
// текстовое поле для фильтрации cookie
const filterNameInput = homeworkContainer.querySelector('#filter-name-input');
// текстовое поле с именем cookie
const addNameInput = homeworkContainer.querySelector('#add-name-input');
// текстовое поле со значением cookie
const addValueInput = homeworkContainer.querySelector('#add-value-input');
// кнопка "добавить cookie"
const addButton = homeworkContainer.querySelector('#add-button');
// таблица со списком cookie
const listTable = homeworkContainer.querySelector('#list-table tbody');
// cookie
var allCookie = cookieToObject();
// matchingChunk
var matchingChunk = getMatchingChunk();

createCookieTable(allCookie);

filterNameInput.addEventListener('keyup', function() {
    // здесь можно обработать нажатия на клавиши внутри текстового поля для фильтрации cookie
    matchingChunk = getMatchingChunk();
    createCookieTable(allCookie, matchingChunk);
});

addButton.addEventListener('click', () => {
    // здесь можно обработать нажатие на кнопку "добавить cookie"
    let newCookieName = addNameInput.value;
    let newCookieValue = addValueInput.value;

    if (newCookieName && newCookieValue) {
        document.cookie = `${newCookieName}=${newCookieValue}`;
        // addNameInput.value = '';
        // addValueInput.value = '';
    }

    allCookie = cookieToObject();
    createCookieTable(allCookie, matchingChunk);
});

function cookieToObject() {
    return document.cookie.split('; ').reduce((prev, curn) => {
        let [name, value] = curn.split('=');

        prev[name] = value;

        return prev;
    }, {});
}

function createCookieTable(cookieObject, matchChunk = '') {
    listTable.innerHTML = '';
    for (let cookie in cookieObject) {
        if (cookieObject[cookie]) {
            if (isMatching(cookie, matchChunk) || isMatching(cookieObject[cookie], matchChunk)) {
                let cookieTr = document.createElement('tr');
                let cookieName = document.createElement('td');
                let cookieValue = document.createElement('td');
                let cookieDelBut = document.createElement('button');
                let cookieNameText = document.createTextNode(cookie);
                let cookieValueText = document.createTextNode( cookieObject[cookie]);

                cookieName.appendChild(cookieNameText);
                cookieValue.appendChild(cookieValueText);
                cookieTr.appendChild(cookieName);
                cookieTr.appendChild(cookieValue);
                cookieDelBut.innerText = 'Delete';
                cookieDelBut.addEventListener('click', () => {
                    deleteCookie(cookie);
                    listTable.removeChild(cookieTr);
                });
                cookieTr.appendChild(cookieDelBut);
                listTable.appendChild(cookieTr);
            }
        }
    }
}

function deleteCookie(cookie) {
    document.cookie = `${cookie}=;expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
    allCookie = cookieToObject();
}

function isMatching(full, chunk) {
    let regExp = new RegExp(chunk, 'i');

    return regExp.test(full);
}

function getMatchingChunk() {
    return filterNameInput.value;
}