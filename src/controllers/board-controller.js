
import { render, createNode, SORT } from "../utils";
import Sort from "../components/sort";
import BtnLoadMore from "../components/btnLoadMore";
import TaskController from "./task-controller";

export default class BoardController {
  constructor(container, tasksData) {
    this._container = container;
    this._tasksContainer = this._container.querySelector(`.board__tasks`);
    this._tasksData = tasksData;
    this._sort = new Sort(this._getSort.bind(this));
    
    this._TASK_TO_RENDER = 8;
    this._STEP_TO_RENDER = 4;
    this._tasks_count = this._TASK_TO_RENDER;
    this._btnLoadMore = null;
    this._subscriptions = [];
  }
  
  init() {
    render(this._container, this._sort.getElement());
    this._tasksContainer = createNode('div', `board__tasks`);
    render(this._container, this._tasksContainer);
    this._tasksData.slice(0, this._TASK_TO_RENDER).forEach((taskData) => this._renderTask(taskData));
    this._initBtnLoadMore();
  }

  _renderTask(taskData) {
    const task = new TaskController(this._tasksContainer, taskData, this.onDataChange.bind(this), this.onChangeView.bind(this));
    task.init();
    this._subscriptions.push(task.setDefaultView.bind(task));
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

  _toAddTasks() {
    this._tasksData.slice( this._tasks_count,  this._tasks_count + this._STEP_TO_RENDER).forEach((taskData) => this._renderTask(taskData));
    this._tasks_count = this._tasks_count + this._STEP_TO_RENDER;

    if(this._tasks_count >=  this._tasksData.length) {
      this._btnLoadMore.getElement().classList.add(`visually-hidden`);
    }
  }

  _initBtnLoadMore() {
    if(this._tasksData.length > this._TASK_TO_RENDER) {
      this._btnLoadMore = new BtnLoadMore(this._toAddTasks.bind(this));
      render(this._container, this._btnLoadMore.getElement());
    }
  }

  onDataChange(newTaskData) {
    this._tasksData = this._tasksData.map((taskData) => {
      if(taskData.id === newTaskData.id) {
        return newTaskData;
      }
      return taskData;
    });
    // console.log(this._tasksData)
  }

  onChangeView() {
    this._subscriptions.forEach((subscription) => subscription());
  }
}
