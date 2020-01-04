import Menu from "./components/menu";
import Search from "./components/search";
import Filter from "./components/filter";
import NoTasks from "./components/no-tasks";
import {render, createNode} from "./utils";
import {tasks} from "./data"
import BoardController from "./controllers/board-controller"
import PageController from "./controllers/page-controller";

const mainContainer = document.body.querySelector(`.main`);

const pageController =  new PageController(tasks, mainContainer)
pageController.init();
// const boardContainer = createNode('section', `board`, `container`);

// const menu = new Menu();
// const search = new Search();
// const filter = new Filter();
// const noTasks = new NoTasks();

// render(mainContainer.querySelector(`.main__control`), menu.getElement());
// render(mainContainer, search.getElement());
// render(mainContainer, filter.getElement());
// render(mainContainer, boardContainer);

// if(tasks.length === 0) {
//   render(boardContainer, noTasks.getElement());
// } else {
//   const boardController = new BoardController(boardContainer, tasks);
//   boardController.init();
// }
