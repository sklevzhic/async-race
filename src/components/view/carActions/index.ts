import Button from "../button";
import {BUTTON} from "../../../consts/button";

export enum BUTTONS  {START, STOP}

export const START = "start"
export const STOP = "stop"
class CarActions {
    root: HTMLElement;
    buttonStart: HTMLElement;
    buttonEnd: HTMLElement;

    constructor() {
        this.root = document.createElement("div")
        this.buttonStart = Button(BUTTON.START_CAR, ["button__circle"])
        this.buttonEnd = Button(BUTTON.STOP_CAR, ["button__circle", "disable"])
    }

    render(): HTMLElement {
        this.root.classList.add("garage__item-actions")

        const carActionsLeft = document.createElement("div")
        carActionsLeft.classList.add("garage__item-actions-left")

        carActionsLeft.append(Button(BUTTON.REMOVE_CAR, ["button__remove"]))
        carActionsLeft.append(Button(BUTTON.SELECT_CAR, ["button__select"]))

        const carActionsRight = document.createElement("div")
        carActionsRight.classList.add("garage__item-actions-right")

        carActionsRight.append(this.buttonStart)
        carActionsRight.append(this.buttonEnd)

        this.root.append(carActionsLeft)
        this.root.append(carActionsRight)
        return this.root
    }

    setIsLoading = (button: BUTTONS.START | BUTTONS.STOP, value: boolean) => {
        if (button === BUTTONS.START) {
            !value ? this.buttonStart.classList.remove("loading") : this.buttonStart.classList.add("loading")
        }
        if (button === BUTTONS.STOP) {
            !value ? this.buttonEnd.classList.remove("loading") : this.buttonEnd.classList.add("loading")
        }
    }
}

export default CarActions