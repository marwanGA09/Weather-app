export default class TaskCard {
  static createCard(obj, objectIndex, projectIndex) {
    // console.log(obj)
    const card = document.createElement("div");
    card.classList.add("card");
    card.dataset.priority = obj.priority;
    card.dataset.objectIndex = objectIndex;
    card.dataset.projectIndex = projectIndex;
    card.appendChild(TaskCard.#createTittleSpan(obj.tittle));
    card.appendChild(TaskCard.#createTimeSpan(obj.time)); // need some code
    card.appendChild(TaskCard.#createDateSpan(obj.date)); // need some code
    // card.appendChild(TaskCard.#createEditBtn());
    card.appendChild(TaskCard.#createLabel());
    card.appendChild(TaskCard.#createIsDone(obj.isDone));
    card.appendChild(TaskCard.#createViewBtn());
    card.appendChild(TaskCard.#createDeleteBtn());
    return card;
  }

  static #createTittleSpan(tittle) {
    const tit = document.createElement("span");
    tit.classList.add("tittle-elm");
    if (tittle.length > 35) {
      tit.textContent = `${tittle.slice(0, 34)}...`;
    } else {
      tit.textContent = tittle;
    }
    return tit;
  }

  static #createTimeSpan(dateValue) {
    const time = document.createElement("span");
    time.classList.add("time-elm");
    time.textContent = dateValue; // change time
    return time;
  }

  static #createDateSpan(dateValue) {
    const date = document.createElement("span");
    date.classList.add("date-elm");
    date.textContent = dateValue; // change to date only
    return date;
  }

  static #createIsDone(isDone) {
    const input = document.createElement("input");
    input.type = "checkbox";
    input.classList.add("is-done");
    input.name = "is-done";
    input.checked = isDone;
    return input;
  }

  static #createLabel() {
    const label = document.createElement("label");
    label.for = "is-done";
    label.textContent = "Finished";
    return label;
  }

  static #createViewBtn() {
    const btn = document.createElement("button");
    btn.classList.add("view");
    btn.textContent = "View 👁️‍🗨️";
    return btn;
  }

  static #createDeleteBtn() {
    const btn = document.createElement("button");
    btn.classList.add("btn-del-elm");
    btn.textContent = "Delete 🚫";
    return btn;
  }
}
