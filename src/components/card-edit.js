import AbstractComponent from './abstract-component';

export default class CardEdit extends AbstractComponent {
  constructor({description, dueDate, tagsList, repeatingDays, color, colors, tags}) {
    super();

    this._colors = colors;
    this._color = color;
    this._description = description;
    this._dueDate = dueDate;
    this._repeatingDays = repeatingDays;
    this._tagsList = tagsList;
    this._tags = tags;
  }

  _getRepeatDays() {
    return `<div class="card__repeat-days-inner">
      ${Object.keys(this._repeatingDays).map((day, i) => `<input
      class="visually-hidden card__repeat-day-input"
      type="checkbox"
      id="repeat-${day}-${i}"
      name="repeats"
      value="${day}"
      ${this._repeatingDays[day] ? `checked` : ``}
    />
    <label class="card__repeat-day" for="repeat-${day}-${i}"
      >${day}</label
    >`.trim()).join(``)}
    </div>`.trim();
  }

  _getHashtags() {
    return `<div class="card__hashtag">
      <div class="card__hashtag-list">

            ${this._tags ? Array.from(this._tags).map((tag) => `<span class="card__hashtag-inner">
          <input
            type="hidden"
            name="${tag}"
            value="repeat"
            class="card__hashtag-hidden-input"
          />
          <p class="card__hashtag-name"> #${tag}
          </p>
          <button type="button" class="card__hashtag-delete">
            delete
          </button>
        </span>`).join(``) : ``}
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

  _getColors() {
    return `<div class="card__colors-inner">
      <h3 class="card__colors-title">Color</h3>
      <div class="card__colors-wrap">
      ${this._colors ? this._colors.map((color, i) => `<input
      type="radio"
      id="color-${color}-${i}"
      class="card__color-input card__color-input--${color} visually-hidden"
      name="color"
      value="${color}"
      ${this._color === color ? `checked` : ``}
    />
    <label
      for="color-${color}-${i}"
      class="card__color card__color--${color}"
      >${color}</label
    >`.trim()).join(``) : ``}
      </div>
    </div>`.trim();
  }

  _isItem() {
    return Object.keys(this._repeatingDays).some((day) => this._repeatingDays[day]);
  }

  _isCardRepeat() {
    return this._isItem() ? `card--repeat` : ``;
  }

  _isCardStatus() {
    return this._isItem() ? `YES` : `NO`;
  }

  getTemplate() {
    return `<article class="card card--edit ${this._color} card--${this._isCardRepeat()}">
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
            >${this._description ? this._description : `Here is a card with filled data`}</textarea>
          </label>
        </div>

        <div class="card__settings">
          <div class="card__details">
            <div class="card__dates">
              <button class="card__date-deadline-toggle" type="button">
                date: <span class="card__date-status">${this._isCardStatus()}</span>
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
              <fieldset class="card__repeat-days">
                ${this._getRepeatDays()}
              </fieldset>
            </div>
               ${this._getHashtags()}
          </div>
           ${this._getColors()}
        </div>

        <div class="card__status-btns">
          <button class="card__save" type="submit">save</button>
          <button class="card__delete" type="button">delete</button>
        </div>
      </div>
    </form>
  </article>`.trim();
  }
}
