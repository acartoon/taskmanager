import Menu from "../components/menu";
import Search from "../components/search";
import Filter from "../components/filter";
import NoTasks from "../components/no-tasks";

import {render} from "../utils";
import SearchController from "./search-controller";
import MainPageController from "./main-page-controller";
import StatsController from "./stats-controller";

export default class PageController {
  constructor(tasksData, container) {
    this._tasksData = tasksData;
    this._container = container;
    this._menu = null;
    this._search = null;
    this._filter = new Filter;
    this._noTasks = new NoTasks;
    this._boardController = null;
    this._mainPageController = null;
    this._active = null;
    this.onDataChange = this.onDataChange.bind(this);
    this._statsController = new StatsController(this._container, this.onDataChange);
    this._searchController = new SearchController(this._container, this.return.bind(this), this.onDataChange);
  }

  init() {
    this._menu = new Menu(this.onclickMenu.bind(this));
    render(this._container.querySelector(`.main__control`), this._menu.getElement());
    this._search = new Search(this.initSearch.bind(this));
    render(this._container, this._search.getElement());
    render(this._container, this._filter.getElement());

    if(this._tasksData.length === 0) {
      render(this._board.getElement(), this._noTasks.getElement());
    } else {
      this._mainPageController = new MainPageController(this._container, this._tasksData, this.onDataChange);
      this._mainPageController.init();
      this._active = this._mainPageController;
    }
    this._statsController.init();
    this._searchController.init();
  }

  onclickMenu(value) {
    if(value === `control__task`) {
      this.return();
      this._active = this._mainPageController;
    } else if (value ===`control__statistic`) {
      this._initStats();
    }
  }

  initSearch(value) {
    if(value.length > 2) {
      this._active.hide();
      this._searchController.show(value, this._tasksData);
      this._active = this._searchController;
    }
  }

  return() {
    console.log(this._tasksData)
    this._active.hide();
    this._search.clear();
    this._mainPageController.show(this._tasksData);
    this._active = this._mainPageController;
  }

  _initStats() {
    this._active.hide();
    this._statsController.show(this._tasksData);
    this._active = this._statsController;
  }

    onDataChange(tasksData) {
      this._tasksData = tasksData;
      console.log(this._tasksData)
  }
}
