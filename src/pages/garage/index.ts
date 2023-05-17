import FormOfCreateCars from "../../components/view/formOfCreateCars";
import Garage from "../../components/view/garage";
import type Controller from "../../components/controller";

class GaragePage {
    root: HTMLElement;
    controller: Controller;
    form: FormOfCreateCars;
    garage: Garage;

    constructor(id: string, controller: Controller) {
        this.controller = controller;

        this.root = document.createElement("div");
        this.root.classList.add("main");
        this.root.id = id;

        this.form = new FormOfCreateCars(this.controller, this.updateGarage, this.handleStartRace, this.handleResetRace);
        this.garage = new Garage(this.controller, this.updateForm);
        void this.updateGarage();
    }

    render() {
        const container = document.createElement("div");

        container.classList.add("container");

        const formHTML = this.form.render();

        container.append(formHTML);

        const garageHTML = this.garage.render();

        container.append(garageHTML);

        this.root.append(container);

        return this.root;
    }

    updateGarage = async () => {
        await this.garage.updateGarage();
    };

    updateForm = async () => {
        this.form.updateForm();
    };

    handleStartRace = async () => {
        await this.garage.handleStartRace();
    };

    handleResetRace = async () => {
        await this.garage.handleResetRace();
    };
}

export default GaragePage;
