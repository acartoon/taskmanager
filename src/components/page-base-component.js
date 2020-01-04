import AbstractComponent from "./abstract-component";

export default class PageBaseComponent extends AbstractComponent{
  constructor(container, tasksData, onDataChangeMain) {
    super();
    this._tasksData = tasksData;
    this._container = container;
    this._onDataChangeMain = onDataChangeMain;
    this.onDataChange = this.onDataChange.bind(this)
  }

  onDataChange(newTaskData) {
    // console.log(this._onDataChangeMain)
    // this._tasksData = tasksData;
    // this._onDataChangeMain(this._tasksData)
    this._tasksData = this._tasksData.map((taskData) => {
      if(taskData.id === newTaskData.id) {
        return newTaskData;
      }
      return taskData;
    });
    this._onDataChangeMain(this._tasksData);
  }
}