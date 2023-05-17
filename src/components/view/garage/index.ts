import "./index.scss";
import GarageItems from "../garageItems";
import type { CarInterface } from "../../../types/Car";
import Pagination from "../pagination";
import { BUTTON } from "../../../consts/button";
import { PAGINATION } from "../../../consts/pagination";
import type Controller from "../../controller";
import convertMsToSec from "../../../utils/convetrMsToSe";
import type { EngineData } from "../../../types/EngineData";
import { BUTTONS } from "../carActions";

export class Garage {
    garageItems: GarageItems;
    root: HTMLElement;
    totalCars: HTMLSpanElement;
    garageMain: HTMLElement;
    pagination: Pagination;
    controller: Controller;
    updateForm: () => void;
    winnerTime: number;
    finishedCars: number;

    constructor(controller: Controller, updateForm: () => void) {
        this.controller = controller;
        this.root = document.createElement("div");
        this.totalCars = document.createElement("span");
        this.garageMain = document.createElement("div");
        this.garageItems = new GarageItems();
        this.pagination = new Pagination(0, PAGINATION.ELEMENTS_PER_PAGE, this.setCurrentPage);
        this.updateForm = updateForm;
        this.enableHandlers();
        this.winnerTime = 0;
        this.finishedCars = 0;
    }

    render() {
        this.root.classList.add("garage");

        const garageHeader = document.createElement("div");

        garageHeader.classList.add("garage__header");

        const garageTitle = document.createElement("div");

        garageTitle.classList.add("garage__title");
        garageTitle.innerHTML = `Garage `;

        garageTitle.append(this.totalCars);

        this.garageMain.classList.add("garage__main");

        this.root.append(garageHeader);
        garageHeader.append(garageTitle);

        this.garageMain.append(this.garageItems.render());
        this.garageMain.append(this.pagination.render());

        this.root.append(this.garageMain);

        return this.root;
    }

    update = (total: number, cars: CarInterface[], currentPage: number) => {
        this.totalCars.textContent = String(total);
        this.garageItems.render(cars);
        this.pagination.setNewValues(total);
        this.pagination.setCurrentPage(currentPage);
    };

    enableHandlers = () => {
        this.root.addEventListener("click",  (event) => {
            if (event.target instanceof HTMLElement && event.target.closest(".garage__item")) {
                const el = event.target.closest(".garage__item");

                if (el) {
                    const id = +el.id;

                    if (event.target.textContent === BUTTON.REMOVE_CAR) void this.handleRemoveCar(id);
                    if (event.target.textContent === BUTTON.SELECT_CAR) void this.handleSelectCar(id);
                    if (event.target.textContent === BUTTON.START_CAR) void this.handleStartCar([ id ]);
                    if (event.target.textContent === BUTTON.STOP_CAR) void this.handleStopCar([ id ]);
                }
            }
        });
    };

    handleStartCar = async (arrID: number[]) => {
        const promisesStartData = arrID.map(id => {
            return this.controller.engineController.getEngineStartData(id);
        });

        this.setIsLoadingButtons(arrID, BUTTONS.START, true);

        const distanceData = await Promise.all(promisesStartData);

        this.setIsLoadingButtons(arrID, BUTTONS.START, false);
        this.startArrayRace(arrID, distanceData);
        this.startArrayDriveMode(arrID, distanceData);
    };

    setIsLoadingButtons(idArr: number[], button: BUTTONS, value: boolean) {
        const activeCars = this.garageItems.items.filter(car => idArr.includes(car.carInfo.id));

        activeCars.forEach(car => this.garageItems.setIsLoading(car.carInfo.id, button, value));
    }
    startArrayRace(idArr: number[], distanceData: EngineData[]) {
        idArr.forEach((id, i) => {
            this.garageItems.startCar(id, distanceData[i]);
        });
    }
    stopArrayRace(idArr: number[]) {
        idArr.forEach((id) => {
            this.garageItems.stopCar(id);
        });
    }
    startArrayDriveMode(arrID: number[], distanceData: EngineData[]) {
        this.finishedCars = 0;
        arrID.forEach(async (id, i) => {
            const res = await this.controller.engineController.startDriveMode(id);

            this.finishedCars = this.finishedCars + 1;

            if (!res) {
                this.garageItems.breakCar(id);
            }
            else {
                if (this.controller.garageController.getIsRace()) {
                    this.controller.garageController.setIsRace(false);

                    const time = convertMsToSec(distanceData[i].distance / distanceData[i].velocity);

                    this.setWinner(id, time);
                }
            }
            if (this.finishedCars === this.garageItems.items.length) {
                this.pagination.toggleVisiblePagination(false);
            }
        });
    }
    setWinner(id: number, time: number) {
        void this.controller.winnersController.setWinner(id, time);
        this.garageItems.highlightCar(id, time);
    }

    handleStopCar = async (arrID: number[]) => {
        const promisesStopData = arrID.map(id => {
            return this.controller.engineController.getEngineStopData(id);
        });

        this.setIsLoadingButtons(arrID, BUTTONS.STOP, true);

        await Promise.all(promisesStopData);

        this.setIsLoadingButtons(arrID, BUTTONS.STOP, false);
        this.stopArrayRace(arrID);
        this.pagination.toggleVisiblePagination(false);
    };

    handleRemoveCar = async (id: number) => {
        await this.controller.garageController.deleteCar(id);
        await this.controller.winnersController.deleteWinner(id);
        await this.updateGarage();
        this.controller.garageController.setSelectedCar(null);
    };

    handleSelectCar = (id: number) => {
        const carsCurrentPage = this.root.querySelectorAll(".garage__item");

        if (this.controller.garageController.getSelectedCar()?.id !== id) {
            this.controller.garageController.setSelectedCar(id);
            this.updateForm();
            carsCurrentPage.forEach(car => {
                if (+car.id === +id) {
                    car.classList.add("garage__item-active");
                }
                else {
                    car.classList.remove("garage__item-active");
                }
            });
        }
        else {
            carsCurrentPage.forEach(car => car.classList.remove("garage__item-active"));
            this.controller.garageController.setSelectedCar(null);
            this.updateForm();
        }
    };
    updateGarage = async () => {
        this.showPreloader(true);

        const currentPage = this.controller.garageController.getCurrentPageGarage();
        const cars = await this.controller.garageController.getCars(currentPage);
        const total = this.controller.garageController.getTotalCount();

        this.update(total, cars, currentPage);

        this.showPreloader(false);
    };

    showPreloader(isLoading: boolean) {
        if (isLoading) {
            console.log("Загрузка");
        }
        else {
            console.log("Загрузка завершена");
        }
    }

    setCurrentPage = async (page: number) => {
        sessionStorage.setItem("pageGarage", String(page));
        this.controller.garageController.setCurrentPageGarage(page);

        const currentPage = this.controller.garageController.getCurrentPageGarage();

        await this.controller.garageController.getCars(currentPage);
        await this.updateGarage();
        await this.updateForm();
    };

    handleStartRace = async () => {
        if (!this.controller.garageController.getIsRace()) {
            this.controller.garageController.setIsRace(true);
            this.updateForm();

            const carsId = this.garageItems.items.map(car => car.carInfo.id);

            await this.handleStartCar(carsId);

            this.pagination.toggleVisiblePagination(true);
        }
    };

    handleResetRace = async () => {
        const carsId = this.garageItems.items.map(car => car.carInfo.id);

        await this.handleStopCar(carsId);
        this.finishedCars = 0;
        this.controller.garageController.setIsRace(false);
        this.updateForm();

        await this.updateGarage();
    };

}

export default Garage;
