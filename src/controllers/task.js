import {
  render,
  unrender} from '../components/util';
import Card from '../components/card';
import CardEdit from '../components/card-edit';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import 'flatpickr/dist/themes/light.css';

const TASKS_AMOUNT_ON_PAGE = 8;

export default class TaskController {
  constructor(container, task, onDataChange, onChangeView) {
    this._container = container;
    this._task = task;
    this._onChangeView = onChangeView;
    this._onDataChange = onDataChange;
    this._taskView = new Card(task);
    this._taskEdit = new CardEdit(task);

    this.create();
  }

  /* @TODOS
  Добавьте в TaskController обработчики клика на кнопках
  добавления в архив .card__btn--archive
  и в избранное .card__btn--favorites .
  С помощью переданного метода onDataChange реализуйте
  мгновенное обновление моков.

  Аналогичным образом реализуйте обновление моков в уже
  существующем обработчике на отправку формы редактирования.
  Обратите внимание, что атрибут name у полей в разметке и
  ключи в вашей структуре данных могут не совпадать,
  и придется сформировать объект с обновлениями вручную
  или написать функцию, которая сделает это автоматически.
  */

  /** Метод возращает элемент таск
   *
   * @param {object} taskMock объект моковых данных таски
   * @return {node} возращает элемент таски
   */
  сreate() {
    flatpickr(this._taskEdit.getElement().querySelector(`.card__date`), {
      altInput: true,
      allowInput: true,
      defaultDate: this._task.dueDate,
    });

    this._taskView.getElement()
      .querySelector(`.card__btn--edit`)
      .addEventListener(`click`, () => {
        const onEscKeyDown = (evt) => {
          if (evt.key === `Escape` || evt.key === `Esc`) {
            this._taskEdit.getElement().parentNode.replaceChild(this._taskView.getElement(), this._taskEdit.getElement());
            document.removeEventListener(`keydown`, onEscKeyDown);
          }
        };

        this._taskView.getElement().parentNode.replaceChild(this._taskEdit.getElement(), this._taskView.getElement());
        document.addEventListener(`keydown`, onEscKeyDown);

        this._taskEdit.getElement().querySelector(`textarea`)
        .addEventListener(`focus`, () => {
          document.removeEventListener(`keydown`, onEscKeyDown);
        });

        this._taskEdit.getElement().querySelector(`textarea`)
        .addEventListener(`blur`, () => {
          document.addEventListener(`keydown`, onEscKeyDown);
        });

        this._taskEdit.getElement()
        .querySelector(`.card__save`)
        .addEventListener(`click`, (evtEdit) => {
          evtEdit.preventDefault();

          const formData = new FormData(this._taskEdit.getElement().querySelector(`.card__form`));
          const entry = {
            color: formData.get(`color`),
            description: formData.get(`text`),
            dueDate: new Date(formData.get(`date`)),
            tags: new Set(formData.getAll(`hashtag`)),
            repeatingDays: formData.getAll(`repeat`).reduce((acc, it) => {
              acc[it] = true;
              return acc;
            }, {
              'mo': false,
              'to': false,
              'we': false,
              'th': false,
              'fr': false,
              'sa': false,
              'su': false,
            }),
          };

          this._onDataChange(entry, this._task);

          document.removeEventListener(`keydown`, onEscKeyDown);

          const cards = document.querySelectorAll(`.card`);
          Array.from(cards).map((card) => unrender(card));

          const newTasks = this._tasks.slice(0, TASKS_AMOUNT_ON_PAGE);
          const container = document.querySelector(`.board__tasks`);
          newTasks.forEach((newCard) => render(container, this.сreate(newCard)));
        });

      });

    return this._task.getElement();
  }

  setDefaultView() {
    if (this._container.getElement().contains(this._taskEdit.getElement())) {
      this._container.getElement().replaceChild(this._taskView.getElement(), this._taskEdit.getElement());
    }
  }

  init() {
    /* @TODO
должен переехать код, который отвечает
за смену задачи на форму редактирования
задачи и наоборот (наши обработчики)
и отрисовка карточки.
    */
  }
}
