import type { CarInterface, NewCarInterface } from "../../../types/Car";
import garageAPI from "../../../api/garageAPI";
import generateCarName from "../../../utils/generateCarName";
import getRandomColor from "../../../utils/getRandomColor";
import { PAGINATION } from "../../../consts/pagination";

class ModelGarage {
    cars: CarInterface[];

    selectedCar: CarInterface | null;
    totalCount: number;
    currentPageGarage: number;
    isRace: boolean;
    elementsPerPage: number;

    constructor() {
        this.cars = [];
        this.totalCount = 0;
        this.selectedCar = null;
        this.currentPageGarage = 1;
        this.isRace = false;
        this.elementsPerPage = 7;
        this.isRace = false;
    }

    getSelectedCar = () => {
        return this.selectedCar;
    };

    getTotalCount = (): number => {
        return this.totalCount;
    };

    async getCars(page: number): Promise<CarInterface[]> {
        const response = await garageAPI.fetchCars(page, PAGINATION.ELEMENTS_PER_PAGE);

        this.cars = response.cars;
        this.totalCount = response.count;

        return this.cars;
    }

    async getCarInfo(id: number): Promise<CarInterface> {
        const car = await garageAPI.fetchCar(id);

        return car;
    }

    async createCar(color: string, name: string) {
        const car: NewCarInterface = { color, name };

        await garageAPI.createCar(car);
    }

    async updateCar(id: number, name: string, color: string) {
        await garageAPI.updateCar(id, name, color);
    }

    setSelectedCar(id: number) {
        this.selectedCar = this.cars.filter(el => el.id === id)[0];
    }

    async deleteCar(id: number) {
        await garageAPI.deleteCar(id);

        if (this.currentPageGarage >= 1 && this.cars.length === 1) {
            const newPage = this.currentPageGarage - 1;

            sessionStorage.setItem("pageGarage", String(newPage));
            this.setCurrentPageGarage(newPage);
        }
    }

    async generateCars(size: number) {
        const cars = this.createCars(size);
        const carsPromise = [];

        for (let i = 0; i <= cars.length - 1; i++) {
            carsPromise.push(garageAPI.createCar(cars[i]));
        }

        await Promise.all(carsPromise);
    }

    getCurrentPageGarage = (): number => {
        return this.currentPageGarage;
    };

    setCurrentPageGarage = (page: number) => {
        if (this.cars.length === 0) {
            this.currentPageGarage = 1;
        }

        this.currentPageGarage = page;
    };

    createCars(size: number): NewCarInterface[] {
        const res: NewCarInterface[] = [];

        for (let i = 0; i <= size - 1; i++) {
            const carName = generateCarName();
            const color = getRandomColor();

            res.push({ color: color, name: carName });
        }

        return res;
    }

    setIsRace = (value: boolean) => {
        this.isRace = value;
    };
    getIsRace = (): boolean => {
        return this.isRace;
    };

}

export default ModelGarage;
