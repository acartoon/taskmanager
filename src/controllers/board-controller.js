import TaskController from "./task-controller";
import { getRandomString, ACTION, TASKMODE } from "../utils";

export default class BoardController {
  constructor(container, onDataChange) {
    this._container = container;
    this._onDataChangeMain = onDataChange;
    this._tasksData = [];
    this._subscriptions = [];
    this.onDataChange = this.onDataChange.bind(this);
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
    const task = new TaskController(this._container, taskData, this.onDataChange, this.onChangeView.bind(this));
    task.init();
    this._subscriptions.push(task.setDefaultView.bind(task));
  }

  onDataChange(newTaskData, action) {
    const index = this._tasksData.findIndex((task) => task.id === newTaskData.id);
    
    if(action === ACTION.REMOVE) {
      this._tasksData = [...this._tasksData.slice(0, index), this._tasksData.slice(index + 1, this._tasksData.length)]
      
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
    this._onDataChangeMain(newTaskData, action);
  }

  createTask() {
    const defaultTask = {
      id: getRandomString(3),
      description: ``,
      dueDate: new Date(),
      repeatingDays: {
        'Mo': false,
        'Tu': false,
        'We': false,
        'Th': false,
        'Fr': false,
        'Sa': false,
        'Su': false,
      },
      tags: new Set(),
      color: `black`,
      isFavorite: false,
      isArchive: false,
    };

    const taskController = new TaskController(this._container, defaultTask, this.onDataChange, this.onChangeView.bind(this), TASKMODE.CREARE);
    taskController.init();
  }

  onChangeView() {
    this._subscriptions.forEach((subscription) => subscription());
  }
}
