import {Winner} from "../../../types/Winner";
import {DataFetchWinners} from "../../../types/DataFetchWinners";
import {winnerApi} from "../../../api";
import {WinnersTotal} from "../../../types/WinnersTotal";
import winnerAPI from "../../../api/winnerAPI";
import {Sort} from "../../../types/Sort";
import {Order} from "../../../types/Order";

class ModelWinners {
    winners: Winner[];
    winnersCount: number;
    currentPage: number;
    limit: number;
    sort: Sort
    order: Order

    constructor() {
        this.winners = []
        this.winnersCount = 0
        this.currentPage = 1;
        this.limit = 10;
        this.sort = Sort.wins;
        this.order = Order.ASC;
    }

    setCurrentPage(page: number) {
        this.currentPage = page
    }

    getCurrentPage(): number {
        return this.currentPage
    }

    getElementsPerPage(): number {
        return this.limit
    }

    setSort(sort: Sort) {
        this.sort = sort
    }

    getSort(): Sort {
        return this.sort
    }

    setOrder() {
        this.order = this.getNewOrder(this.order)
    }

    getNewOrder(order: Order): Order {
        if (order === Order.ASC) {
            return Order.DESC
        }
        if (order === Order.DESC) {
            return Order.ASC
        }
    }

    getOrder(): Order {
        return this.order
    }

    async fetchWinners() {
        const data: DataFetchWinners = {
            page: this.currentPage,
            limit: this.limit,
            sort: this.sort,
            order: this.order
        }
        const {winners, count} = await winnerApi.getWinners(data);
        this.winners = winners;
        this.winnersCount = count
    }

    getWinners(): WinnersTotal {
        return {winners: this.winners, count: this.winnersCount}
    }

    async setWinner(id: number, time: number) {
        let winnerInfo = await winnerApi.getWinnerInfo(id)

        if (winnerInfo.id) {
            winnerInfo = {
                ...winnerInfo,
                time: time < winnerInfo.time ? time : winnerInfo.time,
                wins: +winnerInfo.wins + 1,
            }
            return await winnerAPI.updateWinner(winnerInfo)
        } else {
            winnerInfo = {
                id, time, wins: 1,
            }
            return await winnerAPI.createWinner(winnerInfo)
        }
    }

    async removeWinner(id: number) {
        await winnerApi.removeWinner(id);
    }

}

export default ModelWinners