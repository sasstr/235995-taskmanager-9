import {getTaskMockData} from './components/card-data';
import {getRandomInteger} from './components/util';
import {makeMenuTemplate} from './components/menu';
import {makeSearchTemplate} from './components/search';
import {makeFilterTemplate} from './components/filters';
import {makeSortTemplate} from './components/sort';
import {makeTaskTemplate} from './components/card';
import {makeTaskEditTemplate} from './components/card-edit';
import {makeLoadMoreButtonTemplate} from './components/button';

const CARD_COUNT = 3;
const MIN_TASKS_ON_PAGE = 17;
const MAX_TASKS_ON_PAGE = 45;
const tasksAmount = getRandomInteger(MIN_TASKS_ON_PAGE, MAX_TASKS_ON_PAGE);
const tasksAmountOnPage = 8;

/**
 * Функция возращает разметку карточек задач.
 * @param {number} cardCount колличество карточек задач.
 * @param {object} taskData моковые данные для карточки задачи.map(getCard())
 * @return {string}
 */
const createTasksMock = (cardCount, taskData) => new Array(cardCount)
                                                        .fill(``)
                                                        .map(taskData)
                                                        .map(makeTaskTemplate)
                                                        .join(``);
/** Функция возращает массив объектов с моковыми данными тасков
 *
 * @param {function} makeTaskData функция которая возращает объект с моковыми данными одной таски
 * @param {numder} tasksNumberOnPage кол-во тасков
 * @return {array} возращает массив объектов с моковыми данными тасков
 */
const createTasksMockArray = (makeTaskData, tasksNumberOnPage) => {
  const tasksArray = [];
  for (let i = 0; i < tasksNumberOnPage; i++) {
    tasksArray.push(makeTaskData());
  }
  return tasksArray;
};
const tasksMockData = createTasksMockArray(getTaskMockData, tasksAmount);
const makeMockDataForOnePage = (tasksData, tasksNumberOnPage) => {
  let index = 0;
  const pagesNumber = Math.cail(tasksData.length / tasksNumberOnPage);
  tasksData.slice(index, tasksNumberOnPage);
};

/**
 * Функция возращает html разметку контейнера для board.
 * @return {string}
 */
const compileBoardTemplate = () =>
  `<section class="board container">
    ${makeSortTemplate()}
    <div class="board__tasks">
      ${makeTaskEditTemplate()}
      ${createTasksMock(CARD_COUNT, getTaskMockData)}
    </div>
    ${makeLoadMoreButtonTemplate()}
  </section>`.trim();

/**
 * Функция рендерит разметку.
 * @param {node} container элемент в который добавляется разметка из cb.
 * @param {string} markup функция которая возращает разметку, которая добавляется в container.
 * @return {void}
 */
const renderTemplate = (container, markup) => container.insertAdjacentHTML(`beforeend`, markup);

const main = document.querySelector(`.main`);
const mainControl = main.querySelector(`.main__control`);

renderTemplate(mainControl, makeMenuTemplate());
renderTemplate(main, makeSearchTemplate());
renderTemplate(main, makeFilterTemplate());
renderTemplate(main, compileBoardTemplate());

let clickCount = 0;
const loadMoreBtn = document.querySelector(`.load-more`);
loadMoreBtn.addEventListener(`click`, () => {
  ++clickCount;
  const clickData = tasksMockData.slice((clickCount - 1) * tasksAmountOnPage, tasksAmountOnPage * clickCount);
  if (Math.ceil(tasksMockData.length / tasksAmountOnPage) === clickCount) {
    loadMoreBtn.style.display = `none`;
    return clickData;
  }
  clickData;
});
