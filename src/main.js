import {getTaskData,
  createTasksArray,
  getfilterData,
  getAmountFilters,
  getSorts,
  getMenuData} from './components/data';
import {getRandomInteger,
  createTasks,
  renderTemplate,
  render} from './components/util';
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
const cardEdit = new CardEdit(tasksData[0]);
const filters = new Filters(getfilterData(amountFilters));
const main = document.querySelector(`.main`);
const mainControl = main.querySelector(`.main__control`);
const boardTasks = main.querySelector(`.board__tasks`);
const createCard = (taskMock) => {
  const newCard = new Card(taskMock);
  return render(boardTasks, newCard.getTemplate());
};
/**
 * Функция возращает html разметку контейнера для board.
 * @param {array} mockData
 * @return {string} разметку шаблона
 */
const compileBoardTemplate = (mockData = firstPartMockData) =>
  `<section class="board container">
    ${sort.getTemplate()}
    <div class="board__tasks">
      ${cardEdit.getTemplate()}
      ${createTasks(mockData, createCard)}
    </div>
    ${button.getTemplate()}
  </section>`.trim();

renderTemplate(mainControl, menu.getTemplate());
renderTemplate(main, search.getTemplate());
renderTemplate(main, filters.getTemplate());
renderTemplate(main, compileBoardTemplate());

let clickCounter = 1;
const loadMoreBtn = document.querySelector(`.load-more`);
const onLoadMoreTasks = () => {
  ++clickCounter;
  const clickData = tasksData.slice((clickCounter - 1) * TASKS_AMOUNT_ON_PAGE, TASKS_AMOUNT_ON_PAGE * clickCounter);
  if (Math.ceil(tasksData.length / TASKS_AMOUNT_ON_PAGE) === clickCounter) {
    loadMoreBtn.style.display = `none`; // скрыть кнопку после отрисовки последней партии тасков.
    loadMoreBtn.removeEventListener(`click`, onLoadMoreTasks);
    renderTemplate(boardTasks, createTasks(clickData, createCard));
  }
  renderTemplate(boardTasks, createTasks(clickData, createCard));
};

loadMoreBtn.addEventListener(`click`, onLoadMoreTasks);
