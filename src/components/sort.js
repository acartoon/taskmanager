import AbstractComponent from './abstract-component';

export default class Sort extends AbstractComponent{
  constructor(getSort) {
    super();
    this._getSort = getSort;
    this._onClick();
  }

  _onClick() {
    this.getElement().addEventListener(`click`, (evt) => {
      if(evt.target.dataset.sortType !== undefined) {
        this._getSort(evt.target.dataset.sortType);
      }
    });
  }

  getTemplate() {
      return `<div class="board__filter-list">
      <a href="#" data-sort-type="default" class="board__filter">SORT BY DEFAULT</a>
      <a href="#" data-sort-type="date-up" class="board__filter">SORT BY DATE up</a>
      <a href="#" data-sort-type="date-down" class="board__filter">SORT BY DATE down</a>
    </div>`
  }
}