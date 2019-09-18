import {
  makeTasks,
  render} from './components/util';
import Board from './components/board';
import Card from './components/card';
import CardEdit from './components/card-edit';
import NoTasks from './components/no-tasks';

const TASKS_AMOUNT_ON_PAGE = 8;

export default class BoardController {
  constructor(container, tasks, tasksAmount) {
    this._container = container;
    this._tasks = tasks;
    this._tasksAmount = tasksAmount;
  }

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
        .addEventListener(`click`, () => {
          taskEdit.getElement().parentNode.replaceChild(task.getElement(), taskEdit.getElement());
          document.removeEventListener(`keydown`, onEscKeyDown);
        });
      });

    return task.getElement();
  }

  init() {
    if (!this._tasks || this._tasks.length < 1) {
      const noTasks = new NoTasks();
      render(this._container, noTasks.getElement());
      return;
    }
    const main = document.querySelector(`.main`);
    const firstPartMockData = this._tasks.slice(0, TASKS_AMOUNT_ON_PAGE);
    const board = new Board(this._tasks);

    render(main, board.getElement());
    const tasksContainer = document.querySelector(`.board__tasks`);
    // Отрисовывает первую партию тасков на странице.
    makeTasks(firstPartMockData, this._сreateTask, tasksContainer);

    /** Удаляет из разметки кнопку подгрузки тасков
     *
     * @param {node} btnElement элемент кнопки
     * @param {function} onLoadMore функция для слушетеля событий на кнопке
     *
     * @return {void}
     */
    const removeBtnLoadMore = (btnElement, onLoadMore) => {
      btnElement.style.display = `none`; // скрыть кнопку после отрисовки последней партии тасков.
      btnElement.removeEventListener(`click`, onLoadMore);
    };
    const loadMoreBtn = document.querySelector(`.load-more`);

    let clickCounter = 1;
    const onLoadMoreTasks = () => {

      ++clickCounter;
      const nextData = this._tasks.slice((clickCounter - 1) * TASKS_AMOUNT_ON_PAGE, TASKS_AMOUNT_ON_PAGE * (clickCounter));

      if (Math.ceil(this._tasks.length / TASKS_AMOUNT_ON_PAGE) === clickCounter) {
        removeBtnLoadMore(loadMoreBtn, onLoadMoreTasks);
        makeTasks(nextData, this._сreateTask, tasksContainer);
        return;
      }
      makeTasks(nextData, this._сreateTask, tasksContainer);
    };

    // Скрыть кнопку подгрузки тасков если их меньше чем должно быть на странице.
    if (this._tasks.length <= TASKS_AMOUNT_ON_PAGE) {
      removeBtnLoadMore(loadMoreBtn, onLoadMoreTasks);
    }

    loadMoreBtn.addEventListener(`click`, onLoadMoreTasks);

  }
}
