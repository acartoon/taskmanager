import { render } from "../utils";
import Stats from "../components/stats";

export default class StatsController {
  constructor(container, onDataChange) {
    this._container = container;
    this._tasksData = null;
    this._stats = new Stats;
  }

  init() {
    render(this._container, this._stats.getElement());
    this.hide();
  }
  
  hide() {
    this._stats.getElement().classList.add(`visually-hidden`)
  }

  show(tasksData) {
    this._stats.getElement().innerHTML = ``;
    this._stats.getElement().classList.remove(`visually-hidden`);
    this.init(tasksData);
  }
}