import "./index.scss"
import Button from "../button";
import {CarFormInterface, CarInterface} from "../../../types/Car";
import {BUTTON} from "../../../consts/button";
import Controller from "../../controller";
import CreateCar from "../createCar";

class FormOfCreateCars {
    root: HTMLDivElement;
    controller: Controller;
    createCarForm: CreateCar;
    updateCarForm: CreateCar;
    updateGarage: () => void;
    handleStartRace: () => void;
    handleResetRace: () => void;

    constructor(controller: Controller, updateGarage: () => void, handleStartRace: () => void, handleResetRace: () => void) {
        this.root = document.createElement("div");
        this.controller = controller
        this.createCarForm = new CreateCar("Create", "create", this.handleCarValueInForm, false)
        this.updateCarForm = new CreateCar("Update", "update", this.handleCarValueInForm, true)
        this.updateGarage = updateGarage
        this.handleStartRace = handleStartRace
        this.handleResetRace = handleResetRace
        this._enableHandlers()
    }

    render() {
        this.root.classList.add("form")
        this.root.innerHTML = `
            <div class="form__inner-wrapper">
                <div class="form__item">
                    <div class="forms"></div>
                    <div class="form__actions">
                         <div class="form__actions-top">
                            ${Button(BUTTON.RACE, ["button-race"]).outerHTML}
                            ${Button(BUTTON.RESET, ["button-reset"]).outerHTML}
                    </div>
                    <div class="form__actions-bottom">
                        ${Button(BUTTON.GENERATE_CARS, ["button__large"]).outerHTML}
                    </div>
                    </div>
                </div>
            </div>
        `
        this.createForms()
        return this.root
    }

    createForms(selectedCar?: CarInterface) {
        const forms = this.root.querySelector(".forms")
        forms.innerHTML = ""
        forms.append(this.createCarForm.render())
        forms.append(this.updateCarForm.render(selectedCar))
    }

    _enableHandlers = () => {
        this.root.addEventListener("click", (event) => {
            if (event.target instanceof HTMLButtonElement && event.target.classList.contains("button")) {
                if (event.target.textContent === BUTTON.GENERATE_CARS) this.handleButtonGenerateCars()
                if (event.target.textContent === BUTTON.RACE) this.handleButtonRace()
                if (event.target.textContent === BUTTON.RESET) this.handleButtonReset()
            }
        })
    }

    updateForm = () => {
        const selectedCar = this.controller.garageController.getSelectedCar()
        if (selectedCar) {
            this.updateCarForm.updateValueSelectedCar(selectedCar)
        } else {
            this.updateCarForm.updateValueSelectedCar(null)
        }

        if (this.controller.garageController.getIsRace()) {
            this.root.querySelector(".button-race")?.classList.add("disable")
        } else {
            this.root.querySelector(".button-race")?.classList.remove("disable")
        }

    }

    async handleButtonGenerateCars() {
        await this.controller.garageController.generateCars()
        this.updateGarage()
    }

    handleButtonRace = () => {
        this.handleStartRace()
    }

    handleButtonReset = () => {
        this.handleResetRace()
    }

    handleCarValueInForm = async (car: CarFormInterface) => {
        await this.controller.garageController.handlerCar(car)
        this.updateGarage()
    }
}

export default FormOfCreateCars