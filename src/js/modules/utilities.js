import { projects } from "./variables";

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

export { showProjectsByType };
