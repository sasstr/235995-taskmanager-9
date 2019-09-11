const MIN_TAGS_AMOUNT = 0;
const MAX_TAGS_AMOUNT = 3;
const Position = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`
};
/**
 * Функция рендерит разметку.
 * @param {node} container элемент в который добавляется разметка из cb.
 * @param {node} element функция которая возращает елемент, которая добавляется в container.
 * @param {string} place позиция добавления в верстку.
 * @return {void} Добавляет элементы в верстку
 */
const render = (container, element, place = Position.BEFOREEND) => {
  switch (place) {
    case Position.AFTERBEGIN:
      container.prepend(element);
      break;
    case Position.BEFOREEND:
      container.append(element);
      break;
  }
};
// функция удаляет элемент из разметки
const unrender = (element) => {
  if (element) {
    element.remove();
  }
};

// Функция добавляет к элементу контейнеру элементы таски
const makeTasks = (MockTasks, makeTask, elemContainer) => MockTasks.forEach((task) => elemContainer.append(makeTask(task)));

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

/** Функция возращает случайный элемент массива
 *
 * @param {array} array массив
 * @return {mix} случайный элемент массива
 */
const getRendomItemOfArray = (array) => array[getRandomInteger(0, array.length)];

// Функция создает DOM элемент DIV и в него помещает переданную разметку.
const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;
  return newElement.firstChild;
};

export {
  createElement,
  getTagsArray,
  getRandomInteger,
  getRendomItemOfArray,
  makeTasks,
  render,
  randomBoolean,
  shuffleElemetsOfArray,
  unrender
};
