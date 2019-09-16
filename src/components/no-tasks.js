import AbstractComponent from './abstract-component';

export default class NoTasks extends AbstractComponent {
  constructor(menuData) {
    super();

    this._menuData = menuData;
  }

  getTemplate() {
    return `<section class="board container">
    <p class="board__no-tasks">
      Congratulations, all tasks were completed! To create a new click on
      «add new task» button.
    </p>
  </section>`.trim();
  }
}
