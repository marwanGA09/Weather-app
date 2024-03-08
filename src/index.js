import './style/style.scss';
import './integrate/projectCon';
import { displayAllProject } from './integrate/createCardContainer';

const removeLocalStorage = document.querySelector('.removeLocalStorage');
removeLocalStorage.addEventListener('click', () => {
  console.log('remove Local storage');
  localStorage.clear();
  window.location.reload();
});

const allTasks = document.querySelector('.all-tasks');
allTasks.addEventListener('click', () => {
  displayAllProject();
});
