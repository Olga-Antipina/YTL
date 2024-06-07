function addSmoothScroll(anchor) {
    anchor.addEventListener('click', function (event) {
        event.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({ behavior: 'smooth' });
    });
}

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    addSmoothScroll(anchor);
});
addSmoothScroll(document.querySelector('.info_btn_support'));
