import {
  renderTasks,
  render,
  unrender} from '../components/util';
import TaskController from '../controllers/task';
import Sort from '../components/sort';
import FullBoard from '../components/full-board';

import NoTasks from '../components/no-tasks';

const TASKS_AMOUNT_ON_PAGE = 8;

export default class BoardController {
  constructor(container, tasks) {
    this._container = container;
    this._clickCounter = 1;
    this._onChangeView = this._onChangeView.bind(this);
    this._onDataChange = this._onDataChange.bind(this);
    this._subscriptions = [];
    this._tasks = tasks;
    this._sort = new Sort(this._tasks);
    this._fullBoard = new FullBoard(this._tasks);
    this._tasksAmount = tasks.length;
  }

  _renderBoard() {
    unrender(this._fullBoard.getElement());

    this._fullBoard.removeElement();
    render(this._board.getElement(), this._fullBoard.getElement());
    this._tasks.forEach((taskMock) => this._renderTask(taskMock));
  }

  _onDataChange(newData, oldData) {
    this._tasks[this._tasks.findIndex((it2) => it2 === oldData)] = newData;

    this._renderBoard(this._tasks); // _renderBoard не реализован!!!
  }

  _onChangeView() {
    this._subscriptions.forEach((it) => it());
  }

  _makeTask(task) {
    const taskController = new TaskController(this._fullBoard, task, this._onDataChange, this._onChangeView);
    this._subscriptions.push(taskController.setDefaultView.bind(taskController));
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
    this._clickCounter = 1;
    ++this._clickCounter;
    const nextData = this._tasks.slice((this._clickCounter - 1) * TASKS_AMOUNT_ON_PAGE, TASKS_AMOUNT_ON_PAGE * (this._clickCounter));
    const buttonLoad = document.querySelector(`.load-more`);
    if (Math.ceil(this._tasks.length / TASKS_AMOUNT_ON_PAGE) === this._clickCounter) {
      this._removeBtnLoadMore(buttonLoad, this._onLoadMoreTasks);
      renderTasks(nextData, this._сreateTask.bind(this), tasksContainer);
      return;
    }
    renderTasks(nextData, this._сreateTask.bind(this), tasksContainer);
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
    renderTasks(firstPartMockData, this._сreateTask, tasksContainer);

    const loadMoreBtn = document.querySelector(`.load-more`);

    const cardsAmount = document.querySelectorAll(`.card`);
    // Скрыть кнопку подгрузки тасков если их меньше чем должно быть на странице.
    if (this._tasks.length === cardsAmount.length || this._tasks.length <= TASKS_AMOUNT_ON_PAGE) {
      this._removeBtnLoadMore(loadMoreBtn, this._onLoadMoreTasks);
    }

    loadMoreBtn.addEventListener(`click`, this._onLoadMoreTasks);
  }
}
