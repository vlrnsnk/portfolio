import { hamburgerClickHandler, hamburger, mainNavigation } from "./hamburger";

const siteNavigationLinks = document.querySelectorAll('.site-navigation__link');

const siteNavigationClickHandler = (event) => {
  siteNavigationLinks.forEach((siteNavigationLink) => {
    if (siteNavigationLink.classList.contains('site-navigation__link--active')) {
      siteNavigationLink.classList.remove('site-navigation__link--active');
    }
  });

  event.target.classList.add('site-navigation__link--active');

  if (window.screen.width < 992) {
    hamburgerClickHandler();
  }
};

export { siteNavigationClickHandler };
