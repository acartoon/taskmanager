import Task from "../components/task";
import TaskEdit from "../components/task-edit";
import { render } from "../utils";

export default class BoardController {
  constructor(container, tasksData) {
    this._container = container;
    this._tasksData = tasksData;
    this._task = null;
    
    this._TASK_TO_RENDER = 8;
    this._STEP_TO_RENDER = 4;
    this._tasks_count = this._TASK_TO_RENDER;
    this._toAddTasks();
  }
  init() {
    this._tasksData.slice(0, this._TASK_TO_RENDER).forEach((taskData) => this._renderTask(taskData));
  }
  
  _renderTask(taskMock) {
    const onClick = () => {
      task.getElement().replaceWith(taskEdit.getElement());
      document.addEventListener(`keydown`, onEscKeyDown);
    }

    const closeCard = (evt) => {
      evt.preventDefault();
      document.removeEventListener(`keydown`, onEscKeyDown);
      chacngeTaskForm();
    }

    const onEscKeyDown = (evt) => {
      if (evt.key === `Escape` || evt.key === `Esc`) {
        chacngeTaskForm();
        document.removeEventListener(`keydown`, onEscKeyDown);
      }
    }

    const chacngeTaskForm = () => {
      taskEdit.getElement().replaceWith(task.getElement());
    }

    const task = new Task(taskMock, onClick, onEscKeyDown);
    const taskEdit = new TaskEdit(taskMock, closeCard, onEscKeyDown);
    render(this._container, task.getElement());
  }

  _toAddTasks() {
    const button = document.body.querySelector('.load-more');
    
    if(this._tasksData.length < this._TASK_TO_RENDER) {
      button.classList.add(`visually-hidden`);
    }

    const toaddTasks = () => {
    this._tasksData.slice( this._tasks_count,  this._tasks_count + this._STEP_TO_RENDER).forEach((taskItem) => this._renderTask(taskItem));
    this._tasks_count = this._tasks_count + this._STEP_TO_RENDER;

    if(this._tasks_count >=  this._tasksData.length) {
      button.classList.add(`visually-hidden`);
    }
  };

    button.addEventListener(`click`, toaddTasks);
  }
}
