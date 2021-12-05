import { Board } from '../components/Board';
import { getColumnNumber } from '../utilities/getColumnNumber';
import { getRowNumber } from '../utilities/getRowNumber';
import { PuzzleView } from './PuzzleView';

export class BoardView {
    puzzleBox: HTMLElement;

    constructor(private board: Board, private size: number, private imageSrc: string) {
        this.createBoard();
        this.generetePuzzles();
        this.puzzleBox.addEventListener('click', (e) => this.handleUserClick(e));
    }

    generetePuzzles(): void {
        this.board.gameState.forEach((puzzle) => {
            const { x, y, value } = puzzle;

            const imageX = getRowNumber(value - 1, this.board.columnsCount);
            const imageY = getColumnNumber(value - 1, this.board.columnsCount);

            const puzzleView = new PuzzleView(
                value,
                this.size / this.board.columnsCount,
                x,
                y,
                imageX,
                imageY,
                this.imageSrc
            );

            this.puzzleBox.appendChild(puzzleView.puzzle);
        });
    }

    createBoard(): void {
        this.puzzleBox = document.createElement('div');
        this.puzzleBox.id = 'board';
        this.puzzleBox.style.height = `${this.size}px`;
        this.puzzleBox.style.width = `${this.size}px`;
        document.body.appendChild(this.puzzleBox);
    }

    handleUserClick(event: Event): void {
        const target = event.target as HTMLElement;
        if (!target.classList.contains('puzzle')) return;
        const index = this.board.gameState.map((el) => el.value).indexOf(+target.dataset.value);

        if (this.board.getPossibleMoves().includes(index)) {
            const element1 = this.puzzleBox.querySelector(
                `[data-value='${this.board.gameState[index].value}'`
            ) as HTMLElement;
            const element2 = this.puzzleBox.querySelector(`[data-value='${0}'`) as HTMLElement;

            this.moveElement(element1, element2);
            this.board.makeMove(index);
        }
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
