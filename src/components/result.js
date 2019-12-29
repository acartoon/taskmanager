import PageBaseComponent from "./page-base-component";

export default class Result extends PageBaseComponent {
  constructor(tasksData, onClick) {
    super();
    this._tasksData = tasksData;
    this._onClick = onClick;
    this._init();
  }

  _init() {
    const resultBtn = this.getElement().querySelector(`.result__back`);
    resultBtn.addEventListener(`click`, () => {
      this.hide();
      this._onClick();
    });
  }

  getTemplate() {
    return `<section class="result container">
    <button class="result__back">back</button>

    <section class="result__group">
      <h2 class="result__title">
        #work<span class="result__count">17</span>
      </h2>
      <div class="result__cards">
      </div>
    </section>
  </section>`
  }
}