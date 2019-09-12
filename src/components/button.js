import {createElement} from './util';

export default class Button {
  constructor(amountTasks) {
    this._amountTasks = amountTasks;
    this._element = null;
  }
  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }
    return this._element;
  }

  removeElement() {
    this._element = null;
  }

  getTemplate() {
    return `${this._amountTasks > 0 ? `<button class="load-more" type="button">load more</button>` : ``}`;
  }
}
