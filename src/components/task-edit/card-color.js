import AbstractComponent from '../abstract-component';

export default class CardColor extends AbstractComponent {
  constructor(color, checked, action) {
    super();
    this._color = color;
    this._checked = checked;
    this._action = action;
    this._onClick();
  }

  _onClick() {
    this.getElement().querySelector(`.card__color`).addEventListener(`click`, () => {
      this._action(this._color);
    });
  }

  getTemplate() {
    return `<div><input
    type="radio"
    id="color-${this._color}-4"
    class="card__color-input card__color-input--${this._color} visually-hidden"
    name="color"
    value="${this._color}" ${this._checked ? `checked`: ``} required
  />
  <label
    for="color-${this._color}-4"
    class="card__color card__color--${this._color}"
    >${this._color}</label
  ></div>`;
  }
}
