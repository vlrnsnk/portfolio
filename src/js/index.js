const hamburger = document.querySelector('.hamburger');
const hamburgerWrapper = document.querySelector('.hamburger-wrapper');
const mobileMenu = document.querySelector('.main-navigation__wrapper');
const intro = document.querySelector('.intro');
const hero = document.querySelector('.hero');
const about = document.querySelector('.about');
const body = document.querySelector('body');
const tabsList = document.querySelector('.projects__tab-list');
const tabButtons = document.querySelectorAll('.projects__tab-button');
const projects = document.querySelectorAll('.project__item');
const viewAllProjects = document.querySelector('#view-all-projects');
const contactForm = document.querySelector('.contact-form');
const contactFormButton = contactForm.querySelector('.contact-form__button');
const submitResult = contactForm.querySelector('.contact-form__submit-result');
const siteNavigation = document.querySelector('.site-navigation');
const siteNavigationLinks = document.querySelectorAll('.site-navigation__link');
const themeSwitch = document.querySelector('.theme-switch');

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

/* Show projects by type of clicked tab */

const showProjectsByType = (type) => {
  if (type === 'all') {
    projects.forEach((project) => {
      project.style.display = 'block';
    });

    return;
  }

  projects.forEach((project) => {
    if (project.dataset.type === type) {
      project.style.display = 'block';
    } else {
      project.style.display = 'none';
    }
  });
};

const hamburgerClickHandler = () => {
  mobileMenu.classList.toggle('main-navigation__wrapper--active');
  hamburger.classList.toggle('hamburger--cross');
  hamburgerWrapper.classList.toggle('hamburger-wrapper--active');

  body.style.overflow = body.style.overflow !== 'hidden' ? 'hidden' : 'auto';
};

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

/* Add stub theme switch click handler */

themeSwitch.addEventListener('click', (event) => {
  event.stopPropagation();
  console.log('theme switch');
});

/* Add toggle active class on site navigation item */

siteNavigation.addEventListener('click', (event) => {
  siteNavigationLinks.forEach((siteNavigationLink) => {
    if (siteNavigationLink.classList.contains('site-navigation__link--active')) {
      siteNavigationLink.classList.remove('site-navigation__link--active');
    }
  });

  event.target.classList.add('site-navigation__link--active');
  if (window.screen.width < 992) {
    hamburgerClickHandler();
  }
});

/* Deactivate intro on different click/touch/mouse events */

window.addEventListener('click', removeIntroScreen);
window.addEventListener('mousemove', removeIntroScreen);
window.addEventListener('touchmove', removeIntroScreen);

/* Handle tabs switching */

tabsList.addEventListener('click', (event) => {
  tabButtons.forEach((tabButton) => {
    tabButton.classList.remove('projects__tab-button--active');
  });

  event.target.classList.add('projects__tab-button--active');
  showProjectsByType(event.target.dataset.type);
});

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

themeSwitch.addEventListener('click', () => {
  body.dataset.theme = body.dataset.theme === 'dark' ? 'light' : 'dark';
});
