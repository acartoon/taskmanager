

// export function render(container, template, type = `beforeend`) {
//   container.insertAdjacentHTML(type, template);
// }
export const Position = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`
};
export const render = (container, element, place = Position.BEFOREEND) => {
  switch (place) {
    case Position.AFTERBEGIN:
      container.prepend(element);
      break;
    case Position.BEFOREEND:
      container.append(element);
      break;
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


export const createRepeatDays = (array) => {
  return array.reduce((result, current) => {
    result[current] = Boolean(Math.round(Math.random()));
    return result;
  }, {});
}