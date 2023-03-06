import ModelWinners from "./winners";
import GarageWinners from "./garage";
import ModelGarage from "./garage";
import ModelEngine from "./engine";

class Model {
    winners: ModelWinners;
    garage: GarageWinners;
    engine: ModelEngine;

    constructor() {
        this.winners = new ModelWinners()
        this.garage = new ModelGarage()
        this.engine = new ModelEngine()
    }
}

export default Model