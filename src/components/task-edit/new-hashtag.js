
import AbstractComponent from '../abstract-component';
import { unrender } from '../../utils';

export default class NewHashtag extends AbstractComponent {
  constructor(addHashtags) {
    super();
    this._addHashtags = addHashtags;
    this._onEnterKeyDown();
  }

  _onEnterKeyDown() {
    this.getElement().addEventListener(`keydown`, (evt) => {
      if (evt.code === `Space`) {
        evt.preventDefault();
        this._addHashtags(evt.target.value);
        evt.target.value = ``;
      }
    });
  }

  getTemplate() {
    return `<label>
    <input
      type="text"
      class="card__hashtag-input"
      name="hashtag-input"
      placeholder="Type new hashtag here"
    />
  </label>`;
  }
}
