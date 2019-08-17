import {getTaskMockData} from './components/card-data';
import {makeMenuTemplate} from './components/menu';
import {makeSearchTemplate} from './components/search';
import {makeFilterTemplate} from './components/filters';
import {makeSortTemplate} from './components/sort';
import {makeTaskTemplate} from './components/card';
import {makeTaskEditTemplate} from './components/card-edit';
import {makeLoadMoreButtonTemplate} from './components/button';

const CARD_COUNT = 3;
const tasksAmount = 32;
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

const createTasksMockArray = (taskData) => {
  const TasksArray = [];
  for (let i = 0; i < tasksAmountOnPage; i++) {
    TasksArray.push(taskData());
  }
  console.log(TasksArray);
  return TasksArray;
};
console.log(createTasksMockArray(getTaskMockData));

const getTasksData = (numberOfTasks, tasksPageAmount) => {
  const modulo = numberOfTasks % tasksPageAmount;
  const pageAmoutn = modulo === 0 ?
    parseInt(tasksAmount / tasksPageAmount, 10)
    : parseInt(tasksAmount / tasksPageAmount, 10) + 1;
  const allTasksMock = [];
  if (modulo === 0) {
    for (let i = 0; i < pageAmoutn; i++) {
      allTasksMock.push(createTasksMockArray(getTaskMockData));
    }
    return allTasksMock;
  }

  console.log(allTasksMock);
};
getTasksData(tasksAmount, tasksAmountOnPage);

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
