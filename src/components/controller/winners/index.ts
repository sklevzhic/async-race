import Model from "../../model";
import {WinnersTotal} from "../../../types/WinnersTotal";
import {Sort} from "../../../types/Sort";
import {Order} from "../../../types/Order";

class WinnersController {
    model: Model;

    constructor() {
        this.model = new Model()
    }

    async setWinner(id: number, time: number) {
        await this.model.winners.setWinner(id, time)
    }

    async fetchWinners() {
        return this.model.winners.fetchWinners()
    }

    getWinners = async (): Promise<WinnersTotal> => {
        const winners = this.model.winners.getWinners()

        const winnersCopy = []
        for (let i = 0; i <= winners.winners.length - 1; i++) {
            const {name, color} = await this.model.garage.getCarInfo(winners.winners[i].id)
            winnersCopy.push({...winners.winners[i], name, color})
        }
        return {winners: winnersCopy, count: winners.count}
    }
    deleteWinner = async (id: number) => {
        await this.model.winners.removeWinner(id)
    }

    setCurrentPage(page: number) {
        this.model.winners.setCurrentPage(page)
    }

    getElementsPerPage(): number {
        return this.model.winners.getElementsPerPage()
    }

    getCurrentPage(): number {
        return this.model.winners.getCurrentPage()
    }

    setSort(mode: Sort) {
        this.model.winners.setSort(mode)
    }

    getSort(): Sort {
        return this.model.winners.getSort()
    }

    setOrder() {
        this.model.winners.setOrder()
    }

    getOrder(): Order {
        return this.model.winners.getOrder()
    }

}


export default WinnersController;