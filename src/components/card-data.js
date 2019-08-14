const getCardData = () => ({
  description: [
    `Изучить теорию`,
    `Сделать домашку`,
    `Пройти интенсив на соточку`,
  ][Math.floor(Math.random() * 3)],
  dueDate: Date.now() + 1 + Math.floor(Math.random() * 7) * 24 * 3600 * 1000,
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
  isFavorite: true,
  isArchive: false,
});

export {getCardData};
