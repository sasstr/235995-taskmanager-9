import {
  createElement,
  makeTasks,
  render} from './components/util';
import {getSorts} from './components/data';
import Card from './components/card';
import CardEdit from './components/card-edit';
import NoTasks from './components/no-tasks';
import Sort from './components/sort';

const sort = new Sort(getSorts());

export default class BoardController {
  constructor(container, tasks, tasksAmount) {
    this._container = container;
    this._tasks = tasks;
    this._tasksAmount = tasksAmount;
  }

  /** Метод возращает элемент таски
   *
   * @param {object} taskMock объект моковых данных таски
   * @return {node} возращает элемент таски
   */
  _сreateTask(taskMock) {
    const task = new Card(taskMock);
    const taskEdit = new CardEdit(taskMock);

    const onEscKeyDown = (evt) => {
      if (evt.key === `Escape` || evt.key === `Esc`) {
        taskEdit.getElement().parentNode.replaceChild(task.getElement(), taskEdit.getElement());
        document.removeEventListener(`keydown`, onEscKeyDown);
      }
    };

    task.getElement()
      .querySelector(`.card__btn--edit`)
      .addEventListener(`click`, () => {
        task.getElement().parentNode.replaceChild(taskEdit.getElement(), task.getElement());
        document.addEventListener(`keydown`, onEscKeyDown);
      });

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
    return task.getElement();
  }

  _isSortTemplate(tasks) {
    return tasks && tasks.length > 0 ? sort.getTemplate() : ``;
  }

  _isLoadMoreButton(tasksInfo) {
    return tasksInfo.length > 0 ?
      `<button class="load-more" type="button">load more</button>`
      : ``;
  }

  /**
   * Метод возращает разметку шаблона для board.
   * @param {array} tasksMock количество тасков
   * @return {string} разметку шаблона
   */
  _compileBoardTemplate(tasksMock) {
    return `<section class="board container">
      ${this._isSortTemplate(tasksMock)}
    <div class="board__tasks">
    </div>
      ${this._isLoadMoreButton(tasksMock)}
    </section>`.trim();
  }

  init() {
    if (!this._tasks || this._tasks.length < 1) {
      const noTasks = new NoTasks();
      render(this._container, noTasks.getElement());
      return;
    }
    const TASKS_AMOUNT_ON_PAGE = 8;
    const main = document.querySelector(`.main`);
    const firstPartMockData = this._tasks.slice(0, TASKS_AMOUNT_ON_PAGE);

    render(main, createElement(this._compileBoardTemplate(this._tasks)));
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
