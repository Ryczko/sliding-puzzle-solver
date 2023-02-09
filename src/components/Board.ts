import { getColumnNumber } from '../utilities/getColumnNumber';
import { getRowNumber } from '../utilities/getRowNumber';
import { Puzzle } from './Puzzle';

export class Board {
    gameState: Puzzle[] = [];
    emptyFieldIndex: number;

    constructor(public gridSize = 3, gameStateToLoad?: Puzzle[]) {
        if (gameStateToLoad) {
            this.gameState = gameStateToLoad.map((puzzle) => new Puzzle(puzzle.value, puzzle.x, puzzle.y));
            this.emptyFieldIndex = this.gameState.findIndex((puzzle) => puzzle.value === 0);
            return;
        }
        this.generetePuzzles();
        this.shuffleBoard();
    }

    shuffleBoard(numberOfShuffles = 15 * this.gridSize * this.gridSize): void {
        for (let i = 0; i < numberOfShuffles; i++) {
            const options = this.getPossibleMoves();

            const randomMove = Math.floor(Math.random() * options.length);

            this.swapPuzzle(this.emptyFieldIndex, options[randomMove]);
            this.emptyFieldIndex = options[randomMove];
        }
    }

    getPossibleMoves(): number[] {
        const emptyRow = getRowNumber(this.emptyFieldIndex, this.gridSize);
        const emptyColumn = getColumnNumber(this.emptyFieldIndex, this.gridSize);
        const options = [];

        if (getRowNumber(this.emptyFieldIndex - 1, this.gridSize) === emptyRow) options.push(this.emptyFieldIndex - 1);
        if (getRowNumber(this.emptyFieldIndex + 1, this.gridSize) === emptyRow) options.push(this.emptyFieldIndex + 1);
        if (
            this.emptyFieldIndex + this.gridSize < this.gridSize * this.gridSize &&
            getColumnNumber(this.emptyFieldIndex + this.gridSize, this.gridSize) === emptyColumn
        )
            options.push(this.emptyFieldIndex + this.gridSize);
        if (
            this.emptyFieldIndex - this.gridSize >= 0 &&
            getColumnNumber(this.emptyFieldIndex - this.gridSize, this.gridSize) === emptyColumn
        )
            options.push(this.emptyFieldIndex - this.gridSize);
        return options;
    }

    generetePuzzles(): void {
        for (let i = 1; i < this.gridSize * this.gridSize; i++) {
            const row = getRowNumber(i - 1, this.gridSize);
            const column = getColumnNumber(i - 1, this.gridSize);

            const newPuzzle = new Puzzle(i, row, column);
            this.gameState.push(newPuzzle);
        }

        const newPuzzle = new Puzzle(0, this.gridSize - 1, this.gridSize - 1);
        this.gameState.push(newPuzzle);
        this.emptyFieldIndex = this.gridSize * this.gridSize - 1;
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
            x: getRowNumber(index1, this.gridSize),
            y: getColumnNumber(index1, this.gridSize)
        });
        this.gameState[index2].updatePosition({
            x: getRowNumber(index2, this.gridSize),
            y: getColumnNumber(index2, this.gridSize)
        });
    }
}
