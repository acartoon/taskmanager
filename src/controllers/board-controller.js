import Task from "../components/task";
import TaskEdit from "../components/task-edit";
import { render, createNode, SORT } from "../utils";
import Sort from "../components/sort";
import BtnLoadMore from "../components/btnLoadMore";

export default class BoardController {
  constructor(container, tasksData) {
    this._container = container;
    this._tasksContainer = this._container.querySelector(`.board__tasks`);
    this._tasksData = tasksData;
    this._task = null;
    this._sort = new Sort(this._getSort.bind(this));
    
    this._TASK_TO_RENDER = 8;
    this._STEP_TO_RENDER = 4;
    this._tasks_count = this._TASK_TO_RENDER;
    this._btnLoadMore = null;

  }
  init() {
    render(this._container, this._sort.getElement());
    this._tasksContainer = createNode('div', `board__tasks`);
    render(this._container, this._tasksContainer);
    this._tasksData.slice(0, this._TASK_TO_RENDER).forEach((taskData) => this._renderTask(taskData));
    this._initBtnLoadMore();
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
    render(this._tasksContainer, task.getElement());
  }

  _getSort(sortType) {
    const SORT = {
      'date-up': this._tasksData.slice(0, this._tasks_count).sort((a, b) => a.dueDate - b.dueDate),
      'date-down': this._tasksData.slice(0, this._tasks_count).sort((a, b) => b.dueDate - a.dueDate),
      'default': this._tasksData.slice(0, this._tasks_count),
    }
    this._tasksContainer.innerHTML = ``;
    
    SORT[sortType].forEach((task) => this._renderTask(task));
  }

  _initBtnLoadMore() {
    if(this._tasksData.length > this._TASK_TO_RENDER) {
      this._btnLoadMore = new BtnLoadMore();
      render(this._container, this._btnLoadMore.getElement());
    }

    const toaddTasks = () => {
    this._tasksData.slice( this._tasks_count,  this._tasks_count + this._STEP_TO_RENDER).forEach((taskItem) => this._renderTask(taskItem));
    this._tasks_count = this._tasks_count + this._STEP_TO_RENDER;

    if(this._tasks_count >=  this._tasksData.length) {
      this._btnLoadMore.getElement().classList.add(`visually-hidden`);
    }
  };

  this._btnLoadMore.getElement().addEventListener(`click`, toaddTasks);
  }
}
