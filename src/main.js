import {getTaskData,
  createTasksArray,
  getfilterData,
  getAmountFilters,
  getMenuData} from './components/data';
import {getRandomInteger,
  render} from './components/util';
import BoardController from './controllers/board';
import Menu from './components/menu';
import Search from './components/search';
import Filters from './components/filters';

const MIN_TASKS_ON_PAGE = 7;
const MAX_TASKS_ON_PAGE = 27;

const tasksAmount = getRandomInteger(MIN_TASKS_ON_PAGE, MAX_TASKS_ON_PAGE);
const tasksData = createTasksArray(getTaskData, tasksAmount);

const amountFilters = getAmountFilters(tasksData);
const menu = new Menu(getMenuData());
const search = new Search();
const filters = new Filters(getfilterData(amountFilters));

const main = document.querySelector(`.main`);
const mainControl = main.querySelector(`.main__control`);

render(mainControl, menu.getElement());
render(main, search.getElement());
render(main, filters.getElement());

const tasksContainer = document.querySelector(`.board__tasks`);
const boardController = new BoardController(tasksContainer, tasksData);
boardController.init();
