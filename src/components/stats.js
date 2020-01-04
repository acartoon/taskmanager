import PageBaseComponent from "./page-base-component";

export default class Stats extends PageBaseComponent {
  constructor() {
    super();
  }

  getTemplate() {
    return `<section class='statistic container'></section>`
  }
}