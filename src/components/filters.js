/**
 * Функция возращает html разметку фильтра.
 * @return {string}
 */
const makeFilterTemplate = ({title, count}) =>
  `<input
  type="radio"
  id="filter__${title}"
  class="filter__input visually-hidden"
  name="filter"
  ${title === `all` ? `checked` : ``}
  ${count === 0 ? `disabled` : ``}
/>
<label for="filter__${title}" class="filter__label">
${title} <span class="filter__${title}-count">${count}</span></label>`.trim();

const makeFiltersTemplate = (filtersData) =>
  `<section class="main__filter filter container">
    ${filtersData.map((filter) => makeFilterTemplate(filter)).join(``)}
  </section>`.trim();

export {makeFiltersTemplate};

