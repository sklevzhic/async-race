import Model from "../../model";

class EngineController {
    model: Model;

    constructor() {
        this.model = new Model()
    }

    async getEngineStartData(id: number) {
        return this.model.engine.getEngineStartData(id)
    }

    async getEngineStopData(id: number) {
        return this.model.engine.getEngineStopData(id)
    }

    async startDriveMode(id: number) {
        return this.model.engine.startDriveMode(id)
    }
}

export default EngineController;