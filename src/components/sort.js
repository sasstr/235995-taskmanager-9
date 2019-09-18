import AbstractComponent from './abstract-component';

export default class Sort extends AbstractComponent {
  constructor(sortsData) {
    super();

    this._sortsData = sortsData;
  }

  getTemplate() {
    return `<div class="board__filter-list">${this._sortsData.map((sort) =>
      `<a href="#" class="board__filter">${sort}</a>`).join(``)}
  </div>`.trim();
  }
}
