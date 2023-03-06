class ErrorPage {
    root: HTMLElement;

    constructor(id: string) {
        this.root = document.createElement("div");
        this.root.classList.add("main");
        this.root.id = id;
    }

    render(): HTMLElement {
        this.root.innerHTML = "404"
        return this.root
    }

}


export default ErrorPage