import {createElement} from '../utils';
import AbstractComponent from './abstract-component';

export default class Search extends AbstractComponent{
  constructor(action) {
    super();
    this._action = action;
    this._input = this.getElement().querySelector(`.search__input`);
    this._onClick();
  }

  _onClick() {
    this._input.addEventListener(`keydown`, (evt) => {
      if (evt.code === `Enter`) {
        const value = this._input.value;
        this._action(value);
      }
    })
  }

  clear() {
    this._input.value = ``;
  }
  getTemplate() {
    return `<section class="main__search search container">
    <input type="text" id="search__input" class="search__input" placeholder="START TYPING — SEARCH BY WORD, #HASHTAG OR DATE">
    <label class="visually-hidden" for="search__input">Search</label>
  </section>`;
  }
}
