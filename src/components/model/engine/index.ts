import {EngineData} from "../../../types/EngineData";
import {engineApi} from "../../../api";


class ModelEngine {

    async getEngineStartData(id: number): Promise<EngineData> {
        return await engineApi.startEngine(id)
    }

    async getEngineStopData(id: number): Promise<EngineData> {
        return await engineApi.stopEngine(id)
    }

    async startDriveMode(id: number) {
        return await engineApi.startDriveMode(id)
    }
}

export default ModelEngine