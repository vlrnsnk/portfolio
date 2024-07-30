const hamburger = document.querySelector('.hamburger');
const hamburgerWrapper = document.querySelector('.hamburger-wrapper');
const mobileMenu = document.querySelector('.main-navigation__wrapper');
const intro = document.querySelector('.intro');
const hero = document.querySelector('.hero');
const about = document.querySelector('.about');
const body = document.querySelector('body');
const tabsList = document.querySelector('.projects__tabs-list');
const tabsButtons = document.querySelectorAll('.projects__tabs-button');
const projects = document.querySelectorAll('.project__item');

// Hide all projects except for default 'react' type

projects.forEach((project) => {
  if (project.dataset.type !== 'react') {
    project.style.display = 'none';
  }
});

// Show projects by type of clicked tab

const showProjectsByType = (type = 'all') => {
  if (type === 'all') {
    projects.forEach((project) => {
      project.style.display = 'block';
    });
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

window.addEventListener('beforeunload', () => {
  window.scrollTo(0, 0);
});

hamburger.addEventListener('click', hamburgerClickHandler);

// Deactivate intro on different click/touch/mouse events

intro.addEventListener('click', introClickHandler);
intro.addEventListener('mousemove', introClickHandler);
intro.addEventListener('touchmove', introClickHandler);

// Handle tabs switching

tabsList.addEventListener('click', (event) => {
  tabsButtons.forEach((tabsButton) => {
    tabsButton.classList.remove('projects__tabs-button--active');
  });

  event.target.classList.add('projects__tabs-button--active');
  showProjectsByType(event.target.dataset.type);
});
