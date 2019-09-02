import {createElement} from './util';

export default class Filters {
  constructor(filtersData) {
    this._filtersData = filtersData;
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }
    return this._element;
  }

  getfilterTemplate({title, count}) {
    return `<input
    type="radio"
    id="filter__${title}"
    class="filter__input visually-hidden"
    name="filter"
    ${title === `all` ? `checked` : ``}
    ${count === 0 ? `disabled` : ``}
    />
    <label for="filter__${title}" class="filter__label">
    ${title} <span class="filter__${title}-count">${count}</span></label>`.trim();
  }

  getTemplate() {
    return `<section class="main__filter filter container">
      ${this._filtersData.map((filter) => this.getfilterTemplate(filter)).join(``)}
    </section>`.trim();
  }
}
