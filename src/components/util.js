//  Функция возращает случайное целое число между min и max - включительно
const getRandomInteger = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
};

//  Функция возращает случайной длины массив от исходного массива
const getRandomLengthArray = (array) => {
  return array.slice(0, getRandomInteger(1, array.length));
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

export {getRandomLengthArray};
export {shuffleElemetsOfArray};
