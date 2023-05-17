import "./index.scss";
import type { handleCar } from "../../../types/handleCar";
import type { CarFormInterface, CarInterface } from "../../../types/Car";

const DEFAULT_COLOR = "#c3ff00";

class CreateCar {
    root: HTMLFormElement;
    textBtn: string;
    color: string;
    name: string;
    method: string;
    handleCarValue: handleCar;
    id: string;
    isDisable: boolean;

    nameInput: HTMLInputElement;
    colorInput: HTMLInputElement;
    buttonSubmit: HTMLInputElement;

    constructor(textBtn: string, method: string, handleCarValue: handleCar, isDisable: boolean) {
        this.root = document.createElement("form");
        this.root.classList.add("form__row");
        this.root.action = "#";
        this.textBtn = textBtn;
        this.method = method;
        this.isDisable = isDisable;
        this.nameInput = document.createElement("input");
        this.colorInput = document.createElement("input");
        this.buttonSubmit = document.createElement("input");

        this.handleCarValue = handleCarValue;
        this.id = "";
        this.color = "#c3ff00";
        this.name = "";
    }

    render(selectedCar?: CarInterface) {
        if (selectedCar) this.updateValueSelectedCar(selectedCar);
        this.nameInput.name = "name";

        this.createFields();
        this.enableHandler();

        return this.root;
    }

    createFields() {
        this.nameInput.name = "name";
        this.nameInput.classList.add("form__row-name");
        this.nameInput.type = "text";
        this.nameInput.required = true;
        this.nameInput.value = this.name;

        if (this.isDisable) {
            this.nameInput.disabled = true;
        }

        this.colorInput.name = "color";
        this.colorInput.classList.add("form__row-color");
        this.colorInput.type = "color";
        this.colorInput.value = this.color;

        if (this.isDisable) {
            this.colorInput.disabled = true;
        }

        this.buttonSubmit.type = "submit";
        this.buttonSubmit.classList.add("form__row-button");
        this.buttonSubmit.value = this.textBtn;

        if (this.isDisable) {
            this.buttonSubmit.disabled = true;
        }

        this.root.append(this.nameInput);
        this.root.append(this.colorInput);
        this.root.append(this.buttonSubmit);
    }

    enableHandler = () => {
        this.nameInput.addEventListener("input", this.handleName);
        this.colorInput.addEventListener("change", this.handleColor);
        this.root.addEventListener("submit", this.handleFormSubmit);
    };

    handleName = (event: Event) => {
        if (event.target instanceof HTMLInputElement) {
            this.name = event.target.value;
        }
    };
    handleColor = (event: Event) => {
        if (event.target instanceof HTMLInputElement) {
            this.color = event.target.value;
        }
    };

    handleFormSubmit = (event: SubmitEvent) => {
        event.preventDefault();

        if (event.target instanceof HTMLFormElement) {
            const carFormValue: CarFormInterface = {
                method: this.method,
                name: this.name,
                color: this.color,
                id: +this.id,
            };

            this.handleCarValue(carFormValue);
        }

        this.name = "";
        this.color = DEFAULT_COLOR;
        this.id = "";
        this.setValueInForm();

        if (this.method === "update") {
            this.handleVisibleInputCar(true);
        }
    };

    updateValueSelectedCar(car: CarInterface | null) {
        if (car) {
            const { id, name, color } = car;

            this.name = name;
            this.color = color;
            this.id = String(id);
            this.handleVisibleInputCar(false);
        }
        else {
            this.name = "";
            this.color = DEFAULT_COLOR;
            this.id = "";
            this.handleVisibleInputCar(true);
        }

        this.setValueInForm();
    }

    setValueInForm = () => {
        this.nameInput.value = this.name;
        this.colorInput.value = this.color;
    };

    handleVisibleInputCar = (value: boolean) => {
        this.nameInput.disabled = value;
        this.colorInput.disabled = value;
        this.buttonSubmit.disabled = value;
    };
}

export default CreateCar;
