import { Cordinates } from '../models/cordinates.model';

export class Puzzle {
    private puzzle: HTMLElement;

    constructor(public value: number, private size: number, public x: number, public y: number, private image: string) {
        this.createPuzzle();
    }

    createPuzzle(): void {
        this.puzzle = document.createElement('div');
        this.puzzle.style.width = this.size + 'px';
        this.puzzle.style.height = this.size + 'px';
        this.puzzle.textContent = this.value.toString();
        this.puzzle.dataset.value = this.value.toString();

        this.puzzle.style.top = `${this.x * this.size}px`;
        this.puzzle.style.left = `${this.y * this.size}px`;
        this.puzzle.classList.add('puzzle');

        this.puzzle.style.backgroundImage = `url(${this.image})`;
        this.puzzle.style.backgroundPositionX = `-${this.y * this.size}px`;
        this.puzzle.style.backgroundPositionY = `-${this.x * this.size}px`;

        this.updatePosition({ x: this.x, y: this.y });
    }

    updatePosition(newCordinates: Cordinates): void {
        this.x = newCordinates.x;
        this.y = newCordinates.y;
    }

    getPuzzle(): HTMLElement {
        return this.puzzle;
    }
}
