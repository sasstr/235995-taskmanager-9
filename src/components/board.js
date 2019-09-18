import AbstractComponent from './abstract-component';
import {getSorts} from './data';
import Sort from './sort';

export default class Board extends AbstractComponent {
  constructor(tasks) {
    super();

    this._tasks = tasks;
    this._sort = new Sort(getSorts());
  }

  _isTasks(tasks) {
    return tasks && tasks.length > 0;
  }

  getTemplate() {
    return `<section class="board container">
      ${this._isTasks(this._tasks) ? this._sort.getTemplate() : ``}

    <div class="board__tasks">
    </div>
      ${this._isTasks(this._tasks) ? `<button class="load-more" type="button">load more</button>`
    : ``}
    </section>`.trim();
  }
}
