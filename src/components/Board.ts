import { getColumnNumber } from '../utilities/getColumnNumber';
import { getRowNumber } from '../utilities/getRowNumber';
import { Puzzle } from './Puzzle';

export class Board {
    gameState: Puzzle[] = [];
    emptyFieldIndex: number;

    constructor(public rowsCount = 3, public columnsCount = 3) {
        this.generetePuzzles();
        this.shuffleBoard();
    }

    shuffleBoard(numberOfShuffles = 15 * this.rowsCount * this.columnsCount): void {
        for (let i = 0; i < numberOfShuffles; i++) {
            const options = this.getPossibleMoves();

            const randomMove = Math.floor(Math.random() * options.length);

            this.swapPuzzle(this.emptyFieldIndex, options[randomMove]);
            this.emptyFieldIndex = options[randomMove];
        }
    }

    getPossibleMoves(): number[] {
        const emptyRow = getRowNumber(this.emptyFieldIndex, this.columnsCount);
        const emptyColumn = getColumnNumber(this.emptyFieldIndex, this.columnsCount);
        const options = [];

        if (getRowNumber(this.emptyFieldIndex - 1, this.columnsCount) === emptyRow)
            options.push(this.emptyFieldIndex - 1);
        if (getRowNumber(this.emptyFieldIndex + 1, this.columnsCount) === emptyRow)
            options.push(this.emptyFieldIndex + 1);
        if (
            this.emptyFieldIndex + this.columnsCount < this.columnsCount * this.rowsCount &&
            getColumnNumber(this.emptyFieldIndex + this.columnsCount, this.columnsCount) === emptyColumn
        )
            options.push(this.emptyFieldIndex + this.columnsCount);
        if (
            this.emptyFieldIndex - this.columnsCount >= 0 &&
            getColumnNumber(this.emptyFieldIndex - this.columnsCount, this.columnsCount) === emptyColumn
        )
            options.push(this.emptyFieldIndex - this.columnsCount);
        return options;
    }

    generetePuzzles(): void {
        for (let i = 1; i < this.rowsCount * this.columnsCount; i++) {
            const row = getRowNumber(i - 1, this.columnsCount);
            const column = getColumnNumber(i - 1, this.columnsCount);

            const newPuzzle = new Puzzle(i, row, column);
            this.gameState.push(newPuzzle);
        }

        const newPuzzle = new Puzzle(0, this.rowsCount - 1, this.columnsCount - 1);
        this.gameState.push(newPuzzle);
        this.emptyFieldIndex = this.rowsCount * this.columnsCount - 1;
    }

    makeMove(index: number): void {
        if (this.isMovePossible(index)) {
            this.swapPuzzle(this.emptyFieldIndex, index);
            this.emptyFieldIndex = index;
        }
    }

    isMovePossible(index: number): boolean {
        const possibleOptions = this.getPossibleMoves();
        const moveIndex = possibleOptions.indexOf(index);
        return moveIndex !== -1;
    }

    swapPuzzle(index1: number, index2: number): void {
        const tempPuzzle = this.gameState[index1];
        this.gameState[index1] = this.gameState[index2];
        this.gameState[index2] = tempPuzzle;

        this.gameState[index1].updatePosition({
            x: getRowNumber(index1, this.columnsCount),
            y: getColumnNumber(index1, this.columnsCount)
        });
        this.gameState[index2].updatePosition({
            x: getRowNumber(index2, this.columnsCount),
            y: getColumnNumber(index2, this.columnsCount)
        });
    }
}
