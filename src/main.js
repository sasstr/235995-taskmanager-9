import {getTaskData,
  createTasksArray,
  getfilterData,
  getAmountFilters,
  getSorts,
  getMenuData} from './components/data';
import {getRandomInteger, createTasks, renderTemplate} from './components/util';
import Menu from './components/menu';
import Search from './components/search';
import Filters from './components/filters';
import Sort from './components/sort';
import Card from './components/card';
import {makeTaskEditTemplate} from './components/card-edit';
import Button from './components/button';

const MIN_TASKS_ON_PAGE = 12;
const MAX_TASKS_ON_PAGE = 43;
const TASKS_AMOUNT_ON_PAGE = 8;
const tasksAmount = getRandomInteger(MIN_TASKS_ON_PAGE, MAX_TASKS_ON_PAGE);
const tasksData = createTasksArray(getTaskData, tasksAmount);
const firstPartMockData = tasksData.slice(0, TASKS_AMOUNT_ON_PAGE);
const amountFilters = getAmountFilters(tasksData);
const filtersData = getfilterData(amountFilters);

const card = new Card(tasksData[0]);
const filters = new Filters(filtersData);
/* console.log(tasksData);
console.log(filters);
console.log(card);
 const makeNewCards = (cardsData = firstPartMockData) => {
  cardsData.map((cardInfo) => {
    new Card(cardInfo).getTemplate();
  });
};
 const cardsTemplate = makeNewCards();
console.log(cardsTemplate); */
/**
 * Функция возращает html разметку контейнера для board.
 * @param {array} mockData
 * @return {string} разметку шаблона
 */
const compileBoardTemplate = (mockData = firstPartMockData) =>
  `<section class="board container">
    ${makeSortTemplate(getSorts())}
    <div class="board__tasks">
      ${makeTaskEditTemplate()}
      ${createTasks(mockData, card.getTemplate)}
    </div>
    ${makeLoadMoreButtonTemplate()}
  </section>`.trim();

const main = document.querySelector(`.main`);
const mainControl = main.querySelector(`.main__control`);


renderTemplate(mainControl, makeMenuTemplate(getMenuData()));
renderTemplate(main, makeSearchTemplate());
renderTemplate(main, filters.getTemplate(filtersData));
renderTemplate(main, compileBoardTemplate());

let clickCounter = 1;
const loadMoreBtn = document.querySelector(`.load-more`);
const onLoadMoreTasks = () => {
  const boardTasks = main.querySelector(`.board__tasks`);
  ++clickCounter;
  const clickData = tasksData.slice((clickCounter - 1) * TASKS_AMOUNT_ON_PAGE, TASKS_AMOUNT_ON_PAGE * clickCounter);
  if (Math.ceil(tasksData.length / TASKS_AMOUNT_ON_PAGE) === clickCounter) {
    loadMoreBtn.style.display = `none`; // скрыть кнопку после отрисовки последней партии тасков.
    loadMoreBtn.removeEventListener(`click`, onLoadMoreTasks);
    renderTemplate(boardTasks, createTasks(clickData, card.getTemplate));
  }
  renderTemplate(boardTasks, createTasks(clickData, card.getTemplate));
};

loadMoreBtn.addEventListener(`click`, onLoadMoreTasks);
