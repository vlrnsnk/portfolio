const hamburger = document.querySelector('.hamburger');
const hamburgerWrapper = document.querySelector('.hamburger-wrapper');
const mobileMenu = document.querySelector('.main-navigation__wrapper');
const intro = document.querySelector('.intro');
const hero = document.querySelector('.hero');
const about = document.querySelector('.about');
const body = document.querySelector('body');

const hamburgerClickHandler = () => {
  mobileMenu.classList.toggle('main-navigation__wrapper--active');
  hamburger.classList.toggle('hamburger--cross');
  hamburgerWrapper.classList.toggle('hamburger-wrapper--active');
};

const introClickHandler = () => {
  // Hide intro screen and show main page content

  intro.style.opacity = 0;
  intro.style.height = 0;
  hero.style.opacity = 1;
  about.style.opacity = 1;
  hamburger.style.opacity = 1;
  body.style.height = 'auto';
  body.style.overflow = 'auto';

  // Timeout for proper animation

  setTimeout(() => {
    intro.classList.add('intro--hidden');
  }, 1000);
}

hamburger.addEventListener('click', hamburgerClickHandler);

// Deactivate intro on different click/touch/mouse events

intro.addEventListener('click', introClickHandler);
intro.addEventListener('mousemove', introClickHandler);
intro.addEventListener('touchmove', introClickHandler);
