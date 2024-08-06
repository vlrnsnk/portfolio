import { tabButtons } from "./variables";
import { showProjectsByType } from "./utilities";

const tabListClickHandler = (event) => {
  tabButtons.forEach((tabButton) => {
    tabButton.classList.remove('projects__tab-button--active');
  });

  event.target.classList.add('projects__tab-button--active');
  showProjectsByType(event.target.dataset.type);
};

export { tabListClickHandler };
