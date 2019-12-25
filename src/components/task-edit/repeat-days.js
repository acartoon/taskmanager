
import AbstractComponent from '../abstract-component';

export default class RepeatDays extends AbstractComponent {
  constructor(repeatingDays) {
    super();
    this._repeatingDays = repeatingDays;
  }
  getTemplate() {
    return `<div class="card__repeat-days-inner">
    ${Object.keys(this._repeatingDays).map((day) =>
    `<input
      class="visually-hidden card__repeat-day-input"
      type="checkbox"
      id="repeat-${day}-4"
      name="repeat"
      value="${day}" ${this._repeatingDays[day] ? `checked` : `` }
      />
    <label class="card__repeat-day" for="repeat-${day}-4">${day}</label>`).join(` `)}
        </fieldset>
      </div>`;
  }
}
