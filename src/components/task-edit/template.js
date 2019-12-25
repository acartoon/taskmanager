const template = (color, repeatingDays, isArchive, isFavorite, description, deadlineDate) => {
  return `<article class="card card--edit card--${color} ${Object.keys(repeatingDays).some((day) => repeatingDays[day]) ? `card--repeat` : ``}">
    <form class="card__form" method="get">
    <div class="card__inner">
      <div class="card__control">
      <button type="button" class="card__btn card__btn--archive ${isArchive ? `` : `card__btn--disabled`}">archive</button>
      <button type="button" class="card__btn card__btn--favorites ${isFavorite ? `` : `card__btn--disabled`}">favorites</button>
      </div>
      <div class="card__color-bar">
        <svg class="card__color-bar-wave" width="100%" height="10">
          <use xlink:href="#wave"></use>
        </svg>
      </div>
      <div class="card__textarea-wrap">
        <label>
          <textarea
            class="card__text"
            placeholder="Start typing your text here..."
            name="text"
          >${description}</textarea>
        </label>
      </div>
  
      <div class="card__settings">
        <div class="card__details">
          <div class="card__dates">
            <button class="card__date-deadline-toggle" type="button">
              date: <span class="card__date-status">${deadlineDate ? `yes`: `no`}</span>
            </button>
            <button class="card__repeat-toggle" type="button">
              repeat:<span class="card__repeat-status">yes</span>
            </button>
            <fieldset class="card__repeat-days">            
            </fieldset>
          </div>
          <div class="card__hashtag">
            <div class="card__hashtag-list">
            </div>
          </div>
        </div>
  
        <div class="card__colors-inner">
          <h3 class="card__colors-title">Color</h3>
          <div class="card__colors-wrap">
            
          </div>
        </div>
      </div>
  
      <div class="card__status-btns">
        <button class="card__save" type="submit">save</button>
        <button class="card__delete" type="button">delete</button>
      </div>
    </div>
  </form>
  </article>`;
}

export default template;