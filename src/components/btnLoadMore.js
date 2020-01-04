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

  getTemplate() {
    return `<button class="load-more" type="button">load more</button>`
  }
}
