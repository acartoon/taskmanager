import Board from "../components/board";
import BoardTasks from "../components/board-tasks";
import { render, unrender, ACTION } from "../utils";
import Sort from "../components/sort";
import BoardController from "./board-controller";
import BtnLoadMore from "../components/btnLoadMore";
import PageBaseComponent from "../components/page-base-component";

export default class MainPageController{
// export default class MainPageController extends PageBaseComponent{
  constructor(container, tasksData, onDataChangeMain) {
    this._tasksData = tasksData;
    this._container = container;
    this._boardContainer = new Board;
    this._boardTasks = new BoardTasks;
    this._TASK_TO_RENDER = 8;
    this._STEP_TO_RENDER = 4;
    this._tasks_count = this._TASK_TO_RENDER;
    this._btnLoadMore = null;
    this.onDataChange = this.onDataChange.bind(this);
    this._boardController = new BoardController(this._boardTasks.getElement(), this.onDataChange);
    this._sort = new Sort(this._getSort.bind(this));
    this._onDataChangeMain = onDataChangeMain;
  }

  init() {
    render(this._container, this._boardContainer.getElement());
    render(this._boardContainer.getElement(), this._sort.getElement());
    render(this._boardContainer.getElement(), this._boardTasks.getElement());
    this.show(this._tasksData);
    this.toAddNewTask();
  }

  hide() {
    this._boardContainer.getElement().classList.add(`visually-hidden`)
  }

  show(tasksData) {
    this._tasksData = tasksData;
    this._boardController.init(this._tasksData.slice(0, this._TASK_TO_RENDER));
    if(this._tasksData.length > this._TASK_TO_RENDER && !this._btnLoadMore) {
      this._renderBtnLoadMore();
    }
    this._boardContainer.getElement().classList.remove(`visually-hidden`);
  }

  _getSort(sortType) {
    const SORT = {
      'date-up': this._tasksData.slice(0, this._tasks_count).sort((a, b) => a.dueDate - b.dueDate),
      'date-down': this._tasksData.slice(0, this._tasks_count).sort((a, b) => b.dueDate - a.dueDate),
      'default': this._tasksData.slice(0, this._tasks_count),
    }
    this._boardController.init(SORT[sortType]);
  }

  _clickBtnLoadMore() {
    this._tasks_count = this._tasks_count + this._STEP_TO_RENDER;
    this._boardController.init(this._tasksData.slice(0, this._tasks_count));
    
    if(this._tasks_count >=  this._tasksData.length) {
      this._btnLoadMore.getElement().classList.add(`visually-hidden`);
    }
  }

  _renderBtnLoadMore() {
    this._btnLoadMore = new BtnLoadMore(this._clickBtnLoadMore.bind(this));
    render(this._boardContainer.getElement(), this._btnLoadMore.getElement());
  }

  _unrenderBtnLoadMore() {
    unrender(this._btnLoadMore.getElement());
    this._btnLoadMore.removeElement();
    this._btnLoadMore = null;
  }

  onDataChange(newTaskData, action) {
    const index = this._tasksData.findIndex((task) => task.id === newTaskData.id);
    if(action === ACTION.REMOVE) {
      this._tasksData = [].concat(this._tasksData.slice(0, index), this._tasksData.slice(index + 1, this._tasksData.length));
      this._boardController.init(this._tasksData.slice(0, this._tasks_count));
      if(this._tasksData.length <= this._tasks_count) {
        this._unrenderBtnLoadMore();
      }
    } else if(action === ACTION.CHANGE) {
      if(index === -1) {
        this._tasksData.unshift(newTaskData);
      } else {
        this._tasksData = this._tasksData.map((taskData) => {
          if(taskData.id === newTaskData.id) {
            return newTaskData;
          }
          return taskData;
        });
      }
    }
    this._onDataChangeMain(this._tasksData);
  }

  toAddNewTask() {
    const test = document.querySelector(`.control__label--new-task`);
    test.addEventListener(`click`, () => {
      this._boardController.createTask();
    });
  }
}
