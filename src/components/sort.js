import {createElement} from './util';

export default class Sort {
  constructor(sortsData) {
    this._sortData = sortsData;
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
    return this._sortsData.map((sort) => `<div class="board__filter-list">
    <a href="#" class="board__filter">${sort}</a>
  </div>`.trim());
  }
}
