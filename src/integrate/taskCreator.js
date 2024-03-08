import Project from '../app/Project';
import { renderTasks } from './createCardContainer';

export function clearForm(modal) {
  const tittle = document.querySelector('#tittle');
  const description = document.querySelector('#description');
  const dueDate = document.querySelector('#due-date');
  tittle.value = '';
  description.value = '';
  dueDate.value = '';
  modal.close();
}

function createTaskFunction(ev) {
  const currentIndex = ev.target.dataset.index;
  const modal = document.querySelector('.modal');
  const formData = document.querySelector('.item-form');

  const cancelTask = document.querySelector('.cancel-task');
  const addTask = document.querySelector('.add-task');
  modal.showModal();

  cancelTask.textContent = 'Cancel';
  addTask.textContent = 'Add Task';

  cancelTask.addEventListener('click', () => {
    clearForm(modal);
    modal.close();
  });

  addTask.addEventListener(
    'click',
    () => {
      const dataInput = Object.fromEntries(new FormData(formData));
      clearForm(modal);
      if (dataInput.tittle !== '') {
        const currentProject = Project.setProjects[currentIndex];
        import('../app/task').then(({ TaskClass }) => {
          const task = new TaskClass(
            dataInput.tittle,
            dataInput.description,
            new Date(dataInput['due-date']),
            currentProject.name,
            dataInput.priority,
          );
          currentProject.projectsItem = task.getObject();
          renderTasks(currentIndex);
        });
      }
    },
    { once: true },
  );
}

export function addItemEventLister(addItem) {
  addItem.forEach((item) => item.addEventListener('click', createTaskFunction));
}
