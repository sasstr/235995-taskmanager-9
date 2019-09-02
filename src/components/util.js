const MIN_TAGS_AMOUNT = 0;
const MAX_TAGS_AMOUNT = 3;

/**
 * Функция рендерит разметку.
 * @param {node} container элемент в который добавляется разметка из cb.
 * @param {string} markup функция которая возращает разметку, которая добавляется в container.
 * @return {void}
 */
const renderTemplate = (container, markup) => container.insertAdjacentHTML(`beforeend`, markup);

/**
 * Функция возращает разметку карточек задач.
 * @param {object} tasksData моковые данные для карточки задачи.
 * @param {function} makeTaskTemp Функция, которая возращает разметку компонента задачи.
 * @return {string}
 */
const createTasks = (tasksData, makeTaskTemp) => tasksData.map(makeTaskTemp).join(``);

/** Функция возращает случайное логическое значение true или false.
 *  @return {boolean} логическое значение true или false.
 */
const randomBoolean = () => Boolean(Math.round(Math.random()));

//  Функция возращает случайное целое число между min и max - включительно
const getRandomInteger = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
};

//  Функция возращает массив тегов длины от 0 до 3 исходного массива
const getTagsArray = (array) => {
  return array.slice(MIN_TAGS_AMOUNT, getRandomInteger(MIN_TAGS_AMOUNT, MAX_TAGS_AMOUNT));
};

//  Функция перемешивает элементы массива
const shuffleElemetsOfArray = (array) => {
  let cloneArray = array.slice();
  let j;
  let temp;
  for (let i = 0; i < cloneArray.length; i++) {
    j = Math.floor(Math.random() * (i + 1));
    temp = cloneArray[j];
    cloneArray[j] = cloneArray[i];
    cloneArray[i] = temp;
  }
  return cloneArray;
};

const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;
  return newElement.firstChild;
};

export {
  getTagsArray,
  shuffleElemetsOfArray,
  randomBoolean,
  getRandomInteger,
  createTasks,
  renderTemplate,
  createElement,
};
