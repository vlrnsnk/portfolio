const hamburger = document.querySelector('.hamburger');
const hamburgerWrapper = document.querySelector('.hamburger-wrapper');
const mobileMenu = document.querySelector('.main-navigation__wrapper');

const hamburgerClickHandler = () => {
  mobileMenu.classList.toggle('main-navigation__wrapper--active');
  hamburger.classList.toggle('hamburger--cross');
  hamburgerWrapper.classList.toggle('hamburger-wrapper--active');
};

hamburger.addEventListener('click', hamburgerClickHandler);
