import {
  makeTasks,
  render} from './components/util';
import {getSorts} from './components/data';
import Sort from './components/sort';
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
  // Сортирует задачи по дате от самой ранней к самой поздней.
  _sortByDateUp() {
    return this._tasks.slice().sort((a, b) => a.dueDate - b.dueDate);
  }
  // Сортирует задачи по дате от самой поздней к самой ранней.
  _sortByDateDown() {
    return this._tasks.slice().sort((a, b) => b.dueDate - a.dueDate);
  }
  // Метод отрисует отсортированные таски.
  _renderSortedTasks(sortedTasks, tasksBoard) {
    sortedTasks.slice(0, TASKS_AMOUNT_ON_PAGE)
    .forEach((taskMock) => render(tasksBoard, this._сreateTask(taskMock)));
  }
  // Функция слушатель события клик на элементах сортировки.
  _onSortLinkClick(evt) {
    evt.preventDefault();

    if (evt.target.tagName !== `A`) {
      return;
    }
    const tasksList = document.querySelector(`.board__tasks`);
    tasksList.innerHTML = ``;

    switch (evt.target.dataset.sortType) {
      case `date-up`:
        this._renderSortedTasks(this._sortByDateUp(), tasksList);
        break;
      case `date-down`:
        this._renderSortedTasks(this._sortByDateDown(), tasksList);
        break;
      case `default`:
        this._renderSortedTasks(this._tasks, tasksList);
        break;
    }
  }

  init() {
    const main = document.querySelector(`.main`);
    if (!this._tasks || this._tasks.length < 1) {
      const noTasks = new NoTasks();
      render(main, noTasks.getElement());
      return;
    }
    const firstPartMockData = this._tasks.slice(0, TASKS_AMOUNT_ON_PAGE);

    const sort = new Sort(getSorts());
    const board = new Board(this._tasks, sort);

    render(main, board.getElement());
    const boardFilterList = document.querySelector(`.board__filter-list`);

    boardFilterList.addEventListener(`click`, (evt) => this._onSortLinkClick(evt));
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
    const cardsAmount = document.querySelectorAll(`.card`);
    // Скрыть кнопку подгрузки тасков если их меньше чем должно быть на странице.
    if (this._tasks.length === cardsAmount.length || this._tasks.length <= TASKS_AMOUNT_ON_PAGE) {
      removeBtnLoadMore(loadMoreBtn, onLoadMoreTasks);
    }

    loadMoreBtn.addEventListener(`click`, onLoadMoreTasks);

  }
}
