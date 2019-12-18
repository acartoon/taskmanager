import Menu from "./components/menu";
import Search from "./components/search";
import Filter from "./components/filter";
import Sort from "./components/sort";
import BtnLoadMore from "./components/btnLoadMore";
import NoTasks from "./components/no-tasks";
import {render, createNode} from "./utils";
import {tasks} from "./data"
import BoardController from "./controllers/board-controller"

const mainContainer = document.body.querySelector(`.main`);

const boardContainer = createNode('section', `board`, `container`);
const boardTasks = createNode('div', `board__tasks`);

const menu = new Menu();
const search = new Search();
const filter = new Filter();
const sort = new Sort();
const noTasks = new NoTasks();
const btnLoadMore = new BtnLoadMore();

render(mainContainer.querySelector(`.main__control`), menu.getElement());
render(mainContainer, search.getElement());
render(mainContainer, filter.getElement());
render(mainContainer, boardContainer);

if(tasks.length === 0) {
  render(boardContainer, noTasks.getElement());
} else {
  
  render(boardContainer, sort.getElement());
  render(boardContainer, boardTasks);
  
  render(boardContainer, btnLoadMore.getElement());
  const boardController = new BoardController(boardTasks, tasks);
  boardController.init();
}
