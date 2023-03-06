import Button from "../button"
import "./index.scss"
import {BUTTON} from "../../../consts/button";
import { replaceHash } from "../../../utils/replaceHash";

class Header {
    root: HTMLElement;

    constructor() {
        this.root = document.createElement("header")
        this.root.classList.add("header")

        this._enableHandlerPage()
    }

    render(): HTMLElement {
        const container = document.createElement("div")
        container.classList.add("container")

        container.innerHTML = `
            <div class="header__wrapper">
                <div>
                    ${Button("TO WINNERS").outerHTML}
                </div>
                <div class="header__logo">ASYNC <span>RACE</span></div>
                <div>
                    ${Button("TO GARAGE").outerHTML}
                </div>    
            </div>
    `
        this.root.append(container)
        return this.root
    }

    _enableHandlerPage() {
        this.root.addEventListener("click", (e) => {
            if (e.target instanceof HTMLButtonElement && e.target.classList.contains("button")) {
                if (e.target.textContent === BUTTON.TO_GARAGE) {
                    window.location.href = replaceHash(window.location.href, "#garage")
                }
                if (e.target.textContent === BUTTON.TO_WINNERS) {
                    window.location.href = replaceHash(window.location.href, "#winners")
                }
            }
        })
    }
}

export default Header;
