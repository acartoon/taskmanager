import {menu} from "./components/menu";
import {search} from "./components/search";
import {filter} from "./components/filter";
import {task} from "./components/task";
import {newTask} from "./components/newTask";
import {btnLoadMore} from "./components/btnLoadMore";
import {sort} from "./components/sort";
import {render, toAddElement, createElement} from "./utils";

const CARDS_LENGTH = 3;
const mainContainer = document.body.querySelector(`.main`);

const boardContainer = createElement('section', `board`, `container`);
const boardTasks = createElement('div', `board__tasks`);


render(mainContainer.querySelector(`.main .main__control`), menu());
render(mainContainer, search());
render(mainContainer, filter());
toAddElement(mainContainer, boardContainer);
render(boardContainer, sort());
toAddElement(boardContainer, boardTasks);
render(boardContainer, btnLoadMore());
render(boardTasks, newTask());

new Array(CARDS_LENGTH).fill(``).forEach(() => {
  render(boardTasks, task());
});
