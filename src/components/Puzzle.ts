import { Cordinates } from '../models/cordinates.model';

export class Puzzle {
    constructor(public value: number, public x: number, public y: number) {}

    updatePosition(newCordinates: Cordinates): void {
        this.x = newCordinates.x;
        this.y = newCordinates.y;
    }
}
