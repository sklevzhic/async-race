export interface CarInterface {
    name: string;
    color: string;
    id: number;
}

export type NewCarInterface = Pick<CarInterface, "name" | "color">;

export interface CarFormInterface {
    id?: number;
    name: string;
    color: string;
    method?: string;
}

export interface CarInterface {
    name: string;
    color: string;
    id: number;
}
