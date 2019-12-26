import TaskBaseComponent from '../task-base-component';
import Hashtag from './hashtag';
import { render, unrender, POSTITION, removeElement } from '../../utils';
import NewHashtag from './new-hashtag';
import RepeatDays from './repeat-days';
import CardColor from './card-color';
import {COLORS} from '../../data';
import DeadlineDate from './deadline-date';
import template from './template';
import css from '../../../node_modules/flatpickr/dist/flatpickr.min.css';

export default class TaskEdit extends TaskBaseComponent {
  constructor(params, closeCard, onEscKeyDown) {
    super(params);
    this._closeCard = closeCard;
    this._onEscKeyDown = onEscKeyDown;
    this._newHashtag = new NewHashtag(this.onEnterKeyDown.bind(this));
    this._repeat = Object.keys(this._repeatingDays).some((day) => this._repeatingDays[day] === true) ? true : false;
    this._repeatDays = null;
    this._deadline = !this._repeat;
    this._deadlineDate = null;
    this._init();
  }

  _init() {
    this._dueDate = this._repeat ? false : this._dueDate;
    this._onBtnClick();
    this._onEscKeyDownMain();
    this._renderHashtags();
    this._addHashtags();
    this._renderRepeatingDays();
    this._renderDeadline();
    this._renderColorTag();
    this._dates();
    const btnArchive = this.getElement().querySelector(`.card__btn--archive`);
    const btnFavorites = this.getElement().querySelector(`.card__btn--favorites`);
    this._toggleStatusTask(btnArchive);
    this._toggleStatusTask(btnFavorites);
  }

  _dates() {
    const deadline = this.getElement().querySelector(`.card__date-deadline-toggle`);
    const repeat = this.getElement().querySelector(`.card__repeat-toggle`);

    const toggle = () => {
      this._renderDeadline();
      this._renderRepeatingDays();
    }

    deadline.addEventListener(`click`, () => {
      this._deadline = !this._deadline;
      this._repeat = false;
      toggle();
    });

    repeat.addEventListener(`click`, () => {
      this._repeat = !this._repeat;
      this._deadline = false;
      toggle();
    });
}
  _renderRepeatingDays() {
    const container = this.getElement().querySelector(`.card__repeat-days`);
    const status = this.getElement().querySelector(`.card__repeat-status`);//
    status.innerHTML = this._repeat ? `yes` : `no`; //
    if(this._repeat === true) {
      this._repeatDays = new RepeatDays(this._repeatingDays);
      render(container, this._repeatDays.getElement());
      this.getElement().classList.add(`card--repeat`);
    } else if((this._repeat === false) && this._repeatDays !== null){
      this.getElement().classList.remove(`card--repeat`);
      Object.keys(this._repeatingDays).forEach((day) => this._repeatingDays[day] = false);
      removeElement(this._repeatDays);
    }
  }

  _renderDeadline() {
    const container = this.getElement().querySelector(`.card__date-deadline-toggle`);
    const status = this.getElement().querySelector(`.card__date-status`); //
    status.innerHTML = this._deadline ? `yes` : `no`;//
    if(this._deadline === true) {
      this._deadlineDate = new DeadlineDate(this._dueDate);
      render(container, this._deadlineDate.getElement(), POSTITION.AFTER);
    } else if((this._deadline === false) && this._deadlineDate !== null) {
      this._dueDate = false;
      removeElement(this._deadlineDate);
    }
  }
  
  _onBtnClick() {
    const submitBtn = this.getElement().querySelector('.card__save');
    submitBtn.addEventListener('click', (evt) => this._closeCard(evt));
    submitBtn.addEventListener('submit', (evt) => this._closeCard(evt));
  }
  
  _onEscKeyDownMain() {
    const descpriptionTask = this.getElement().querySelector('.card__text');
    descpriptionTask.addEventListener('focus', () => document.removeEventListener(`keydown`, this._onEscKeyDown));
    descpriptionTask.addEventListener('blur', () => document.addEventListener(`keydown`, this._onEscKeyDown));
  }

  _renderHashtags() {
    const container = this.getElement().querySelector(`.card__hashtag-list`);
    this._tags.forEach((tag) => {
      const hashtag = new Hashtag(tag);
      render(container, hashtag.getElement());
    })
  }

  _toggleStatusTask(btn) {
    btn.addEventListener(`click`, () => {
      if(btn.classList.contains(`card__btn--disabled`)) {
        btn.classList.remove(`card__btn--disabled`);
      } else {
        btn.classList.add(`card__btn--disabled`);
      }
    }) 
  }

  onEnterKeyDown(value) {
    const container = this.getElement().querySelector(`.card__hashtag-list`);
    if(value.length > 2 && value.length < 16) {
      const hashtag = new Hashtag(value);
      render(container, hashtag.getElement());
    }
  }

  _addHashtags() {
    const container = this.getElement().querySelector(`.card__hashtag`);
    render(container, this._newHashtag.getElement())
  }

  _changeColor(stickerColor) {
    COLORS.forEach((color) => {
      this.getElement().classList.remove(`card--${color}`);
    });
    this.getElement().classList.add(`card--${stickerColor}`);
  }

  _renderColorTag() {
    const container = this.getElement().querySelector(`.card__colors-wrap`);
    Array.from(COLORS).forEach((color) => {
      const status = (color === this._color) ? true : false;
      const cardColor = new CardColor(color, status, this._changeColor.bind(this));
      render(container, cardColor.getElement())
    });
  }

  getTemplate() {
    return template(this._color, this._repeatingDays, this._isArchive, this._isFavorite, this._description, this._deadlineDate);
  }
}