import {
  renderTasks,
  render,
  unrender} from '../components/util';
import TaskController from '../controllers/task';
import Sort from '../components/sort';
import Board from '../components/board';
import TaskList from '../components/task-list';

import NoTasks from '../components/no-tasks';

const TASKS_AMOUNT_ON_PAGE = 8;

export default class BoardController {
  constructor(container, tasks) {
    this._board = new Board();
    this._container = container;
    this._clickCounter = 1;
    this._onChangeView = this._onChangeView.bind(this);
    this._onDataChange = this._onDataChange.bind(this);
    this._sort = new Sort();
    this._subscriptions = [];
    this._taskList = new TaskList();
    this._tasks = tasks;
  }

  _makeTask(task) {
    const taskController = new TaskController(this._taskList.getElement(), task, this._onDataChange, this._onChangeView);
    this._subscriptions.push(taskController.setDefaultView.bind(taskController));
  }

  _renderBoard() {
    unrender(this._taskList);

    this._taskList.removeElement();
    render(this._board.getElement(), this._taskList);
    this._tasks.forEach((taskMock) => this._makeTask(taskMock));
  }

  _onDataChange(newData, oldData) {
    this._tasks[this._tasks.findIndex((it2) => it2 === oldData)] = newData;

    this._renderBoard(this._tasks);
  }

  _onChangeView() {
    this._subscriptions.forEach((it) => it());
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
      renderTasks(nextData, this._сreate.bind(this), tasksContainer);
      return;
    }
    renderTasks(nextData, this._сreate.bind(this), tasksContainer);
  }

  // Метод отрисует отсортированные таски.
  _renderSortedTasks(sortedTasks, tasksBoard) {
    if (sortedTasks.length > TASKS_AMOUNT_ON_PAGE) {
      sortedTasks.slice(0, TASKS_AMOUNT_ON_PAGE)
      .forEach((taskMock) => render(tasksBoard, this._makeTask(taskMock)));

      const btnLoad = document.querySelector(`.load-more`);
      btnLoad.style.display = `block`;
      btnLoad.addEventListener(`click`, this._onLoadMoreTasks);
      return;
    }
    sortedTasks.forEach((taskMock) => render(tasksBoard, this._сreate(taskMock)));
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
    const firstPartTasks = this._tasks.slice(0, TASKS_AMOUNT_ON_PAGE);

    render(main, this._taskList);

    this._sort.getElement().addEventListener(`click`, (evt) => this._onSortLinkClick(evt));

    // Отрисовывает первую партию тасков на странице.
    renderTasks(firstPartTasks, this._makeTask, this._board).bind(this);

    const loadMoreBtn = document.querySelector(`.load-more`);

    const cardsAmount = (document.querySelectorAll(`.card`)).length;
    // Скрыть кнопку подгрузки тасков если их меньше чем должно быть на странице.
    if (this._tasks.length === cardsAmount || this._tasks.length <= TASKS_AMOUNT_ON_PAGE) {
      this._removeBtnLoadMore(loadMoreBtn, this._onLoadMoreTasks);
    }

    loadMoreBtn.addEventListener(`click`, this._onLoadMoreTasks);
  }
}
