import {BASE_URL} from "..";
import {EngineData} from "../../types/EngineData";

class EngineAPI {

    async startEngine(id: number): Promise<EngineData> {
        const response = await fetch(BASE_URL + `/engine?id=${id}&status=started`, {
            method: "PATCH",
        })
        return await response.json()
    }

    async stopEngine(id: number) {
        const response = await fetch(BASE_URL + `/engine?id=${id}&status=stopped`, {
            method: "PATCH",
        })
        return await response.json()
    }

    async startDriveMode(id: number) {
        const response = await fetch(BASE_URL + `/engine?id=${id}&status=drive`, {
            method: "PATCH",
        })
        return response.status === 200
    }


}

const engineApi = new EngineAPI();
export default engineApi;