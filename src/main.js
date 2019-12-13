import {menu} from "./components/menu";
import {search} from "./components/search";
import {filter} from "./components/filter";
import {task} from "./components/task";
import {newTask} from "./components/newTask";
import {btnLoadMore} from "./components/btnLoadMore";
import {sort} from "./components/sort";
import {render, toAddElement, createElement} from "./utils";
import {tasks} from "./data"

const TASK_TO_RENDER = 5;
let tasks_count = TASK_TO_RENDER;
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

tasks.slice(0, TASK_TO_RENDER).forEach((taskItem) => render(boardTasks, task(taskItem)));

const renderTasks = () => {
  tasks.slice(tasks_count, tasks_count + TASK_TO_RENDER).forEach((taskItem) => render(boardTasks, task(taskItem)));
  tasks_count = tasks_count + TASK_TO_RENDER;
  if(tasks_count >= tasks.length) {
    button.classList.add(`visually-hidden`);
  }
};

const button = document.body.querySelector('.load-more');
button.addEventListener(`click`, renderTasks)
