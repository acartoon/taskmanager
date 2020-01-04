import Task from "../components/task";
import TaskEdit from "../components/task-edit/task-edit";
import { render, POSTITION, ACTION, TASKMODE} from "../utils";

export default class TaskController {
  constructor(container, tasksData, onDataChange, onChangeView, MODE) {
    this._container = container;
    this._onDataChangeMain = onDataChange;
    this._onChangeView = onChangeView
    this._taskData = tasksData;
    this.onEscKeyDown = this.onEscKeyDown.bind(this);
    this._MODE = MODE;
    
    this._task = null
    this._taskEdit = new TaskEdit(this._taskData, this.closeCard.bind(this), this.removeTask.bind(this), this.onEscKeyDown);
  }
  
  init() {
    this._renderTask(this._taskData);
    if(this._MODE === TASKMODE.CREARE) {
      render(this._container, this._taskEdit.getElement(), POSTITION.AFTERBEGIN);
    } else {
      render(this._container, this._task.getElement());
    }
  }

  _renderTask(taskData) {
    this._task = new Task(taskData, this.onClick.bind(this), this.onEscKeyDown);
  }

  onDataChange() {
    const formData = new FormData(this._taskEdit.getElement().querySelector(`.card__form`));
    const entry = {
      id: this._taskData.id,
      description: formData.get(`text`),
      dueDate: new Date(formData.get(`date`)),
      dueDate: formData.get(`date`),
      repeatingDays: formData.getAll(`repeat`).reduce((acc, it) => {
        acc[it] = true;
        return acc;
      }, {
        'Mo': false,
        'Tu': false,
        'We': false,
        'Th': false,
        'Fr': false,
        'Sa': false,
        'Su': false,
      }),
      tags: new Set(formData.getAll(`hashtag`)),
      color: formData.get(`color`),
      isFavorite: !this._taskEdit.getElement().querySelector(`.card__btn--favorites`).classList.contains(`card__btn--disabled`),
      isArchive: !this._taskEdit.getElement().querySelector(`.card__btn--archive`).classList.contains(`card__btn--disabled`)
    }

    if(!entry.color) {
      console.log(`Ошибка, нет цвета!`)
    }
    this._taskData = entry;
    this._onDataChangeMain(this._taskData, ACTION.CHANGE);
  }

  onClick() {
    this._onChangeView();
    this._task.getElement().replaceWith(this._taskEdit.getElement());
    document.addEventListener(`keydown`, this.onEscKeyDown);
  }
  
  closeCard(evt) {
    evt.preventDefault();
    document.removeEventListener(`keydown`, this.onEscKeyDown);
    this.onDataChange();
    this.chacngeTaskForm();
  }

  removeTask() {
    this._onDataChangeMain(this._taskData, ACTION.REMOVE);
  }

  onEscKeyDown(evt) {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      this.chacngeTaskForm();
      document.removeEventListener(`keydown`, this.onEscKeyDown);
    }
  }
  
  chacngeTaskForm() {
    this._renderTask(this._taskData);
    this._taskEdit.getElement().replaceWith(this._task.getElement());
  }

  setDefaultView() {
    if (this._container.contains(this._taskEdit.getElement())) {
        this._container.replaceChild(this._task.getElement(), this._taskEdit.getElement());
    }
  }
}
