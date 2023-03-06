import "./index.scss"
import generateCar from "../car";
import {CarInterface} from "../../../types/Car";

class Road {
    root: HTMLElement;
    carImage: HTMLElement;

    constructor() {
        this.root = document.createElement("div")
        this.carImage = document.createElement("div")

    }

    render(carInfo: CarInterface): HTMLElement {
        this.root.classList.add("road")
        this.root.id = String(carInfo.id)

        this.root.innerHTML = `
                <div class="road__car">
                    <h4 class="road__car-name">${carInfo.name}</h4>
                    <div class="road__car-image">
                        
                    </div>
                </div>
                <div class="road__line">
                        
                </div>
        `
        const carWrapper: HTMLDivElement | null = this.root.querySelector(".road__car-image")
        this.carImage.innerHTML = generateCar(carInfo.color)
        carWrapper.append(this.carImage)

        return this.root
    }


}

export default Road