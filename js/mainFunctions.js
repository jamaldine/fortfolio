$(document).ready(() => {
    $('.navbar_wraper').load('./common/navbar.html'); 
    $('#root').load('./common/home-section.html');
    setTimeout(() => {
        skillsHome();
    }, 50);
});

function skillsHome() {
    let skills = document.querySelector('ul.skills');
    let skillItem = skills.querySelectorAll('.skill-item');
    skillItem.forEach((item) => {
        item.querySelector('.skill-item-name').addEventListener('click', slideContent);
    });
}

function slideContent() {
    const skillItem = document.querySelector('ul.skills').querySelectorAll('.skill-item');
    skillItem.forEach((item) => {
        const path = item.querySelector('.skill-item-name svg path');
        path.classList.remove('active');
    });
    const newPath = this.querySelector('svg path');
    newPath.classList.add('active');
}
