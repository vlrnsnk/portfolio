const intro = document.querySelector('.intro');
const hero = document.querySelector('.hero');
const about = document.querySelector('.about');
const tabsList = document.querySelector('.projects__tab-list');
const viewAllProjects = document.querySelector('#view-all-projects');
const contactForm = document.querySelector('.contact-form');
const contactFormButton = contactForm.querySelector('.contact-form__button');
const submitResult = contactForm.querySelector('.contact-form__submit-result');
const siteNavigation = document.querySelector('.site-navigation');


import { hamburgerWrapper, body, themeSwitch, themeSwitchIcon, projects } from "./modules/variables.js";
import { hamburgerClickHandler } from "./modules/hamburger.js";
import { siteNavigationClickHandler } from "./modules/site-navigation.js";
import { themeSwitchClickHandler } from "./modules/theme-switch.js";
import { tabListClickHandler } from "./modules/tab-list.js";

/* Getting and setting current theme */

let theme = window.localStorage.getItem('theme');

if (!window.localStorage.getItem('theme')) {
  theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  window.localStorage.setItem('theme', theme);
}

body.dataset.theme = theme;
themeSwitchIcon.href.baseVal = theme === 'dark' ? './img/sprite.svg#sun' : './img/sprite.svg#moon';

/* Settings for DOM elements if JS is enabled */

body.style.height = '100%';
body.style.overflow = 'hidden';
intro.style.display = 'flex';
hero.style.opacity = '0';
about.style.opacity = '0';
hamburgerWrapper.style.display = 'flex';

/* Hide all projects except for default 'react' type */

projects.forEach((project) => {
  if (project.dataset.type !== 'react') {
    project.style.display = 'none';
  }
});


const removeIntroScreen = () => {

  /* Hide intro screen and show main page content */

  intro.style.opacity = 0;
  intro.style.height = 0;
  intro.style.zIndex = -1;
  hero.style.opacity = 1;
  about.style.opacity = 1;
  body.style.height = 'auto';
  body.style.overflow = 'auto';

  /* Remove event listeners for removing intro screen */

  window.removeEventListener('click', removeIntroScreen);
  window.removeEventListener('mousemove', removeIntroScreen);
  window.removeEventListener('touchmove', removeIntroScreen);

  /* Timeout for proper animation */

  setTimeout(() => {
    intro.classList.add('intro--hidden');
  }, 1000);
}

/* Scroll to top if page reload further than the first screen */

window.addEventListener('beforeunload', () => {
  window.scrollTo(0, 0);
});

/* Add hamburger click handler */
hamburgerWrapper.addEventListener('click', hamburgerClickHandler);

/* Add theme switch click handler */
themeSwitch.addEventListener('click', themeSwitchClickHandler);

/* Add toggle active class on site navigation item */
siteNavigation.addEventListener('click', siteNavigationClickHandler);

/* Deactivate intro on different click/touch/mouse events */
window.addEventListener('click', removeIntroScreen);
window.addEventListener('mousemove', removeIntroScreen);
window.addEventListener('touchmove', removeIntroScreen);

/* Handle tabs switching */
tabsList.addEventListener('click', tabListClickHandler);

/* Handle click on 'View All' button */
viewAllProjects.addEventListener('click', () => {
  tabButtons.forEach((tabButton) => {
    tabButton.classList.remove('projects__tab-button--active');
  });

  showProjectsByType('all');
});

contactForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  contactFormButton.disabled = true;
  const formData = new FormData(contactForm);

  await fetch('http://localhost:8080/contact-form-handler.php', {
  // await fetch('http://vlrnsnk.rf.gd/contact-form-handler.php', {
    method: 'POST',
    body: formData,
  })
  .then((response) => {
    if (response.status === 201) {
      return response.json();
    }

    throw new Error('Failed form submit');
  })
  .then((json) => {
    submitResult.textContent = 'Your message was sent successfully!';
    submitResult.classList.add('contact-form__submit-result--success');
  })
  .catch((error) => {
    submitResult.textContent = 'There was an error sending Your message. Please, try contacting me via e-mail.';
    submitResult.classList.add('contact-form__submit-result--fail');
  });

  setTimeout(() => {
    contactFormButton.disabled = false;
    submitResult.textContent = '';
    submitResult.classList.remove('contact-form__submit-result--success');
    submitResult.classList.remove('contact-form__submit-result--fail');
  }, 5000);
});
