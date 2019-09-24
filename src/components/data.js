import {getTagsArray,
  randomBoolean,
  shuffleElemetsOfArray,
  getRendomItemOfArray
} from './util';

const Unit = {
  week: 7,
  day: 24,
  hour: 60,
  minute: 60,
  second: 1000
};

const description = [
  `Изучить теорию`,
  `Сделать домашку`,
  `Пройти интенсив на соточку`,
];

const getColors = () => [
  `black`,
  `blue`,
  `yellow`,
  `green`,
  `pink`,
];

const tagsList = new Set([
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
]);

const getDueDate = () => Date.now() + 1 + Math.floor(Math.random() * Unit.week) * Unit.day * Unit.hour * Unit.minute * Unit.second;

const getTaskData = () => ({
  color: getRendomItemOfArray(getColors()),
  description: getRendomItemOfArray(description),
  dueDate: getDueDate(),
  tags: getTagsArray(shuffleElemetsOfArray([...tagsList])),
  repeatingDays: {
    'mo': false,
    'to': false,
    'we': false,
    'th': false,
    'fr': false,
    'sa': randomBoolean(),
    'su': false,
  },
  favorite: randomBoolean(),
  archive: randomBoolean(),
});

/** Функция возращает массив объектов с моковыми данными тасков
 *
 * @param {function} makeTaskData функция которая возращает объект с моковыми данными одной таски
 * @param {numder} tasksNumberOnPage кол-во тасков
 * @return {array} возращает массив объектов с моковыми данными тасков
 */
const createTasksArray = (makeTaskData, tasksNumberOnPage) => {
  return new Array(tasksNumberOnPage).fill(``)
                                    .map(makeTaskData);
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
    if (task.tags.length > 0) {
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

const getfilterData = (filterCount) => [
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
];

const getMenuData = () => [
  {
    id: `new-task`,
    name: `+ ADD NEW TASK`,
    isChecked: false,
  },
  {
    id: `task`,
    name: `TASKS`,
    isChecked: true,
  },
  {
    id: `statistic`,
    name: `STATISTICS`,
    isChecked: false,
  }
];

export {
  createTasksArray,
  getAmountFilters,
  getColors,
  getfilterData,
  getMenuData,
  getTaskData,
};
