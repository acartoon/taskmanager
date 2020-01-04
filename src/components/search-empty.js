import {createElement} from '../utils';
import AbstractComponent from './abstract-component';

export default class SearchEmpty extends AbstractComponent{
  constructor() {
    super();
  }  
  getTemplate() {
    return `<p class="result__empty">no matches found...</p>`;
  }
}
