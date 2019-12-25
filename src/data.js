import {getRandomDate, getRandomInteger, getRandomElements, createRepeatDays, getRandomString} from "./utils";

const COUNT_TASKS = 16;
const description = [`Изучить теорию`, `Сделать домашку`, `Пройти интенсив на соточку`];
const days = [`Mo`, `Tu`, `We`, `Th`, `Fr`, `Sa`, `Su`];

const tags = new Set([
  `homework`,
  `theory`,
  `practice`,
  `intensive`,
  `keks`,
]);

export const COLORS = new Set([
  `black`,
  `yellow`,
  `blue`,
  `green`,
  `pink`,
]);

const createTask = () => {
  const task = {
    id: getRandomString(3),
    description: description[getRandomInteger(description.length - 1, 0)],
    dueDate: Boolean(Math.round(Math.random())) ? getRandomDate() : false,
    repeatingDays: null,
    tags: new Set(getRandomElements(Array.from(tags), getRandomInteger(3, 3), getRandomInteger)),
    color: Array.from(COLORS)[getRandomInteger(Array.from(COLORS).length - 1, 0)],
    isFavorite: Boolean(Math.round(Math.random())),
    isArchive: Boolean(Math.round(Math.random())),
  };
  task['repeatingDays'] = task['dueDate'] ? createRepeatDays(days, false) : createRepeatDays(days);
  return task;
}

export const tasks = new Array(COUNT_TASKS).fill('').map((task) => createTask());
