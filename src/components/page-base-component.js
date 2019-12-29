import AbstractComponent from "./abstract-component";

export default class PageBaseComponent extends AbstractComponent{
  constructor(tasksData, container) {
    super();
    this._tasksData = tasksData;
    this._container = container;
  }

  
  hide() {
    this.getElement().classList.add(`hidden`);
  }

  show() {
    this.getElement().classList.remove(`hidden`);
  }

  update() {

  }
}