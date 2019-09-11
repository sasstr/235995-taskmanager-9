import {createElement} from './util';

export default class Card {
  constructor({description, dueDate, tagsList, repeatingDays, color}) {
    this._description = description;
    this._dueDate = dueDate;
    this._tagsList = tagsList;
    this._repeatingDays = repeatingDays;
    this._color = color;
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
    return `<article class="card card--${this._color} ${Object.keys(this._repeatingDays).some((day) => this._repeatingDays[day]) ? `card--repeat` : ``}">
  <div class="card__form">
    <div class="card__inner">
      <div class="card__control">
        <button type="button" class="card__btn card__btn--edit">
          edit
        </button>
        <button type="button" class="card__btn card__btn--archive">
          archive
        </button>
        <button
          type="button"
          class="card__btn card__btn--favorites card__btn--disabled"
        >
          favorites
        </button>
      </div>

      <div class="card__color-bar">
        <svg class="card__color-bar-wave" width="100%" height="10">
          <use xlink:href="#wave"></use>
        </svg>
      </div>

      <div class="card__textarea-wrap">
        <p class="card__text">${this._description}</p>
      </div>

      <div class="card__settings">
        <div class="card__details">
          <div class="card__dates">
            <div class="card__date-deadline">
              <p class="card__input-deadline-wrap">
                <span class="card__date">${new Date(this._dueDate).toDateString()}</span>
                <span class="card__time">${new Date(this._dueDate).toLocaleString().slice(11, 17)}</span>
              </p>
            </div>
          </div>

          <div class="card__hashtag">
            <div class="card__hashtag-list">
                  ${Array.from(this._tagsList).map((tag) => `<span class="card__hashtag-inner">
                  <span class="card__hashtag-name">
                    #${tag}</span>
                  </span>`.trim()).join(``)}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</article>`.trim();
  }
}
