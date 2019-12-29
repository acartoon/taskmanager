import Menu from "../components/menu";
import Search from "../components/search";
import Filter from "../components/filter";
import NoTasks from "../components/no-tasks";

import BoardController from "./board-controller";
import {render, createNode} from "../utils";
import SearchController from "./search-controller";
import MainPageController from "./main-page-controller";

export default class PageController {
  constructor(tasksData, container) {
    this._tasksData = tasksData;
    this._container = container;
    // this._board = new Board;
    this._menu = new Menu;
    this._search = null;
    this._filter = new Filter;
    this._noTasks = new NoTasks;
    this._boardController = null;
    this._searchController = new SearchController;
    this._mainPageController = null;
  }

  init() {
    render(this._container.querySelector(`.main__control`), this._menu.getElement());
    this._search = new Search(this.initSearch.bind(this));
    render(this._container, this._search.getElement());
    render(this._container, this._filter.getElement());
    // render(this._container, this._board.getElement());

    if(this._tasksData.length === 0) {
      render(this._board.getElement(), this._noTasks.getElement());
    } else {
      this._mainPageController = new MainPageController(this._container, this._tasksData);
      this._mainPageController.init();

      // this._boardController = new BoardController(this._board.getElement(), this._tasksData);
      // this._boardController.init();
    }
  }

  initSearch() {
    console.log(this._board.getElement())
    // this._board.getElement().classList.add(`visually-hidden`);
    this._searchController.init(this._tasksData, this._container);
  }
}