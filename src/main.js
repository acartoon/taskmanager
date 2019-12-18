import Menu from "./components/menu";
import Search from "./components/search";
import Filter from "./components/filter";
import Sort from "./components/sort";
import Task from "./components/task";
import TaskEdit from "./components/task-edit";
import BtnLoadMore from "./components/btnLoadMore";
import {render, createNode} from "./utils";
import {tasks} from "./data"

const TASK_TO_RENDER = 8;
const STEP_TO_RENDER = 4;
let tasks_count = TASK_TO_RENDER;
const mainContainer = document.body.querySelector(`.main`);

const boardContainer = createNode('section', `board`, `container`);
const boardTasks = createNode('div', `board__tasks`);

const menu = new Menu();
const search = new Search();
const filter = new Filter();
const sort = new Sort();
const btnLoadMore = new BtnLoadMore();

render(mainContainer.querySelector(`.main__control`), menu.getElement());
render(mainContainer, search.getElement());
render(mainContainer, filter.getElement());
render(mainContainer, boardContainer);
render(boardContainer, sort.getElement());
render(boardContainer, boardTasks);

render(boardContainer, btnLoadMore.getElement());

const renderTask = (taskMock) => {
  const task = new Task(taskMock);
  const taskEdit = new TaskEdit(taskMock);
  render(boardTasks, task.getElement());

  const btn = task.getElement().querySelector('.card__btn--edit');
  const submitBtn = taskEdit.getElement().querySelector('.card__save');


  btn.addEventListener('click', () => {
    task.getElement().replaceWith(taskEdit.getElement());
    document.addEventListener(`keydown`, onEscKeyDown);
  });

  const chacngeTaskForm = () => taskEdit.getElement().replaceWith(task.getElement());

  const closeCard = (evt) => {
    evt.preventDefault();
    document.removeEventListener(`keydown`, onEscKeyDown);
    chacngeTaskForm();
  }

  submitBtn.addEventListener('click', (evt) => closeCard(evt));
  submitBtn.addEventListener('submit', (evt) => closeCard(evt));

  
  const onEscKeyDown = (evt) => {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      chacngeTaskForm();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };
}

tasks.slice(0, TASK_TO_RENDER).forEach((taskItem) => renderTask(taskItem));

const toaddTasks = () => {
  tasks.slice(tasks_count, tasks_count + STEP_TO_RENDER).forEach((taskItem) => renderTask(taskItem));
  tasks_count = tasks_count + STEP_TO_RENDER;

  if(tasks_count >= tasks.length) {
    button.classList.add(`visually-hidden`);
  }
};

const button = document.body.querySelector('.load-more');
button.addEventListener(`click`, toaddTasks)
