import { BASE_URL } from "..";
import type { Winner } from "../../types/Winner";
import type { DataFetchWinners } from "../../types/DataFetchWinners";

class WinnerAPI {

    async getWinners({ page, limit, sort, order }: DataFetchWinners): Promise<{ winners: Winner[], count: number }> {
        const response = await fetch(`${BASE_URL}/winners?_page=${page}&_limit=${limit}&_sort=${sort}&_order=${order} `, {
            headers: {
                "X-Total-Count": "4",
            },
        });
        const winners = await response.json() as Winner[];
        const totalCount = response.headers.get("X-Total-Count");

        return { winners, count: totalCount ? +totalCount : 0 };
    }

    async getWinnerInfo(id: number): Promise<Winner> {
        const response = await fetch(`${BASE_URL}/winners/${id}`);
        const STATUS_CODE = 200;

        return response.status === STATUS_CODE ? response.json() : {};
    }

    async createWinner(winner: Winner) {
        const response = await fetch(`${BASE_URL}/winners`, {
            method: 'POST',
            body: JSON.stringify(winner),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const newWinner = await response.json();

        return newWinner;
    }

    async updateWinner(winner: Winner) {
        const response = await fetch(`${BASE_URL}/winners/${winner.id}`, {
            method: "PUT",
            body: JSON.stringify({ wins: winner.wins, time: winner.time }),
            headers: {
                "Content-Type": "application/json",
            },
        });
        const newWinner = await response.json();

        return newWinner;
    }

    async removeWinner(id: number) {
        const { status } = await fetch(`${BASE_URL}/winners/${id}`);
        const STATUS_CODE = 200;

        if (status === STATUS_CODE) {
            const response = await fetch(`${BASE_URL}/winners/${id}`, {
                method: "DELETE",
            });

            await response.json();
        }
    }

}

const winnerApi = new WinnerAPI();

export default winnerApi;
