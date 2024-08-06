import { mainNavigation, hamburger, hamburgerWrapper, body } from "./variables";

const hamburgerClickHandler = () => {
  mainNavigation.classList.toggle('main-navigation__wrapper--active');
  hamburger.classList.toggle('hamburger--cross');
  hamburgerWrapper.classList.toggle('hamburger-wrapper--active');

  body.style.overflow = body.style.overflow !== 'hidden' ? 'hidden' : 'auto';
};

export { hamburgerClickHandler };
