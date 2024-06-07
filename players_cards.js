// предусмотрим случай получения любого количества данных из массива без поля id
const players = [
    {
        name: 'Хозе-Рауль Капабланка',
        title: 'Чемпион мира по шахматам',
        about: 'https://ru.wikipedia.org/wiki/%D0%9A%D0%B0%D0%BF%D0%B0%D0%B1%D0%BB%D0%B0%D0%BD%D0%BA%D0%B0,_%D0%A5%D0%BE%D1%81%D0%B5_%D0%A0%D0%B0%D1%83%D0%BB%D1%8C',
    },
    {
        name: 'Эммануил Ласкер',
        title: 'Чемпион мира по шахматам',
        about: 'https://ru.wikipedia.org/wiki/%D0%9B%D0%B0%D1%81%D0%BA%D0%B5%D1%80,_%D0%AD%D0%BC%D0%B0%D0%BD%D1%83%D0%B8%D0%BB',
    },
    {
        name: 'Александр Алехин',
        title: 'Чемпион мира по шахматам',
        about: 'https://ru.wikipedia.org/wiki/%D0%90%D0%BB%D0%B5%D1%85%D0%B8%D0%BD,_%D0%90%D0%BB%D0%B5%D0%BA%D1%81%D0%B0%D0%BD%D0%B4%D1%80_%D0%90%D0%BB%D0%B5%D0%BA%D1%81%D0%B0%D0%BD%D0%B4%D1%80%D0%BE%D0%B2%D0%B8%D1%87',
    },
    {
        name: 'Арон Нимцович',
        title: 'Чемпион мира по шахматам',
        about: 'https://ru.wikipedia.org/wiki/%D0%9D%D0%B8%D0%BC%D1%86%D0%BE%D0%B2%D0%B8%D1%87,_%D0%90%D1%80%D0%BE%D0%BD_%D0%98%D1%81%D0%B0%D0%B5%D0%B2%D0%B8%D1%87',
    },
    {
        name: 'Рихард Рети',
        title: 'Чемпион мира по шахматам',
        about: 'https://ru.wikipedia.org/wiki/%D0%A0%D0%B5%D1%82%D0%B8,_%D0%A0%D0%B8%D1%85%D0%B0%D1%80%D0%B4',
    },
    {
        name: 'Остап Бендер',
        title: 'Гроссмейстер',
        about: 'https://ru.wikipedia.org/wiki/%D0%9E%D1%81%D1%82%D0%B0%D0%BF_%D0%91%D0%B5%D0%BD%D0%B4%D0%B5%D1%80',
    },
];


const carusel = document.querySelector('.main__players_carusel');
const visibleNum = document.querySelector('.visible_num');
const quantityNum = document.querySelector('.quantity_num');
const btnImg = document.querySelectorAll('.btn_img');
const playersContainer = document.querySelector('.main__players');
const rightBtn = document.querySelector('.btn_right');
const leftBtn = document.querySelector('.btn_left');

let id = 0;
const content = players.map((el) => { // каждой карточке игрока присвоим id
    return `<div class="main__players_carusel_card" id=${id++}>
        <div class="card__player_img">
            <img alt="player" src="./img/default_player.png" draggable="false">
        </div>
        <div class="card__player_name">${el.name}</div>
        <div class="card__player_title">${el.title}</div>
        <a href="${el.about}" target="_blank">
            <button class="card__player_about">Подробнее</button>
        </a>
    </div>`;
});

let hiddenPlayers = [];
let firstFlagIndex = 0;
let smthElse = false;
let smthPrevious = false;


function showElsePlayers() {
    if (smthElse) {
        smthPrevious = true;
        btnImg[0].classList.remove('btn_img_disabled');
        firstFlagIndex += 3;
        hiddenPlayers = content.slice(firstFlagIndex, firstFlagIndex + 3);
        carusel.innerHTML = '';
        for (let i = 0; i < hiddenPlayers.length; i++) {
            carusel.innerHTML += hiddenPlayers[i];
        };
        visibleNum.innerText = +visibleNum.innerText + carusel.childNodes.length;
    };
    //ниже проверка с учётом того, что все элементы массива разные (для этого ранее задан id каждой карточке игрока)
    if (content[content.length - 1] === hiddenPlayers[hiddenPlayers.length - 1]) {
        smthElse = false;
        smthPrevious = true;
        btnImg[1].classList.add('btn_img_disabled');
    };
};

function showPreviousPlayers() {
    if (smthPrevious) {
        smthElse = true;
        btnImg[1].classList.remove('btn_img_disabled');
        firstFlagIndex -= 3;
        let lastFlagIndex = +visibleNum.innerText - carusel.childNodes.length;
        hiddenPlayers = content.slice(lastFlagIndex - 3, lastFlagIndex);
        carusel.innerHTML = '';
        for (let i = 0; i < hiddenPlayers.length; i++) {
            carusel.innerHTML += hiddenPlayers[i];
        };
        carusel.childNodes.forEach((el) => el.style.animation = 'back-emergence 1.2s');
        visibleNum.innerText = lastFlagIndex;
    };
    //ниже проверка с учётом того, что все элементы массива разные (для этого ранее задан id каждой карточке игрока)
    if (content[0] === hiddenPlayers[0]) {
        smthPrevious = false;
        smthElse = true;
        btnImg[0].classList.add('btn_img_disabled');
        firstFlagIndex = 0;
    };
};

