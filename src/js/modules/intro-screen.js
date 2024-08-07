import { intro, body, hero, about } from "./variables";

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

export { removeIntroScreen };
