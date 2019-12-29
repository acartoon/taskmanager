import Board from "../components/board";
import BoardTasks from "../components/board-tasks";
import { render } from "../utils";
import Sort from "../components/sort";
import BoardController from "./board-controller";
import BtnLoadMore from "../components/btnLoadMore";

export default class MainPageController {
  constructor(container, tasksData) {
    this._tasksData = tasksData;
    this._container = container;
    this._boardContainer = new Board;
    this._boardTasks = new BoardTasks;
    this._TASK_TO_RENDER = 8;
    this._STEP_TO_RENDER = 4;
    this._tasks_count = this._TASK_TO_RENDER;
    this._btnLoadMore = null;
    this._boardController = null;
    this._sort = new Sort(this._getSort.bind(this));
  }

  init() {
    render(this._container, this._boardContainer.getElement());
    render(this._boardContainer.getElement(), this._sort.getElement());
    render(this._boardContainer.getElement(), this._boardTasks.getElement());
    this._boardController = new BoardController(this._boardTasks.getElement());
    this._boardController.init( this._tasksData.slice(0, this._TASK_TO_RENDER));
    this._initBtnLoadMore();
  }

  hide() {
    this._boardContainer.getElement().classList.add(`visually-hidden`)
  }

  show() {
    this._boardContainer.getElement().classList.remove(`visually-hidden`)
  }

  _getSort(sortType) {
    const SORT = {
      'date-up': this._tasksData.slice(0, this._tasks_count).sort((a, b) => a.dueDate - b.dueDate),
      'date-down': this._tasksData.slice(0, this._tasks_count).sort((a, b) => b.dueDate - a.dueDate),
      'default': this._tasksData.slice(0, this._tasks_count),
    }
    console.log(SORT[sortType])
    this._boardController.init(SORT[sortType]);
  }

  _toAddTasks() {
    this._tasks_count = this._tasks_count + this._STEP_TO_RENDER;
    this._boardController.init(this._tasksData.slice(0, this._tasks_count));

    if(this._tasks_count >=  this._tasksData.length) {
      this._btnLoadMore.getElement().classList.add(`visually-hidden`);
    }
  }

  _initBtnLoadMore() {
    if(this._tasksData.length > this._TASK_TO_RENDER) {
      this._btnLoadMore = new BtnLoadMore(this._toAddTasks.bind(this));
      render(this._boardContainer.getElement(), this._btnLoadMore.getElement());
    }
  }
}