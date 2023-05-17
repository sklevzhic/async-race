import type Controller from "../../components/controller";
import Winners from "../../components/view/winners";
import Pagination from "../../components/view/pagination";
import { getStartIndexPagination } from "../../utils/getStartIndexPagination";

class WinnersPage {
    controller: Controller;
    root: HTMLElement;
    tableWinners: Winners;
    spanCount: HTMLElement;
    pagination: Pagination;

    constructor(id: string, controller: Controller) {
        this.controller = controller;
        this.root = document.createElement("div");
        this.root.classList.add("main");
        this.root.id = id;
        this.tableWinners = new Winners(this.controller, this.getWinners);
        this.pagination = new Pagination(
            0,
            this.controller.winnersController.getElementsPerPage(),
            this.handlerPage);
        this.spanCount = document.createElement("span");
        void this.getWinners();
    }

    render(): HTMLElement {
        const container = document.createElement("div");

        container.classList.add("container");

        const garageHeader = document.createElement("div");

        garageHeader.classList.add("garage__header");

        const garageTitle = document.createElement("div");

        garageTitle.classList.add("garage__title");

        const spanTitle = document.createElement("span");

        spanTitle.textContent = "Winners ";

        garageTitle.append(spanTitle);
        garageTitle.append(this.spanCount);

        garageHeader.append(garageTitle);
        container.append(garageHeader);
        container.append(this.tableWinners.render());
        container.append(this.pagination.render());

        this.root.append(container);

        return this.root;
    }

    getWinners = async () => {
        await this.controller.winnersController.fetchWinners();

        const { winners, count } = await this.controller.winnersController.getWinners();

        this.updateCount(count);
        this.pagination.setNewValues(count);
        this.pagination.setCurrentPage(this.controller.winnersController.getCurrentPage());

        const startIndex = getStartIndexPagination(this.controller.winnersController.getCurrentPage(),
            this.controller.winnersController.getElementsPerPage());

        this.tableWinners.update(winners, startIndex);
    };

    updateCount = (value: number) => {
        this.spanCount.textContent = String(value);
    };

    handlerPage = async (page: number) => {
        sessionStorage.setItem("pageWinners", String(page));
        this.controller.winnersController.setCurrentPage(page);
        await this.getWinners();
    };

}

export default WinnersPage;
