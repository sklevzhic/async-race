import "./index.scss";
import type { Winner } from "../../../types/Winner";
import generateCar from "../car";
import type Controller from "../../controller";
import { Sort } from "../../../types/Sort";
import type { Order } from "../../../types/Order";

const TABLE_HEADERS = {
    CAR: "Car",
    NAME: "Name",
    WINS: "Wins",
    BEST_TIME: "Best time",
    ID: "ID",
};

class Winners {
    root: HTMLElement;
    winners: Winner[];
    startIndex: number;
    activeSort: Sort;
    controller: Controller;
    activeOrder: Order;
    getWinners: () => void;

    constructor(controller: Controller, getWinners: () => void) {
        this.root = document.createElement("div");
        this.winners = [];
        this.startIndex = 0;
        this._enableHandler();
        this.controller = controller;
        this.activeSort = this.controller.winnersController.getSort();
        this.activeOrder = this.controller.winnersController.getOrder();
        this.getWinners = getWinners;
    }

    render(): HTMLElement {
        this.root.innerHTML = `<div class="winners">
            <table class="winners__table">
                  <thead>
                        <tr class="thead">
                            <th scope="col">${TABLE_HEADERS.ID} </th>
                            <th scope="col">${TABLE_HEADERS.CAR}</th>
                            <th scope="col">${TABLE_HEADERS.NAME}</th>
                            <th scope="col" data-sort="DESl" class="active">${TABLE_HEADERS.WINS}</th>
                            <th scope="col" class="active">${TABLE_HEADERS.BEST_TIME}</th>
                        </tr>
                    </thead>
                    <tbody>

                    </tbody>
            </table>
        </div>`;

        return this.root;
    }

    fillTableBody = () => {
        const tBody = <HTMLElement> this.root.querySelector("tbody");

        tBody.innerHTML = "";
        this.winners.forEach((car, i) => {
            tBody.innerHTML += `
                <tr>
                    <td data-label="car">${this.startIndex + i + 1}</td>
                    <td data-label="car">${generateCar(car.color)}</td>
                    <td data-label="name">${car.name}</td>
                    <td data-label="wins">${car.wins}</td>
                    <td data-label="time">${car.time} </td>
                </tr>
        `;
        });
    };

    update(winners: Winner[], startIndex: number) {
        this.winners = winners;
        this.startIndex = startIndex;
        this.fillTableBody();
    }

    _enableHandler() {
        this.root.addEventListener("click", (e) => {
            if (e.target instanceof HTMLElement && e.target.nodeName === "TH") {
                if (e.target.textContent === TABLE_HEADERS.WINS) {
                    this.controller.winnersController.setOrder();
                    this.controller.winnersController.setSort(Sort.wins);
                    this.getWinners();
                }
                if (e.target.textContent === TABLE_HEADERS.BEST_TIME) {
                    this.controller.winnersController.setOrder();
                    this.controller.winnersController.setSort(Sort.time);
                    this.getWinners();
                }
            }
        });
    }

}

export default Winners;
