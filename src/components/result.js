import PageBaseComponent from "./page-base-component";
import { render } from "../utils";

export default class Result extends PageBaseComponent {
  constructor(onClick) {
    super();
    this._onClick = onClick;
    this._count = null;
    this._init();
    this._resultTitle = null;
  }

  _init() {
    this._onBtnClick();
  }

  _onBtnClick() {
    const resultBtn = this.getElement().querySelector(`.result__back`);
    resultBtn.addEventListener(`click`, () => {
      this._onClick();
    });
  }

  renderTitle(title, count) {
    this._count = count;
    this._title = title;
    const container = this.getElement().querySelector(`.result__title`);
    container.innerHTML = ``;
    container.insertAdjacentHTML(`afterbegin`, `${this._title}<span class="result__count">${this._count === 0? ``: this._count}</span>`)
  }

  getTemplate() {
    return `<section class="result container">
    <button class="result__back">back</button>
      <section class="result__group">
        <h2 class="result__title">
          <span class="result__count"></span>
        </h2>
        <div class="result__cards">
        </div>
    </section>
  </section>`
  }
}