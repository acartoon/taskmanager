
import AbstractComponent from './abstract-component';

export default class Menu extends AbstractComponent {
  constructor(onClick) {
    super();
    this._init();
    this._onClick = onClick;
  }

  _init() {
    this.getElement().addEventListener(`click`, (evt) => {
      if(evt.target.tagName === `LABEL`) {
        const value = evt.target.getAttribute(`for`);
        this._onClick(value);
      }
    });
  }

  getTemplate() {
    return `<section class="control__btn-wrap">
      <input type="radio" name="control" id="control__new-task" class="control__input visually-hidden">
      <label for="control__new-task" class="control__label control__label--new-task">+ ADD NEW TASK</label>
      <input type="radio" name="control" id="control__task" class="control__input visually-hidden" checked="">
      <label for="control__task" class="control__label">TASKS</label>
      <input type="radio" name="control" id="control__statistic" class="control__input visually-hidden">
      <label for="control__statistic" class="control__label">STATISTICS</label>
    </section>`;
  }
}
