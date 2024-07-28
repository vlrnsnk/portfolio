const hamburger = document.querySelector('.hamburger');
const hamburgerWrapper = document.querySelector('.hamburger-wrapper');
const mobileMenu = document.querySelector('.mobile-menu');

const hamburgerClickHandler = () => {
  mobileMenu.classList.toggle('mobile-menu--active');
  hamburger.classList.toggle('hamburger--cross');
  hamburgerWrapper.classList.toggle('hamburger--active');
};

hamburger.addEventListener('click', hamburgerClickHandler);
