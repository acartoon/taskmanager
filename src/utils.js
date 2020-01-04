export const counter = (func, tasks) => {
  return tasks.reduce((total, x) => (func(x) ? total + 1 : total), 0);
}

export const SEARCHTAGS = {
  DATE: `D`,
  HASHTAGS: `#`
}

export const ACTION = {
  CREATE: `create`,
  CHANGE: `change`,
  REMOVE: `remove`
}

export const TASKMODE = {
  DEFAULT: `default`,
  CREARE: `create`,
}

export const SORTING = {
  UP: 'date-up',
  DOWN: 'date-down',
  DEFOULT: 'default',
}


export const POSTITION = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`,
  AFTER: `after`,
};
export const render = (container, element, place = POSTITION.BEFOREEND) => {
  switch (place) {
    case POSTITION.AFTERBEGIN:
      container.prepend(element);
      break;
    case POSTITION.BEFOREEND:
      container.append(element);
      break;
    case POSTITION.AFTER:
      container.after(element);
      break;
  }
};

export const unrender = (element) => {
  if (element) {
    element.remove();
  }
};

export function toAddElement(container, element) {
  container.append(element)
}

export const createNode = (node, ...nameClass) => {
  const element = document.createElement(node);
  element.classList.add(...nameClass);
  return element;
}

export const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;
  return newElement.firstChild;
};

export const getRandomInteger = (max, min = 1) => Math.round(min - 0.5 + Math.random() * (max - min + 1));

export const getRandomElements = (arr, count, func) => new Array(count).fill(``).map(() => arr[func(0, arr.length - 1)]);

export function getRandomDate() {
  const randomYear = getRandomInteger(1930, 1990);
  const randomMonth = getRandomInteger(1, 12);
  const randomDate = getRandomInteger(1, 30);
  return new Date(randomYear, randomMonth, randomDate);
}


export const createRepeatDays = (array, repeat = true) => {
  return array.reduce((result, current) => {
    result[current] = repeat ? Boolean(Math.round(Math.random())) : false;
    return result;
  }, {});
}

export const removeElement = (element) => {
  unrender(element.getElement());
  element.removeElement();
}

export function getRandomString(length) {
  const characters = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789`;
  let result = ``;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}