import { BASE_URL } from "..";
import type { EngineData } from "../../types/EngineData";

class EngineAPI {

    async startEngine(id: number): Promise<EngineData> {
        const response = await fetch(`${BASE_URL}/engine?id=${id}&status=started`, {
            method: "PATCH",
        });

        return await response.json();
    }

    async stopEngine(id: number) {
        const response = await fetch(`${BASE_URL}/engine?id=${id}&status=stopped`, {
            method: "PATCH",
        });

        return await response.json();
    }

    async startDriveMode(id: number) {
        const response = await fetch(`${BASE_URL}/engine?id=${id}&status=drive`, {
            method: "PATCH",
        });
        const STATUS_CODE = 200;

        return response.status === STATUS_CODE;
    }

}

const engineApi = new EngineAPI();

export default engineApi;
