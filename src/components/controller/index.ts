import EngineController from "./engine";
import GarageController from "./garage";
import WinnersController from "./winners";

export class Controller {
    garageController: GarageController;
    winnersController: WinnersController;
    engineController: EngineController;

    constructor() {
        this.garageController = new GarageController();
        this.engineController = new EngineController();
        this.winnersController = new WinnersController();
    }
}

export default Controller;
