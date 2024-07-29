const hamburger = document.querySelector('.hamburger');
const hamburgerWrapper = document.querySelector('.hamburger-wrapper');
const mobileMenu = document.querySelector('.main-navigation__wrapper');
const intro = document.querySelector('.intro');

const hamburgerClickHandler = () => {
  mobileMenu.classList.toggle('main-navigation__wrapper--active');
  hamburger.classList.toggle('hamburger--cross');
  hamburgerWrapper.classList.toggle('hamburger-wrapper--active');
};

const introClickHandler = () => {
  intro.style.opacity = 0;
  intro.style.height = 0;

  setTimeout(() => {
    intro.classList.add('intro--hidden');
  }, 500);
}

hamburger.addEventListener('click', hamburgerClickHandler);
intro.addEventListener('click', introClickHandler);
