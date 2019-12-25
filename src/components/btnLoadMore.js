import {createElement} from '../utils';
import AbstractComponent from './abstract-component';

export default class BtnLoadMore extends AbstractComponent{
  constructor(onClick) {
    super();
    this._onClickMain = onClick;
    this._onClick()
  }

  _onClick() {
    this.getElement().addEventListener(`click`, () => {
      this._onClickMain();
    });
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }
    return this._element;
  }

  removeElement() {
    if (!this._element) {
      this._element = null;
    }
    return this._element;
  }

  getTemplate() {
    return `<button class="load-more" type="button">load more</button>`
  }
}
