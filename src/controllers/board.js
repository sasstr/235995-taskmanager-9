import {
  makeTasks,
  render,
  unrender} from '../components/util';
import Sort from '../components/sort';
import FullBoard from '../components/full-board';
import Card from '../components/card';
import CardEdit from '../components/card-edit';
import NoTasks from '../components/no-tasks';

const TASKS_AMOUNT_ON_PAGE = 8;

export default class Board {
  constructor(container, tasks, tasksAmount) {
    this._container = container;
    this._clickCounter = 1;
    this._tasks = tasks;
    this._tasksAmount = tasksAmount;
  }

  /* _renderBoard(tasks) {
    unrender(this._taskList.getElement());

    this._taskList.removeElement();
    render(this._board.getElement(), this._taskList.getElement());
    this._tasks.forEach((taskMock) => this._renderTask(taskMock));
  } */

  onDataChange(newData, oldData) {
    this._tasks[this._tasks.findIndex((it2) => it2 === oldData)] = newData;

    this._renderBoard(this._tasks);
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
        .addEventListener(`click`, (evtEdit) => {
          evtEdit.preventDefault();

          const formData = new FormData(taskEdit.getElement().querySelector(`.card__form`));
          const entry = {
            color: formData.get(`color`),
            description: formData.get(`text`),
            dueDate: new Date(formData.get(`date`)),
            tags: new Set(formData.getAll(`hashtag`)),
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
  // Сортирует задачи по дате от самой ранней к самой поздней.
  _sortByDateUp() {
    return this._tasks.slice().sort((a, b) => a.dueDate - b.dueDate);
  }
  // Сортирует задачи по дате от самой поздней к самой ранней.
  _sortByDateDown() {
    return this._tasks.slice().sort((a, b) => b.dueDate - a.dueDate);
  }

  /** Удаляет из разметки кнопку подгрузки тасков
     *
     * @param {node} btnElement элемент кнопки
     * @param {function} onLoadMore функция для слушетеля событий на кнопке
     *
     * @return {void}
     */
  _removeBtnLoadMore(btnElement, onLoadMore) {
    btnElement.style.display = `none`; // скрыть кнопку после отрисовки последней партии тасков.
    btnElement.removeEventListener(`click`, onLoadMore);
  }

  // Функция обработчик события клик на кнопке loadMoreBtn
  _onLoadMoreTasks() {
    const tasksContainer = document.querySelector(`.board__tasks`);
    ++this._clickCounter;
    const nextData = this._tasks.slice((this._clickCounter - 1) * TASKS_AMOUNT_ON_PAGE, TASKS_AMOUNT_ON_PAGE * (this._clickCounter));
    const buttonLoad = document.querySelector(`.load-more`);
    if (Math.ceil(this._tasks.length / TASKS_AMOUNT_ON_PAGE) === this._clickCounter) {
      this._removeBtnLoadMore(buttonLoad, this._onLoadMoreTasks);
      makeTasks(nextData, this._сreateTask.bind(this), tasksContainer);
      return;
    }
    makeTasks(nextData, this._сreateTask.bind(this), tasksContainer);
  }

  // Метод отрисует отсортированные таски.
  _renderSortedTasks(sortedTasks, tasksBoard) {
    if (sortedTasks.length > TASKS_AMOUNT_ON_PAGE) {
      sortedTasks.slice(0, TASKS_AMOUNT_ON_PAGE)
      .forEach((taskMock) => render(tasksBoard, this._сreateTask(taskMock)));
      const btnLoad = document.querySelector(`.load-more`);
      btnLoad.style.display = `block`;
      btnLoad.addEventListener(`click`, this._onLoadMoreTasks);
      return;
    }
    sortedTasks.forEach((taskMock) => render(tasksBoard, this._сreateTask(taskMock)));
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

    const sort = new Sort();
    const fullBoard = new FullBoard(this._tasks, sort);

    render(main, fullBoard.getElement());
    const boardFilterList = document.querySelector(`.board__filter-list`);

    boardFilterList.addEventListener(`click`, (evt) => this._onSortLinkClick(evt));
    const tasksContainer = document.querySelector(`.board__tasks`);

    // Отрисовывает первую партию тасков на странице.
    makeTasks(firstPartMockData, this._сreateTask.bind(this), tasksContainer);

    const loadMoreBtn = document.querySelector(`.load-more`);

    const cardsAmount = document.querySelectorAll(`.card`);
    // Скрыть кнопку подгрузки тасков если их меньше чем должно быть на странице.
    if (this._tasks.length === cardsAmount.length || this._tasks.length <= TASKS_AMOUNT_ON_PAGE) {
      this._removeBtnLoadMore(loadMoreBtn, this._onLoadMoreTasks);
    }

    loadMoreBtn.addEventListener(`click`, this._onLoadMoreTasks);
  }
}
