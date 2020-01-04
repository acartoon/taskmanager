import Result from "../components/result";
import { render, SEARCHTAGS, POSTITION, ACTION } from "../utils";
import BoardController from "./board-controller";
import moment from "moment";
import SearchEmpty from "../components/search-empty";
import PageBaseComponent from "../components/page-base-component";

export default class SearchController {
  constructor(container, onClick, onDataChangeMain) {
    this._onDataChangeMain = onDataChangeMain;
    this.onDataChange = this.onDataChange.bind(this);
    this._value = null;
    this._resultData = [];
    this._tasksData = [];
    this._container = container;
    this.onClick = onClick;
    this._result = new Result(this.onClick);
    this._containerBoard = this._result.getElement().querySelector(`.result__cards`);
    this._boardController = new BoardController(this._containerBoard, this.onDataChange);
    this._searchEmpty = new SearchEmpty;
  }

  init() {
    render(this._container, this._result.getElement());
    this.hide();
  }

  hide() {
    this._result.getElement().classList.add(`visually-hidden`)
  }

  _getResultData(func, value) {
    return this._tasksData.filter((task) => {
      return func(task, value);
    });
  }

  show(value, tasksData) {
    this._value = value;
    this._tasksData = tasksData;
    console.log(this._tasksData);
    let func = null;
    let data = null;

    const description = (task, value) => task.description.includes(value);
    const tags = (task, value) => Array.from(task.tags).some((tag) => tag === value);
    const dateF = (task, value) => moment(task.dueDate).isSame(value, 'day');

    
    this._result.getElement().classList.remove(`visually-hidden`);
    if(this._value[0] === SEARCHTAGS.DATE) {
      data = moment(this._value.slice(1, this._value.length), 'DD-MM-YYYY');
      func = dateF;
    } else if(this._value[0] === `#`) {
      data = this._value.slice(1, this._value.length);
      func = tags;
    } else {
      data = this._value;
      func = description;
    }

    this._resultData = this._getResultData(func, data);

    this._result.renderTitle(data, this._resultData.length);
    if(this._resultData.length === 0) {
      render(this._result.getElement().querySelector(`.result__title`), this._searchEmpty.getElement(), POSTITION.AFTER);
    }
    this._boardController.init(this._resultData);
  }

  onDataChange(newTaskData, action) {
    console.log(action)
    if(action === ACTION.REMOVE) {
      const index = this._tasksData.findIndex((task) => task.id === newTaskData.id);
      this._tasksData = [].concat(this._tasksData.slice(0, index), this._tasksData.slice(index + 1, this._tasksData.length));
      this._boardController.init(this._tasksData.slice(0, this._tasks_count));
      this._initBtnLoadMore();  

    } else if (action === ACTION.CHANGE) {
      this._tasksData = this._tasksData.map((taskData) => {
        if(taskData.id === newTaskData.id) {
          return newTaskData;
        }
        return taskData;
      });
    } else if(action === ACTION.CREATE) {
      this._tasksData.unshift(newTaskData);
    }
    console.log(this._tasksData);
    this._onDataChangeMain(this._tasksData);
    this.onClick();
  }
}
