

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