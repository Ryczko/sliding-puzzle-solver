import { Puzzle } from './Puzzle';

export class Board {
    puzzleBox: HTMLElement;
    gameState: Puzzle[] = [];
    emptyFieldIndex: number;

    constructor(private size: number, private rowsCount = 3, private columnsCount = 3, private imageSrc: string) {
        this.createBoard();
        this.generetePuzzles();
        this.puzzleBox.addEventListener('click', (e) => this.handleUserClick(e));
        this.emptyFieldIndex = this.rowsCount * this.columnsCount - 1;
        this.shuffleBoard();
    }

    createBoard(): void {
        this.puzzleBox = document.createElement('div');
        this.puzzleBox.id = 'board';
        this.puzzleBox.style.height = `${this.size}px`;
        this.puzzleBox.style.width = `${this.size}px`;
        document.body.appendChild(this.puzzleBox);
    }

    shuffleBoard(numberOfShuffles = 15 * this.rowsCount * this.columnsCount): void {
        for (let i = 0; i < numberOfShuffles; i++) {
            const emptyRow = this.getRowNumber(this.emptyFieldIndex);
            const emptyColumn = this.getColumnNumber(this.emptyFieldIndex);
            const options = [];

            if (this.getRowNumber(this.emptyFieldIndex - 1) === emptyRow) options.push(this.emptyFieldIndex - 1);
            if (this.getRowNumber(this.emptyFieldIndex + 1) === emptyRow) options.push(this.emptyFieldIndex + 1);
            if (
                this.emptyFieldIndex + this.columnsCount < this.columnsCount * this.rowsCount &&
                this.getColumnNumber(this.emptyFieldIndex + this.columnsCount) === emptyColumn
            )
                options.push(this.emptyFieldIndex + this.columnsCount);
            if (
                this.emptyFieldIndex - this.columnsCount >= 0 &&
                this.getColumnNumber(this.emptyFieldIndex - this.columnsCount) === emptyColumn
            )
                options.push(this.emptyFieldIndex - this.columnsCount);

            const randomMove = Math.floor(Math.random() * options.length);

            this.moveElement(
                this.gameState[this.emptyFieldIndex].getPuzzle(),
                this.gameState[options[randomMove]].getPuzzle()
            );
            this.swapPuzzle(this.emptyFieldIndex, options[randomMove]);
            this.emptyFieldIndex = options[randomMove];
        }
    }

    generetePuzzles(): void {
        for (let i = 1; i < this.rowsCount * this.columnsCount; i++) {
            const row = this.getRowNumber(i - 1);
            const column = this.getColumnNumber(i - 1);

            const newPuzzle = new Puzzle(i, this.size / this.columnsCount, row, column, this.imageSrc);
            this.gameState.push(newPuzzle);
            this.puzzleBox.appendChild(newPuzzle.getPuzzle());
        }

        const newPuzzle = new Puzzle(
            0,
            this.size / this.columnsCount,
            this.rowsCount - 1,
            this.columnsCount - 1,
            this.imageSrc
        );
        this.gameState.push(newPuzzle);
        this.puzzleBox.appendChild(newPuzzle.getPuzzle());
    }

    handleUserClick(event: Event): void {
        const target = event.target as HTMLElement;
        if (!target.classList.contains('puzzle')) return;
        let index;

        for (let i = 0; i < this.gameState.length; i++) {
            if (this.gameState[i].getPuzzle() === target) {
                index = i;
                break;
            }
        }

        const row = this.gameState[index].x;
        const column = this.gameState[index].y;

        const emptyFieldRow = this.getRowNumber(this.emptyFieldIndex);
        const emptyFieldColumn = this.getColumnNumber(this.emptyFieldIndex);

        if (
            (row === emptyFieldRow && column + 1 === emptyFieldColumn) ||
            (row === emptyFieldRow && column - 1 === emptyFieldColumn) ||
            (column === emptyFieldColumn && row + 1 === emptyFieldRow) ||
            (column === emptyFieldColumn && row - 1 === emptyFieldRow)
        ) {
            this.moveElement(this.gameState[this.emptyFieldIndex].getPuzzle(), this.gameState[index].getPuzzle());
            this.swapPuzzle(this.emptyFieldIndex, index);
            this.emptyFieldIndex = index;
        }
    }

    swapPuzzle(index1: number, index2: number): void {
        const tempPuzzle = this.gameState[index1];
        this.gameState[index1] = this.gameState[index2];
        this.gameState[index2] = tempPuzzle;

        this.gameState[index1].updatePosition({ x: this.getRowNumber(index1), y: this.getColumnNumber(index1) });
        this.gameState[index2].updatePosition({ x: this.getRowNumber(index2), y: this.getColumnNumber(index2) });
    }

    getRowNumber(index: number | string): number {
        return Math.floor(+index / this.columnsCount);
    }

    getColumnNumber(index: number | string): number {
        return +index % this.columnsCount;
    }

    moveElement(element1: HTMLElement, element2: HTMLElement): void {
        const tempTop = element1.style.top;
        const tempLeft = element1.style.left;

        element1.style.top = element2.style.top;
        element1.style.left = element2.style.left;

        element2.style.top = tempTop;
        element2.style.left = tempLeft;
    }
}
