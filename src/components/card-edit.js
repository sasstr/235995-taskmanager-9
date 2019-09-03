import {createElement} from './util'; // #TODO Заполнить шаблон из методов класса в свои места.

export default class CardEdit {
  constructor({description, dueDate, tagsList, repeatingDays, color, colors, tags}) {
    this._description = description;
    this._dueDate = dueDate;
    this._tagsList = tagsList;
    this._tags = tags;
    this._repeatingDays = repeatingDays;
    this._colors = colors;
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

  getRepeatDays() {
    return `<fieldset class="card__repeat-days">
    <div class="card__repeat-days-inner">
      ${Object.keys(this._repeatingDays).map((day) => `<input
      class="visually-hidden card__repeat-day-input"
      type="checkbox"
      id="repeat-${day}-4"
      name="repeat"
      value="${day}"
      ${this._repeatingDays[day] ? `checked` : ``}
    />
    <label class="card__repeat-day" for="repeat-${day}-4"
      >${day}</label
    >`.trim())}
    </div>
  </fieldset>`.trim();
  }

  getHashtags() {
    return `<div class="card__hashtag">
      <div class="card__hashtag-list">
          <span class="card__hashtag-inner">
          <input
            type="hidden"
            name="hashtag"
            value="repeat"
            class="card__hashtag-hidden-input"
          />
          <p class="card__hashtag-name">
            ${Array.from(this._tags).map((tag) => `#${tag}`)}
          </p>
          <button type="button" class="card__hashtag-delete">
            delete
          </button>
        </span>

          <label>
          <input
            type="text"
            class="card__hashtag-input"
            name="hashtag-input"
            placeholder="Type new hashtag here"
          />
        </label>
      </div>
    </div>`.trim();
  }

  getColors() {
    return `<div class="card__colors-inner">
      <h3 class="card__colors-title">Color</h3>
      <div class="card__colors-wrap">
      ${this._colors.map((color) => `<input
      type="radio"
      id="color-${color}-4"
      class="card__color-input card__color-input--${color} visually-hidden"
      name="color"
      value="${color}"
      checked
    />
    <label
      for="color-${color}-4"
      class="card__color card__color--${color}"
      >${color}</label
    >`).trim()}
      </div>
    </div>`.trim();
  }

  getTemplate() {
    return `<article class="card card--edit ${this._color} card--${Object.keys(this._repeatingDays).some((day) => this._repeatingDays[day]) ? `card--repeat` : ``}">
    <form class="card__form" method="get">

      <div class="card__inner">
        <div class="card__control">
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
          <label>
            <textarea
              class="card__text"
              placeholder="Start typing your text here..."
              name="text"
            >Here is a card with filled data</textarea>
          </label>
        </div>

        <div class="card__settings">
          <div class="card__details">
            <div class="card__dates">
              <button class="card__date-deadline-toggle" type="button">
                date: <span class="card__date-status">${Object.keys(this._repeatingDays).some((day) => this._repeatingDays[day]) ? `YES` : `NO`}</span>
              </button>

              <fieldset class="card__date-deadline">
                <label class="card__input-deadline-wrap">
                  <input
                    class="card__date"
                    type="text"
                    placeholder=""
                    name="date"
                    value="${new Date(this._dueDate).toDateString()}"
                  />
                </label>
              </fieldset>

              <button class="card__repeat-toggle" type="button">
                repeat:<span class="card__repeat-status">yes</span>
              </button>
<!-- card__repeat-days --> ${this.getRepeatDays()}
            </div>
<!-- card__hashtag --> ${this.getHashtags()}
          </div>
        </div>
<!-- card__colors-inner --> ${this.getColors()}
        <div class="card__status-btns">
          <button class="card__save" type="submit">save</button>
          <button class="card__delete" type="button">delete</button>
        </div>
      </div>
    </form>
  </article>`.trim();
  }
}
