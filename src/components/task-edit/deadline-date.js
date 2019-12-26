import AbstractComponent from "../abstract-component";
import flatpickr from "flatpickr";
import moment from "moment";

export default class DeadlineDate extends AbstractComponent{
constructor(dueDate) {
  super();
  this._dueDate = dueDate;
  this._init();
}

_init() {
  const calendar = this.getElement().querySelector(`.card__date`);
  flatpickr(calendar, {
    defaultDate: this._dueDate,
    altInput: true,
    allowInput: true,
    locale: {
      firstDayOfWeek: 1
    },
    dateFormat: `d F Y`,
    altFormat: `d F`
  });
}

getTemplate() {
  return `<fieldset class="card__date-deadline">
    <label class="card__input-deadline-wrap">
      <input
        class="card__date"
        type="text"
        placeholder=""
        name="date"
        value=""
        />
        </label>
        </fieldset>`;
      }
    }
