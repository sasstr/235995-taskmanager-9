import {getTaskData,
  createTasksArray,
  getfilterData,
  getAmountFilters,
  getSorts,
  getMenuData} from './components/data';
import {getRandomInteger,
  createElement,
  makeTasks,
  render} from './components/util';
import Menu from './components/menu';
import Search from './components/search';
import Filters from './components/filters';
import Sort from './components/sort';
import Card from './components/card';
import CardEdit from './components/card-edit';
import NoTasks from './components/no-tasks';

const MIN_TASKS_ON_PAGE = 0;
const MAX_TASKS_ON_PAGE = 30;
const TASKS_AMOUNT_ON_PAGE = 8;

const tasksAmount = getRandomInteger(MIN_TASKS_ON_PAGE, MAX_TASKS_ON_PAGE);
const tasksData = createTasksArray(getTaskData, tasksAmount);
const firstPartMockData = tasksData.slice(0, TASKS_AMOUNT_ON_PAGE);

const amountFilters = getAmountFilters(tasksData);
const menu = new Menu(getMenuData());
const search = new Search();
const sort = new Sort(getSorts());
const filters = new Filters(getfilterData(amountFilters));

const main = document.querySelector(`.main`);
const mainControl = main.querySelector(`.main__control`);


/** Функция возращает элемент таски
 *
 * @param {object} taskMock объект моковых данных таски
 * @return {node} возращает элемент таски
 */
const сreateTask = (taskMock) => {
  const task = new Card(taskMock);
  const taskEdit = new CardEdit(taskMock);

  const onEscKeyDown = (evt) => {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      tasksContainer.replaceChild(task.getElement(), taskEdit.getElement());
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  task.getElement()
    .querySelector(`.card__btn--edit`)
    .addEventListener(`click`, () => {
      tasksContainer.replaceChild(taskEdit.getElement(), task.getElement());
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
      tasksContainer.replaceChild(task.getElement(), taskEdit.getElement());
      document.removeEventListener(`keydown`, onEscKeyDown);
    });
  return task.getElement();
};
/**
 * Функция возращает разметку шаблона для board.
 * @param {number} amountTasks количество тасков
 * @return {string} разметку шаблона
 */
const compileBoardTemplate = () =>
  `<section class="board container">
    ${(tasksData && tasksData.length > 0) ? sort.getTemplate() : ``}
    <div class="board__tasks">
    </div>
    ${tasksData.length > 0 ? `<button class="load-more" type="button">load more</button>` : ``}
  </section>`.trim();

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

/** Функция отрисует шаблон noTasks если нет созданных тасков.
 *
 * @param {Array} mockTasks Массив с моковыми данными тасков
 * @param {node} container контейнер для тасков
 * @return {void} Отрисует шаблон noTasks если нет созданных тасков.
 */
const renderTasksTemplate = (mockTasks, container) => {
  if (!mockTasks || mockTasks.length < 1) {
    const noTasks = new NoTasks();
    render(container, noTasks.getElement());
    return;
  }
  makeTasks(firstPartMockData, сreateTask, container);
  const loadMoreBtn = document.querySelector(`.load-more`);

  let clickCounter = 1;
  const onLoadMoreTasks = () => {
    ++clickCounter;
    const nextData = mockTasks.slice((clickCounter - 1) * TASKS_AMOUNT_ON_PAGE, TASKS_AMOUNT_ON_PAGE * (clickCounter));

    if (Math.ceil(mockTasks.length / TASKS_AMOUNT_ON_PAGE) === clickCounter) {
      removeBtnLoadMore(loadMoreBtn, onLoadMoreTasks);
      makeTasks(nextData, сreateTask, container);
      return;
    }
    makeTasks(nextData, сreateTask, container);
  };

  // Скрыть кнопку подгрузки тасков если их меньше чем должно быть на странице.
  if (mockTasks.length <= TASKS_AMOUNT_ON_PAGE) {
    removeBtnLoadMore(loadMoreBtn, onLoadMoreTasks);
  }

  loadMoreBtn.addEventListener(`click`, onLoadMoreTasks);
};

render(mainControl, menu.getElement());
render(main, search.getElement());
render(main, filters.getElement());
render(main, createElement(compileBoardTemplate()));
const tasksContainer = document.querySelector(`.board__tasks`);
renderTasksTemplate(tasksData, tasksContainer);
