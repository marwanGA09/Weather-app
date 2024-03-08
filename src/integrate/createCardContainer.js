import Project from '../app/Project';
import TaskCard from '../dom/createTaskCard';

function removeCards() {
  const displayCard = document.querySelector('.card-display');
  const displays = document.querySelector('.display');
  displays.removeChild(displayCard);
  const newDisplayCard = document.createElement('div');
  newDisplayCard.classList.add('card-display');
  displays.appendChild(newDisplayCard);
}

// render Default
export function defaultRender() {
  const displayCard = document.querySelector('.card-display');
  const projectsArray = Project.setProjects[0].projectsItem;

  projectsArray.forEach((obj, objectIndex) => {
    if (obj != null) {
      const card = TaskCard.createCard(obj, objectIndex, 0);
      displayCard.appendChild(card);
    }
  });
}
export function renderTasks(ev) {
  // console.log(ev);
  removeCards();
  const displayCard = document.querySelector('.card-display');
  const index = Number.isInteger(+ev) ? ev : ev.currentTarget.dataset.project;

  const currentProject = Project.setProjects[index].projectsItem;
  if (currentProject != null) {
    currentProject.forEach((obj, objectIndex) => {
      const card = TaskCard.createCard(obj, objectIndex, index);
      displayCard.appendChild(card);
    });
  }
}

export function displayAllProject() {
  removeCards();
  const displayCard = document.querySelector('.card-display');
  Project.setProjects.forEach((pro) => {
    console.log(pro);
    const pros = pro.projectsItem;
    console.log(pros);
    pros.forEach((obj) => {
      const card = TaskCard.createCard(obj);
      displayCard.appendChild(card);
    });
  });
}

// displayAllProject();
