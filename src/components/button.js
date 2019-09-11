import {createElement} from './util';

export default class Button {
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
    return `<button class="load-more" type="button">load more</button>`.trim();
  }
}
/**
 * Функция возращает html разметку кнопки загрузить еще.
 * @return {string}
 */
const makeLoadMoreButtonTemplate = () => `<button class="load-more" type="button">load more</button>`.trim();

export {makeLoadMoreButtonTemplate};
