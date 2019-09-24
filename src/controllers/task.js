import {
  render,
  unrender} from '../components/util';
import {getColors} from '../components/data';
import Card from '../components/card';
import CardEdit from '../components/card-edit';

export default class Task {
  constructor(container, tasks, onDataChange, onChangeView) {
    this._container = container;
    this._tasks = tasks;
    this._colors = getColors();
    this._onChangeView = onChangeView;
    this._onDataChange = onDataChange;
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
  _сreateTask(taskMock) {
    const task = new Card(taskMock);

    task.getElement()
      .querySelector(`.card__btn--edit`)
      .addEventListener(`click`, () => {
        const taskEdit = new CardEdit(taskMock);
        const onEscKeyDown = (evt) => {
          if (evt.key === `Escape` || evt.key === `Esc`) {
            taskEdit.getElement().parentNode.replaceChild(task.getElement(), taskEdit.getElement());
            document.removeEventListener(`keydown`, onEscKeyDown);
          }
        };

        task.getElement().parentNode.replaceChild(taskEdit.getElement(), task.getElement());
        document.addEventListener(`keydown`, onEscKeyDown);

        taskEdit.getElement().querySelector(`textarea`)
        .addEventListener(`focus`, () => {
          document.removeEventListener(`keydown`, onEscKeyDown);
        });

        taskEdit.getElement().querySelector(`textarea`)
        .addEventListener(`blur`, () => {
          document.addEventListener(`keydown`, onEscKeyDown);
        });

        taskEdit.getElement()
        .querySelector(`.card__save`)
        .addEventListener(`click`, (evtEdit) => {
          evtEdit.preventDefault();

          const formData = new FormData(taskEdit.getElement().querySelector(`.card__form`));
          const entry = {
            color: formData.get(`color`),
            colors: [
              `black`,
              `blue`,
              `yellow`,
              `green`,
              `pink`,
            ],
            description: formData.get(`text`),
            dueDate: new Date(formData.get(`date`)),
            tagsList: new Set(formData.getAll(`hashtag`)),
            repeatingDays: formData.getAll(`repeats`).reduce((acc, it) => {
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
            tags: new Set([
              `homework`,
              `theory`,
              `practice`,
              `intensive`,
              `keks`,
              `todo`,
              `personal`,
              `important`,
              `cinema`,
              `repeat`,
              `entertaiment`,
            ]),
          };
          this._tasks[this._tasks.findIndex((it) => it === taskMock)] = entry;

          document.removeEventListener(`keydown`, onEscKeyDown);

          const cards = document.querySelectorAll(`.card`);
          Array.from(cards).map((card) => unrender(card));

          const newTasks = this._tasks.slice(0, TASKS_AMOUNT_ON_PAGE);
          const container = document.querySelector(`.board__tasks`);
          newTasks.forEach((newCard) => render(container, this._сreateTask(newCard)));
        });

      });

    return task.getElement();
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
