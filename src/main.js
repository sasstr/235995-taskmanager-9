import {getTaskMockData, createTasksMockArray, getfilterData, getAmountFilters} from './components/data';
import {getRandomInteger, createTasksMock, renderTemplate} from './components/util';
import {makeMenuTemplate} from './components/menu';
import {makeSearchTemplate} from './components/search';
import {makeFiltersTemplate} from './components/filters';
import {makeSortTemplate} from './components/sort';
import {makeTaskTemplate} from './components/card';
import {makeTaskEditTemplate} from './components/card-edit';
import {makeLoadMoreButtonTemplate} from './components/button';

const MIN_TASKS_ON_PAGE = 17;
const MAX_TASKS_ON_PAGE = 45;
const TASKS_AMOUNT_ON_PAGE = 8;
const tasksAmount = getRandomInteger(MIN_TASKS_ON_PAGE, MAX_TASKS_ON_PAGE);
const tasksMockData = createTasksMockArray(getTaskMockData, tasksAmount);
const firstPartMockData = tasksMockData.slice(0, TASKS_AMOUNT_ON_PAGE);
const amountFilters = getAmountFilters(tasksMockData);
const filtersDataMock = getfilterData(amountFilters);

/**
 * Функция возращает html разметку контейнера для board.
 * @param {array} mockData
 * @return {string} разметку шаблона
 */
const compileBoardTemplate = (mockData = firstPartMockData) =>
  `<section class="board container">
    ${makeSortTemplate()}
    <div class="board__tasks">
      ${makeTaskEditTemplate()}
      ${createTasksMock(mockData, makeTaskTemplate)}
    </div>
    ${makeLoadMoreButtonTemplate()}
  </section>`.trim();

const main = document.querySelector(`.main`);
const mainControl = main.querySelector(`.main__control`);

renderTemplate(mainControl, makeMenuTemplate());
renderTemplate(main, makeSearchTemplate());
renderTemplate(main, makeFiltersTemplate(filtersDataMock));
renderTemplate(main, compileBoardTemplate());

let clickCounter = 1;
const loadMoreBtn = document.querySelector(`.load-more`);
const onLoadMoreTasks = () => {
  const boardTasks = main.querySelector(`.board__tasks`);
  ++clickCounter;
  const clickData = tasksMockData.slice((clickCounter - 1) * TASKS_AMOUNT_ON_PAGE, TASKS_AMOUNT_ON_PAGE * clickCounter);
  if (Math.ceil(tasksMockData.length / TASKS_AMOUNT_ON_PAGE) === clickCounter) {
    loadMoreBtn.style.display = `none`; // скрыть кнопку после отрисовки последней партии тасков.
    loadMoreBtn.removeEventListener(`click`, onLoadMoreTasks);
    renderTemplate(boardTasks, createTasksMock(clickData, makeTaskTemplate));
  }
  renderTemplate(boardTasks, createTasksMock(clickData, makeTaskTemplate));
};

loadMoreBtn.addEventListener(`click`, onLoadMoreTasks);
