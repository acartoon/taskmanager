import Result from "../components/result";
import { render } from "../utils";
import TaskController from "./task-controller";

export default class SearchController {
  constructor() {
    this._tasksData = [];
    this._container = null;
    this._result = new Result;
  }

  init(tasksData, container) {
    this._tasksData = tasksData;
    this._container = container;
    render(this._container, this._result.getElement());
    this._tasksData.forEach((task) => {
     this._renderTask(task);
    });
  }

  _renderTask(taskData) {
    const task = new TaskController(this._result.getElement().querySelector(`.result__cards`), taskData);
    task.init();
    // this._subscriptions.push(task.setDefaultView.bind(task));
  }
}