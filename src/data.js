import {getRandomDate, getRandomInteger, getRandomElements, createRepeatDays} from "./utils";

const COUNT_TASKS = 0;
const description = [`Изучить теорию`, `Сделать домашку`, `Пройти интенсив на соточку`];
const days = [`Mo`, `Tu`, `We`, `Th`, `Fr`, `Sa`, `Su`];
const tags = new Set([
  `homework`,
  `theory`,
  `practice`,
  `intensive`,
  `keks`,
]);

const colors = new Set([
  `black`,
  `yellow`,
  `blue`,
  `green`,
  `pink`,
]);

const createTask = () => {
  return {
    description: description[getRandomInteger(description.length - 1, 0)],
    dueDate: getRandomDate(),
    repeatingDays: createRepeatDays(days),
    tags: getRandomElements(Array.from(tags), getRandomInteger(3, 3), getRandomInteger),
    color: Array.from(colors)[getRandomInteger(Array.from(colors).length - 1, 0)],
    isFavorite: Boolean(Math.round(Math.random())),
    isArchive: Boolean(Math.round(Math.random())),
  }
}

export const tasks = new Array(COUNT_TASKS).fill('').map((task) => createTask());
