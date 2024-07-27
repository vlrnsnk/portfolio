const hamburger = document.querySelector('.hamburger');
const mobileMenu = document.querySelector('.mobile-menu');
const closeMobileMenu = document.querySelector('.close-mobile-menu');

const hamburgerClickHandler = () => {
  mobileMenu.classList.toggle('mobile-menu--active');
};

hamburger.addEventListener('click', hamburgerClickHandler);
closeMobileMenu.addEventListener('click', hamburgerClickHandler);
