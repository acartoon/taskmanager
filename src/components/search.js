import {createElement} from '../utils';
import AbstractComponent from './abstract-component';

export default class Search extends AbstractComponent{
  constructor(action) {
    super();
    this._action = action
    this._onClick();
  }

  _onClick() {
    const input = this.getElement().querySelector(`.search__input`);
    input.addEventListener(`keydown`, (evt) => {
      if (evt.code === `Enter`) {
        const value = input.value;
        this._action();
        console.log(value)
      }
      
    })
    this._action
  }
  getTemplate() {
    return `<section class="main__search search container">
    <input type="text" id="search__input" class="search__input" placeholder="START TYPING — SEARCH BY WORD, #HASHTAG OR DATE">
    <label class="visually-hidden" for="search__input">Search</label>
  </section>`;
  }
}