function showNextOne() {
    if (smthElse) {
        smthPrevious = true;
        btnImg[0].classList.remove('btn_img_disabled');
        firstFlagIndex += 1;
        hiddenPlayers = content[firstFlagIndex];
        carusel.innerHTML = '';
        carusel.innerHTML += hiddenPlayers;
        visibleNum.innerText = +visibleNum.innerText + 1;
    };
    //ниже проверка с учётом того, что все элементы массива разные (для этого ранее задан id каждой карточке игрока)
    if (content[content.length - 1] === hiddenPlayers) {
        smthElse = false;
        smthPrevious = true;
        btnImg[1].classList.add('btn_img_disabled');
    };
};

function showPreviousOne() {
    if (smthPrevious) {
        smthElse = true;
        btnImg[1].classList.remove('btn_img_disabled');
        firstFlagIndex -= 1;
        // let lastFlagIndex = +visibleNum.innerText - 1;
        hiddenPlayers = content[firstFlagIndex];
        carusel.innerHTML = '';
        carusel.innerHTML += hiddenPlayers;
        carusel.firstChild.style.animation = 'back-emergence 1.2s';
        visibleNum.innerText = +visibleNum.innerText - 1;
    };
    //ниже проверка с учётом того, что все элементы массива разные (для этого ранее задан id каждой карточке игрока)
    if (content[0] === hiddenPlayers) {
        smthPrevious = false;
        smthElse = true;
        btnImg[0].classList.add('btn_img_disabled');
        firstFlagIndex = 0;
    };
};

function timeFuncForMobile() {


};

function timeFuncForDesktop() {

};

function mobilePlayersStyles(isMobileSize) {
    if (isMobileSize) {
        hiddenPlayers = [];
        firstFlagIndex = 0;
        smthElse = false;
        smthPrevious = false;
        if (content.length > 0) {
            btnImg[0].classList.add('btn_img_disabled');
            if (content.length === 1) {
                btnImg[1].classList.add('btn_img_disabled');
                visibleNum.innerText = 1;
                quantityNum.innerText = 1;
                hiddenPlayers = content;
                carusel.innerHTML = '';
                carusel.innerHTML += hiddenPlayers;
            } else {
                quantityNum.innerText = `${content.length}`;
                hiddenPlayers = content[firstFlagIndex];
                visibleNum.innerText = firstFlagIndex + 1;
                carusel.innerHTML = '';
                carusel.innerHTML += hiddenPlayers;
                smthElse = true;
                btnImg[1].classList.remove('btn_img_disabled');
            };
        } else {
            document.querySelector('.main__players_title_btns').innerHTML = '';
            carusel.innerHTML = `<div class="no_players">
                Список участников будет утверждён в ближайшее время
                <a href="#" target="_blank">
                    <button class="card__player_about">Подробнее</button>
                </a>
            </div>`;
            playersContainer.style.marginBottom = '70' + 'px';
            carusel.style.height = 'auto';
        };
        if (content.length > 1) {
            rightBtn.removeEventListener('click', showElsePlayers);
            leftBtn.removeEventListener('click', showPreviousPlayers);
            rightBtn.addEventListener('click', showNextOne);
            leftBtn.addEventListener('click', showPreviousOne);
        };
    } else {
        hiddenPlayers = [];
        firstFlagIndex = 0;
        smthElse = false;
        smthPrevious = false;
        if (content.length > 0) {
            btnImg[0].classList.add('btn_img_disabled');
            if (content.length <= 3) {
                btnImg[1].classList.add('btn_img_disabled');
                visibleNum.innerText = `${content.length}`;
                quantityNum.innerText = `${content.length}`;
                hiddenPlayers = content;
                carusel.innerHTML = '';
                for (let i = 0; i < hiddenPlayers.length; i++) {
                    carusel.innerHTML += hiddenPlayers[i];
                };
            } else {
                quantityNum.innerText = `${content.length}`;
                hiddenPlayers = content.slice(firstFlagIndex, firstFlagIndex + 3);
                visibleNum.innerText = hiddenPlayers.length;
                carusel.innerHTML = '';
                for (let i = 0; i < hiddenPlayers.length; i++) {
                    carusel.innerHTML += hiddenPlayers[i];
                };
                smthElse = true;
                btnImg[1].classList.remove('btn_img_disabled');
            };
        } else {
            document.querySelector('.main__players_title_btns').innerHTML = '';
            carusel.innerHTML = `<div class="no_players">
                Список участников будет утверждён в ближайшее время
                <a href="#" target="_blank">
                    <button class="card__player_about">Подробнее</button>
                </a>
            </div>`;
            playersContainer.style.marginBottom = '70' + 'px';
            carusel.style.height = 'auto';
        };
        if (content.length > 3) {
            rightBtn.removeEventListener('click', showNextOne);
            leftBtn.removeEventListener('click', showPreviousOne);
            rightBtn.addEventListener('click', showElsePlayers);
            leftBtn.addEventListener('click', showPreviousPlayers);
        };
    };
};

mobilePlayersStyles(window.matchMedia('(max-width: 740px)').matches);

window.matchMedia('(max-width: 740px)').addEventListener('change', function (event) {
    mobilePlayersStyles(event.matches);
});





