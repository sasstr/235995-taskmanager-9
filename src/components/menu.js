import {createElement} from './util';

export default class Menu {
  constructor(menuData) {
    this._menuData = menuData;
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
    return `<section class="control__btn-wrap">
    ${this._menuData.map((item) => `<input
      type="radio"
      name="control"
      id="control__${item.id}"
      class="control__input visually-hidden"
      ${item.isCheced === true ? `checked` : ``}
    />
    <label for="control__${item.id}" class="control__label">${item.name}</label>`.trim()).join(``)}
  </section>`.trim();
  }
}
