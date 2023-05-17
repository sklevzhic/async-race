import "./index.scss";
import type { CarInterface } from "../../../types/Car";
import Road from "../road";
import type { BUTTONS } from "../carActions";
import CarActions from "../carActions";
import type { EngineData } from "../../../types/EngineData";

class CarItem {
    carInfo: CarInterface;
    road: Road;
    carActions: CarActions;
    root: HTMLElement;
    currentPosition: number;
    stopped: boolean;
    constructor(car: CarInterface) {
        this.root = document.createElement("div");
        this.carInfo = car;
        this.carActions = new CarActions();
        this.road = new Road();
        this.currentPosition = 0;
        this.stopped = false;
    }

    render(): HTMLElement {
        this.root.classList.add("garage__item");
        this.root.classList.add("winner");
        this.root.id = String(this.carInfo.id);

        this.root.append(this.carActions.render());
        this.root.append(this.road.render(this.carInfo));

        return this.root;
    }

    animateCar = (distance: number, duration: number) => {
        let startTime: number | null = null;
        const animate = (timestamp: number) => {
            if (!this.stopped) {
                if (!startTime) {
                    startTime = timestamp;
                }

                const runtime = timestamp - startTime;
                const relativeProgress = runtime / duration;

                this.currentPosition = distance * Math.min(relativeProgress, 1);

                this.road.carImage.style.transform = `translateX(${this.currentPosition}px)`;

                if (runtime < duration) {
                    requestAnimationFrame(animate);
                }
            }
        };

        requestAnimationFrame(animate);
    };

    startCar({ velocity, distance }: EngineData) {
        this.stopped = false;
        this.road.carImage.classList.remove("broken");
        this.carActions.buttonStart.classList.add("disable");
        this.carActions.buttonEnd.classList.remove("disable");

        const widthCar = 80;
        const line = <HTMLElement>document.querySelector(".road__line");
        const width = line.offsetWidth + widthCar;
        const timeAnimation = Math.round(distance / velocity);

        this.stopped = false;
        this.animateCar(width, timeAnimation);
    }

    stopCar() {
        this.carActions.buttonStart.classList.remove("disable");
        this.carActions.buttonEnd.classList.add("disable");
        this.road.carImage.classList.remove("broken");
        console.log(this.road.carImage.classList);
        this.stopped = true;
        this.currentPosition = 0;
        this.road.carImage.style.transform = `translateX(${this.currentPosition}px)`;
    }

    breakCar() {
        this.stopped = true;
        this.road.carImage.classList.add("broken");
    }

    highlightCar(time: number) {
        const template = document.createElement("div");

        template.innerHTML = `<div class="garage__item-winner">
            <div class="text">${this.carInfo.name} </div>
            <div class="time">${time} sec.</div>
        </div>`;
        this.root.append(template);
    }

    setIsLoading(button: BUTTONS.START | BUTTONS.STOP, isLoading: boolean) {
        this.carActions.setIsLoading(button, isLoading);
    }

}

export default CarItem;
