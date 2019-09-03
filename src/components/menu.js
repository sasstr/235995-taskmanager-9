const getMenuData = () => [
  {
    id: `new-task`,
    name: `+ ADD NEW TASK`,
    isCheced: false,
  },
  {
    id: `task`,
    name: `TASKS`,
    isCheced: true,
  },
  {
    id: `statistic`,
    name: `STATISTICS`,
    isCheced: false,
  }
];

/**
 * Функция возращает html разметку пунктов меню.
 * @return {string}
 */
const makeMenuTemplate = (menuData) =>
  `<section class="control__btn-wrap">
    ${menuData.map(item) => `<input
      type="radio"
      name="control"
      id="control__${item.id}"
      class="control__input visually-hidden"
      ${item.isCheced === true ? `checked` : ``}
    />
    <label for="control__${item.id}" class="control__label">${item.name}</label>`.trim()}
  </section>`.trim();

export {makeMenuTemplate};
