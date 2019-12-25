
import AbstractComponent from '../abstract-component';
import { unrender } from '../../utils';

export default class Hashtag extends AbstractComponent {
  constructor(tag) {
    super();
    this._tag = tag;
    this._removeTag();
  }

  _removeTag() {
    const deleteTag = this.getElement().querySelector(`.card__hashtag-delete`);
    deleteTag.addEventListener(`click`, () => {
      unrender(this.getElement());
      this.removeElement();
    });
  }

  getTemplate() {
    return `<span class="card__hashtag-inner">
    <input
      type="hidden"
      name="hashtag"
      value="${this._tag}"
      class="card__hashtag-hidden-input"
    />
    <p class="card__hashtag-name">
    #${this._tag}
    </p>
    <button type="button" class="card__hashtag-delete">
      delete
    </button>
  </span>`;
  }
}
