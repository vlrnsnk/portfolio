import { tabButtons } from "./variables";
import { showProjectsByType } from "./utilities";

const viewAllClickHandler = () => {
  tabButtons.forEach((tabButton) => {
    tabButton.classList.remove('projects__tab-button--active');
  });

  showProjectsByType('all');
};

export { viewAllClickHandler };
