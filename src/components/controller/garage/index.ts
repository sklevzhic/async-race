import ModelGarage from "../../model/garage";
import type { CarFormInterface, CarInterface } from "../../../types/Car";

class GarageController {
    model: ModelGarage;
    constructor() {
        this.model = new ModelGarage();
    }

    getTotalCount(): number {
        return this.model.getTotalCount();
    }

    async getCars(page: number): Promise<CarInterface[]> {
        return await this.model.getCars(page);
    }

    setCurrentPageGarage = (page: number) => {
        this.model.setCurrentPageGarage(page);
    };

    getCurrentPageGarage(): number {
        return this.model.getCurrentPageGarage();
    }

    setSelectedCar(id: number | null) {
        if (id) {
            this.model.setSelectedCar(id);
        }
    }

    getSelectedCar = () => {
        return this.model.getSelectedCar();
    };

    async handlerCar({ method, name, color, id }: CarFormInterface) {
        if (method === "create") {
            await this.model.createCar(color, name);
        }

        if (method === "update" && id) {
            await this.model.updateCar(id, name, color);
        }
    }

    async deleteCar(id: number) {
        await this.model.deleteCar(id);
    }

    async generateCars(size = 100) {
        await this.model.generateCars(size);
    }

    setIsRace(value: boolean) {
        this.model.setIsRace(value);
    }

    getIsRace() {
        return this.model.getIsRace();
    }

}

export default GarageController;
