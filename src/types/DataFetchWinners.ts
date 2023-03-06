import {Sort} from "./Sort";
import {Order} from "./Order";

export interface DataFetchWinners {
    page: number,
    limit: number,
    sort: Sort,
    order: Order
}