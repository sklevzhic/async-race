import Controller from "../controller";
import GaragePage from "../../pages/garage";
import WinnersPage from "../../pages/winners";
import ErrorPage from "../../pages/error";
import Header from "../view/header";

class App {
    controller: Controller;
    container: HTMLElement;
    initialPage: GaragePage;
    contentPage: HTMLElement;

    constructor() {
        this.controller = new Controller()
        this.checkLocalStorage()

        this.container = document.body;
        this.contentPage = document.createElement("div");
        this.initialPage = new GaragePage("engine-page", this.controller)
        this.enableRouteChange()
    }

    renderNewPage(name: string) {
        this.contentPage.innerHTML = ""
        let page: GaragePage | WinnersPage | ErrorPage | null = null
        switch (name) {
            case "":
                page = new GaragePage("engine-page", this.controller);
                break;
            case "winners":
                page = new WinnersPage("winners-page", this.controller);
                break
            case "garage":
                page = new GaragePage("engine-page", this.controller);
                break
            default:
                page = new ErrorPage("error-page")
        }
        if (page) {
            this.contentPage.append(page.render())
        }

    }

    run() {
        addEventListener("DOMContentLoaded", () => {
            const header = new Header()
            this.container.append(header.render())
            const pageName = this._checkLocation()
            this.renderNewPage(pageName)
            this.container.append(this.contentPage)
        }, true)
    }

    _checkLocation(): string {
        return window.location.hash.replace("#", "")
    }

    checkLocalStorage() {
        if (sessionStorage.getItem("pageGarage")) {
            const page = +sessionStorage.getItem("pageGarage")
            this.controller.garageController.setCurrentPageGarage(page)
        }
        if (sessionStorage.getItem("pageWinners")) {
            const page = +sessionStorage.getItem("pageWinners")
            this.controller.winnersController.setCurrentPage(page)
        }
    }

    enableRouteChange() {
        window.addEventListener("hashchange", this.handleURLParams)
        window.addEventListener("popstate", this.handleURLParams)
    }

    handleURLParams = () => {
        const pageName = this._checkLocation()
        this.renderNewPage(pageName)
    }

}

export default App