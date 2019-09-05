import {getTaskData,
  createTasksArray,
  getfilterData,
  getAmountFilters,
  getSorts,
  getMenuData} from './components/data';
import {getRandomInteger,
  createTasks,
  createElement,
  render,
  Position} from './components/util';
import Menu from './components/menu';
import Search from './components/search';
import Filters from './components/filters';
import Sort from './components/sort';
import Card from './components/card';
import CardEdit from './components/card-edit';
import Button from './components/button';

const MIN_TASKS_ON_PAGE = 12;
const MAX_TASKS_ON_PAGE = 43;
const TASKS_AMOUNT_ON_PAGE = 8;

const tasksAmount = getRandomInteger(MIN_TASKS_ON_PAGE, MAX_TASKS_ON_PAGE);
const tasksData = createTasksArray(getTaskData, tasksAmount);
const firstPartMockData = tasksData.slice(0, TASKS_AMOUNT_ON_PAGE);
const amountFilters = getAmountFilters(tasksData);

const menu = new Menu(getMenuData());
const search = new Search();
const sort = new Sort(getSorts());
const button = new Button();
const filters = new Filters(getfilterData(amountFilters));

const main = document.querySelector(`.main`);
const mainControl = main.querySelector(`.main__control`);

// Функция отрисовывает карточки задач в разметку
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

  render(tasksContainer, task.getElement(), Position.BEFOREEND);
};
/**
 * Функция возращает html елемент контейнера для board.
 * @param {array} mockData
 * @return {string} разметку шаблона
 */
const compileBoardTemplate = () =>
  `<section class="board container">
    ${sort.getTemplate()}
    <div class="board__tasks">
    </div>
    ${button.getTemplate()}
  </section>`.trim();

render(mainControl, menu.getElement());
render(main, search.getElement());
render(main, filters.getElement());
render(main, createElement(compileBoardTemplate()));
const tasksContainer = document.querySelector(`.board__tasks`);
render(tasksContainer, createTasks(firstPartMockData, сreateTask));
let clickCounter = 1;
const loadMoreBtn = document.querySelector(`.load-more`);
const onLoadMoreTasks = () => {
  ++clickCounter;
  const nextData = tasksData.slice((clickCounter - 1) * TASKS_AMOUNT_ON_PAGE, TASKS_AMOUNT_ON_PAGE * (clickCounter));
  if (Math.ceil(tasksData.length / TASKS_AMOUNT_ON_PAGE) === clickCounter) {
    loadMoreBtn.style.display = `none`; // скрыть кнопку после отрисовки последней партии тасков.
    loadMoreBtn.removeEventListener(`click`, onLoadMoreTasks);
    render(tasksContainer, createElement(createTasks(nextData, сreateTask)));
  }
  render(tasksContainer, createElement(createTasks(nextData, сreateTask)));
};

loadMoreBtn.addEventListener(`click`, onLoadMoreTasks);
