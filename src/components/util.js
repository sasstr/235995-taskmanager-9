const MIN_TAGS_AMOUNT = 0;
const MAX_TAGS_AMOUNT = 3;

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

export {getTagsArray};
export {shuffleElemetsOfArray};
