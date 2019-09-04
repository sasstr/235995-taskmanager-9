import {createElement} from './util';

export default class Sort {
  constructor(sortsData) {
    this._sortsData = sortsData;
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
    return `<div class="board__filter-list">${this._sortsData.map((sort) =>
      `<a href="#" class="board__filter">${sort}</a>`).join(``)}
  </div>`.trim();
  }
}
