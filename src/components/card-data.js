import {getTagsArray} from './util';
import {shuffleElemetsOfArray} from './util';

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
    'to': Boolean(Math.round(Math.random())),
    'we': false,
    'th': false,
    'fr': true,
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
    return Math.round(Math.random()) > 0.5 ? true : false;
  },
  get isArchive() {
    return Date.now() > this.dueDate ? true : false;
  },
});

export {getTaskMockData};
