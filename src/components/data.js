import {getTagsArray, randomBoolean, shuffleElemetsOfArray, getRandomInteger} from './util';

const Unit = {
  week: 7,
  day: 24,
  hour: 60,
  minute: 60,
  second: 1000
};

const getTaskMockData = () => ({
  description: [
    `Изучить теорию`,
    `Сделать домашку`,
    `Пройти интенсив на соточку`,
  ][Math.floor(Math.random() * 3)],
  dueDate: Date.now() + 1 + Math.floor(Math.random() * Unit.week) * Unit.day * Unit.hour * Unit.minute * Unit.second,
  tags: new Set([
    `homework`,
    `theory`,
    `practice`,
    `intensive`,
    `keks`,
    `todo`,
    `personal`,
    `important`,
    `cinema`,
    `repeat`,
    `entertaiment`,
  ]),
  get tagsList() {
    return getTagsArray(shuffleElemetsOfArray([...this.tags]));
  },
  repeatingDays: {
    'mo': false,
    'to': randomBoolean(),
    'we': false,
    'th': false,
    'fr': false,
    'sa': false,
    'su': false,
  },
  color: [
    `black`,
    `blue`,
    `yellow`,
    `green`,
    `pink`,
  ][Math.floor(Math.random() * 5)],
  get isFavorite() {
    return randomBoolean();
  },
  get isArchive() {
    return Date.now() > this.dueDate ? true : false;
  },
});

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

const getAmountFilters = (data) => {
  const filterCounter = {
    all: data.length,
    overdue: 0,
    today: 0,
    favorites: 0,
    repeating: 0,
    tags: 0,
    archive: 0,
  };

  const checkRepeating = (days) => Object.values(days).some((dayRepeat) => dayRepeat);
  const changeTimeToDate = (time) => new Date(time).toDateString();

  data.forEach((task) => {
    if (checkRepeating(task.repeatingDays)) {
      filterCounter.repeating++;
    }
    if (changeTimeToDate(task.dueDate) < changeTimeToDate(Date.now())) {
      filterCounter.overdue++;
    }
    if (changeTimeToDate(task.dueDate) === changeTimeToDate(Date.now())) {
      filterCounter.today++;
    }
    if (task.tagsList.size > 0) {
      filterCounter.tags++;
    }
    if (task.isArchive) {
      filterCounter.archive++;
    }
    if (task.isFavorite) {
      filterCounter.favorites++;
    }
  });
  return filterCounter;
};

const getfilterData = (filterCount) => ([
  {
    title: `all`,
    count: filterCount.all,
  },
  {
    title: `overdue`,
    count: filterCount.overdue,
  },
  {
    title: `today`,
    count: filterCount.today,
  },
  {
    title: `favorites`,
    count: filterCount.favorites,
  },
  {
    title: `repeating`,
    count: filterCount.repeating,
  },
  {
    title: `tags`,
    count: filterCount.tags,
  },
  {
    title: `archive`,
    count: filterCount.archive,
  },
]);

export {getTaskMockData, createTasksMockArray, getfilterData, getAmountFilters};
