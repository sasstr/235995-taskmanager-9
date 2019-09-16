import AbstractComponent from './abstract-component';

export default class Filters extends AbstractComponent {
  constructor(filtersData) {
    super();

    this._filtersData = filtersData;
  }

  _getfilterTemplate({title, count}) {
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
      ${this._filtersData.map((filter) => this._getfilterTemplate(filter)).join(``)}
    </section>`.trim();
  }
}
