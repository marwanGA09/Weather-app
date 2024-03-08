export default class CreateProjectItem {
  static #createAddBtn(index) {
    const btn = document.createElement('button');
    btn.textContent = '+';
    btn.dataset.index = index - 1;
    btn.classList.add('add-item');
    return btn;
  }

  static #createSpan(content) {
    const span = document.createElement('span');
    span.textContent = content;
    return span;
  }

  createLI(content, index) {
    // i made this.index just to remove error come from eslint
    this.index = index;
    const li = document.createElement('li');
    li.classList.add('project-item');
    li.dataset.project = index - 1;

    li.appendChild(CreateProjectItem.#createSpan(content));
    li.appendChild(CreateProjectItem.#createAddBtn(index));
    return li;
  }
}
