export class PuzzleView {
    public puzzle: HTMLElement;

    constructor(
        public value: number,
        private size: number,
        public x: number,
        public y: number,
        public imageX: number,
        public imageY: number,
        private image: string,
        public showHelpers: boolean = false
    ) {
        this.createPuzzle();
    }

    createPuzzle(): void {
        this.puzzle = document.createElement('div');
        this.puzzle.style.width = this.size + 'px';
        this.puzzle.style.height = this.size + 'px';

        if (this.value && this.showHelpers) this.puzzle.textContent = this.value.toString();

        this.puzzle.dataset.value = this.value.toString();

        this.puzzle.style.top = `${this.x * this.size}px`;
        this.puzzle.style.left = `${this.y * this.size}px`;
        this.puzzle.classList.add('puzzle');

        this.puzzle.style.backgroundImage = `url(${this.image})`;
        this.puzzle.style.backgroundPositionX = `-${this.imageY * this.size}px`;
        this.puzzle.style.backgroundPositionY = `-${this.imageX * this.size}px`;
    }
}
