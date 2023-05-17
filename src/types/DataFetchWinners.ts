import type { Sort } from "./Sort";
import type { Order } from "./Order";

export interface DataFetchWinners {
    page: number;
    limit: number;
    sort: Sort;
    order: Order;
}
