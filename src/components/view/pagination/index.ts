import "./index.scss";

class Pagination {
    root: HTMLElement;
    buttonLeft: HTMLButtonElement;
    buttonRight: HTMLButtonElement;
    currentPageHTML: HTMLDivElement;
    currentPageValue: number;
    elements: number;
    elementsPerPage: number;
    handlePage: (p: number) => void;

    constructor(elements: number, elementsPerPage: number, handlePage: (p: number) => void) {
        this.root = document.createElement("div");
        this.buttonLeft = document.createElement("button");
        this.currentPageHTML = document.createElement("div");
        this.buttonRight = document.createElement("button");
        this.elements = elements;
        this.elementsPerPage = elementsPerPage;
        this.currentPageValue = 1;
        this.handlePage = handlePage;
    }

    getMaxPage(): number {
        return Math.ceil(this.elements / this.elementsPerPage);
    }

    render() {
        this.root.classList.add("pagination");
        this.buttonLeft.textContent = "<";
        this.buttonLeft.classList.add("pagination__button");
        this.buttonLeft.classList.add("pagination__button-left");

        this.buttonLeft.addEventListener("click", this.handlerButtonLeft);

        this.currentPageHTML.textContent = String(`${this.currentPageValue} / ${  this.getMaxPage()}`);
        this.currentPageHTML.classList.add("pagination__current");
        this.buttonRight.textContent = ">";
        this.buttonRight.classList.add("pagination__button");
        this.buttonRight.classList.add("pagination__button-right");
        this.buttonRight.addEventListener("click", this.handlerButtonRight);
        this.updateButtons();
        this.root.append(this.buttonLeft);
        this.root.append(this.currentPageHTML);
        this.root.append(this.buttonRight);

        return this.root;
    }

    handlerButtonLeft = () => {
        this.currentPageValue = this.currentPageValue - 1;
        this.updateButtons();
        this.handlePage(this.currentPageValue);
    };

    handlerButtonRight = () => {
        this.currentPageValue += 1;
        this.updateButtons();
        this.handlePage(this.currentPageValue);
    };

    updateButtons = () => {
        this.currentPageValue === 1 || this.root.classList.contains("hidden")
            ? this.buttonLeft.classList.add("disabled")
            : this.buttonLeft.classList.remove("disabled");

        this.currentPageValue === this.getMaxPage() || this.getMaxPage() === 0 || this.root.classList.contains("hidden")
            ? this.buttonRight.classList.add("disabled")
            : this.buttonRight.classList.remove("disabled");

        this.currentPageHTML.textContent = String(`${this.currentPageValue} / ${this.getMaxPage()}`);
    };

    setNewValues(elements: number) {
        this.elements = elements;

        if (this.currentPageValue > Math.ceil(elements / this.elementsPerPage)) {
            this.currentPageValue = Math.ceil(elements / this.elementsPerPage);
        }

        this.updateButtons();
    }

    setCurrentPage(page: number) {
        this.currentPageValue = page;
        this.updateButtons();
    }

    toggleVisiblePagination(value: boolean) {
        value ? this.root.classList.add("hidden") : this.root.classList.remove("hidden");
    }

}

export default Pagination;
