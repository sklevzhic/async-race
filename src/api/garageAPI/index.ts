import { BASE_URL } from "..";
import type { CarInterface, NewCarInterface } from "../../types/Car";
import type { CarsTotal } from "../../types/CarsTotal";

class GarageAPI {

    async fetchCar(id: number) {
        const response = await fetch(`${BASE_URL}/garage/${id}`);
        const car = await response.json() as CarInterface;

        return car;
    }

    async fetchCars(page: number, limit: number): Promise<CarsTotal> {
        const response = await fetch(`${BASE_URL}/garage?_page=${page}&_limit=${limit}`, {
            headers: {
                "X-Total-Count": "4",
            },
        });
        const cars = await response.json() as CarInterface[];
        const totalCount = response.headers.get("X-Total-Count");

        return { cars, count: totalCount ? +totalCount : 0 };
    }

    async createCar(car: NewCarInterface): Promise<CarInterface> {
        const response = await fetch(`${BASE_URL}/garage`, {
            method: "POST",
            body: JSON.stringify(car),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const carResponse = await response.json() as CarInterface;

        return carResponse;
    }

    async updateCar(id: number, name: string, color: string) {
        const response = await fetch(`${BASE_URL}/garage/${id}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, color }),
        });
        const carResponse = await response.json() as CarInterface;

        return carResponse;
    }

    async deleteCar(id: number) {
        const response = await fetch(`${BASE_URL}/garage/${id}`, {
            method: "DELETE",
        });

        return response;
    }
}

const garageApi = new GarageAPI();

export default garageApi;
