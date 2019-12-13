

export function render(container, template, type = `beforeend`) {
  container.insertAdjacentHTML(type, template);
}

export function toAddElement(container, element) {
  container.append(element)
}



export const createElement = (element, ...nameClass) => {
  const elem = document.createElement(element);
  elem.classList.add(...nameClass);
  return elem;
}

export const getRandomInteger = (max, min = 1) => Math.round(min - 0.5 + Math.random() * (max - min + 1));

export const getRandomElements = (arr, count, func) => new Array(count).fill(``).map(() => arr[func(0, arr.length - 1)]);

export function getRandomDate() {
  let randomYear = getRandomInteger(1930, 1990);
  let randomMonth = getRandomInteger(1, 12);
  let randomDate = getRandomInteger(1, 30);
  return new Date(randomYear, randomMonth, randomDate);
}


export const createRepeatDays = (array) => {
  return array.reduce((result, current) => {
    result[current] = Boolean(Math.round(Math.random()));
    return result;
  }, {});
}