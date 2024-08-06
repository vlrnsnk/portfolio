import { body, themeSwitchIcon } from "./variables";

const themeSwitchClickHandler = (event) => {
  event.stopPropagation();

  const newTheme = body.dataset.theme === 'dark' ? 'light' : 'dark';
  body.dataset.theme = newTheme;
  window.localStorage.setItem('theme', newTheme);
  themeSwitchIcon.href.baseVal = newTheme === 'dark' ? './img/sprite.svg#sun' : './img/sprite.svg#moon';
}

export { themeSwitchClickHandler };
