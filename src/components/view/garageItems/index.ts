import CarItem from "../garageItem/inedex"
import {CarInterface} from "../../../types/Car";
import {EngineData} from "../../../types/EngineData";
import {BUTTONS} from "../carActions";

class GarageItems {
    root: HTMLElement;
    items: CarItem[];

    constructor() {
        this.root = document.createElement("div")
        this.root.classList.add("garage__items")
        this.items = []
    }

    render(cars?: CarInterface[]) {
        this.root.innerHTML = ""
        if (cars?.length) {
            this.items = cars.map(car => new CarItem(car))
            this.createItems()
        } else {
            this.root.innerHTML = `<div class="empty"> Ничего нет!</div>`
        }

        return this.root
    }


    createItems() {
        this.items.forEach((car) => {
            const carHTML = car.render()
            this.root.append(carHTML)
        })
    }

    startCar = (id: number, {velocity, distance}: EngineData) => {
        this.getActiveCar(id).startCar({velocity, distance})
    }

    stopCar = (id: number) => {
        this.getActiveCar(id).stopCar()
    }


    breakCar = (id: number) => {

        this.getActiveCar(id).breakCar()
    }

    highlightCar = (id: number, time: number) => {
        this.getActiveCar(id).highlightCar(time)
    }

    setIsLoading = (id: number, button: BUTTONS.START | BUTTONS.STOP, isLoading: boolean) => {
        this.getActiveCar(id).setIsLoading(button, isLoading)
    }

    getActiveCar = (id: number) => {
        return this.items.filter(car => car.carInfo.id === id)[0]
    }

}

export default GarageItems

