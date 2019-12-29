import TaskController from "./task-controller";

export default class BoardController {
  constructor(container) {
    this._container = container;
    this._tasksData = [];
    this._subscriptions = [];
  }
  
  _clean() {
    this._container.innerHTML = ``;
  }

  init(tasksData) {
    this._clean();
    this._tasksData = tasksData;
    this._tasksData.forEach((taskData) => this._renderTask(taskData));
  }

  _renderTask(taskData) {
    const task = new TaskController(this._container, taskData, this.onDataChange.bind(this), this.onChangeView.bind(this));
    task.init();
    this._subscriptions.push(task.setDefaultView.bind(task));
  }

  onDataChange(newTaskData) {
    this._tasksData = this._tasksData.map((taskData) => {
      if(taskData.id === newTaskData.id) {
        return newTaskData;
      }
      return taskData;
    });
  }

  onChangeView() {
    this._subscriptions.forEach((subscription) => subscription());
  }
}
