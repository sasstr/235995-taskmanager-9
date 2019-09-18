import AbstractComponent from './abstract-component';

export default class Menu extends AbstractComponent {
  constructor(menuData) {
    super();

    this._menuData = menuData;
  }

  getTemplate() {
    return `<section class="control__btn-wrap">
    ${this._menuData.map((item) => `<input
      type="radio"
      name="control"
      id="control__${item.id}"
      class="control__input visually-hidden"
      ${item.isChecked ? `checked` : ``}
    />
    <label for="control__${item.id}" class="control__label">${item.name}</label>`.trim()).join(``)}
  </section>`.trim();
  }
}
