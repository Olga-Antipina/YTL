const stagesContent = document.querySelector('.main__stages_content');
const stagesBtns = document.querySelectorAll('.panel_button_img');
const stagesPagination = document.querySelector('.panel_pagination');

let countNext = 0;

function opacitySteps() {
    for (let i = 0; i < stagesContent.children.length; i++) {
        stagesContent.children[i].style.opacity = '0';
    }
    if (countNext === 0) {
        stagesContent.children[0].style.opacity = '1';
        stagesContent.children[1].style.opacity = '1';
    } else if (countNext === 1) {
        stagesContent.children[2].style.opacity = '1';
    } else if (countNext === 2) {
        stagesContent.children[3].style.opacity = '1';
        stagesContent.children[4].style.opacity = '1';
    } else if (countNext === 3) {
        stagesContent.children[5].style.opacity = '1';
    } else if (countNext === 4) {
        stagesContent.children[6].style.opacity = '1';
    }
};

function nextPage() {
    if (countNext === 4) {
        return;
    };
    stagesBtns[0].classList.remove('panel_button_img_disabled');
    countNext += 1;
    for (let i = 0; i < stagesPagination.children.length; i++) {
        i === countNext ? stagesPagination.children[i].style.backgroundColor = 'rgba(49, 49, 49, 1)' : stagesPagination.children[i].style.backgroundColor = 'rgba(49, 49, 49, 0.2)';
    };
    if (countNext < 5) {
        stagesBtns[1].classList.remove('panel_button_img_disabled');
        stagesContent.style.transform = `translateX(-${355 * countNext}px)`;
        countNext === 4 && stagesBtns[1].classList.add('panel_button_img_disabled');
    };
    opacitySteps();
};

function previousPage() {
    if (countNext === 0) {
        return;
    };
    countNext -= 1;
    for (let i = 0; i < stagesPagination.children.length; i++) {
        i === countNext ? stagesPagination.children[i].style.backgroundColor = 'rgba(49, 49, 49, 1)' : stagesPagination.children[i].style.backgroundColor = 'rgba(49, 49, 49, 0.2)';
    };
    stagesBtns[1].classList.remove('panel_button_img_disabled');
    countNext === 0 && stagesBtns[0].classList.add('panel_button_img_disabled');
    stagesContent.style.transform = `translateX(-${355 * countNext}px)`;
    opacitySteps();
};

function mobileStagesStyles(isMobileSize) {
    if (isMobileSize) {
        countNext = 0;
        stagesBtns[0].classList.add('panel_button_img_disabled');
        for (let i = 0; i < stagesPagination.children.length; i++) {
            i === 0 ? stagesPagination.children[i].style.backgroundColor = 'rgba(49, 49, 49, 1)' : stagesPagination.children[i].style.backgroundColor = 'rgba(49, 49, 49, 0.2)';
        };
        stagesContent.classList.add('animation_stages_content');
        document.querySelector('.panel_button_right').addEventListener('click', nextPage);
        document.querySelector('.panel_button_left').addEventListener('click', previousPage);
    } else {
        countNext = 0;
        stagesContent.style.transform = 'none';
        stagesContent.classList.remove('animation_stages_content');
        stagesBtns[0].classList.add('panel_button_img_disabled');
        stagesBtns[1].classList.remove('panel_button_img_disabled');
        for (let i = 0; i < stagesContent.children.length; i++) {
            stagesContent.children[i].style.opacity = '1';
        };
    };
};

mobileStagesStyles(window.matchMedia('(max-width: 480px)').matches);

window.matchMedia('(max-width: 480px)').addEventListener('change', function (event) {
    mobileStagesStyles(event.matches);
});