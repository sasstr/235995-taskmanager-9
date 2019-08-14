import {getMenu} from './components/menu';
import {getSearch} from './components/search';
import {getMainFilter} from './components/filters';
import {getFilterList} from './components/filters';
import {getCardData} from './components/card-data';
import {getCard} from './components/card';
import {getCardEditForm} from './components/card-edit';
import {getButtonLoadMore} from './components/button';

const CARD_COUNT = 3;
/**
 * Функция возращает разметку карточек задач.
 * @param {number} cardCount колличество карточек задач.
 * @param {object} taskData моковые данные для карточки задачи.map(getCard())
 * @return {string}
 */
const getCardTasks = (cardCount, taskData) => new Array(cardCount).fill(``).map(taskData).map(getCard).join(``);

/**
 * Функция возращает html разметку контейнера для board.
 * @return {string}
 */
const getBoardContainer = () =>
  `<section class="board container">
    ${getFilterList()}
    <div class="board__tasks">
      ${getCardEditForm()}
      ${getCardTasks(CARD_COUNT, getCardData)}
    </div>
    ${getButtonLoadMore()}
  </section>`.trim();

/**
 * Функция рендерит разметку.
 * @param {node} container элемент в который добавляется разметка из cb.
 * @param {string} markup функция которая возращает разметку, которая добавляется в container.
 * @return {void}
 */
const renderComponent = (container, markup) => container.insertAdjacentHTML(`beforeend`, markup);

const main = document.querySelector(`.main`);
const mainControl = main.querySelector(`.main__control`);

renderComponent(mainControl, getMenu());
renderComponent(main, getSearch());
renderComponent(main, getMainFilter());
renderComponent(main, getBoardContainer());
