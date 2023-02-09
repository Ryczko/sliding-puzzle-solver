import { Board } from '../components/Board';
import { Solver } from '../components/Solver';
import { BoardView } from './BoardView';

export class ButtonsView {
    buttonsPanel: HTMLElement;
    wrapper: HTMLElement;

    constructor(private boardView: BoardView, private sovler: Solver, private board: Board) {
        this.wrapper = document.querySelector('.wrapper');

        this.createButtonsPanel();
        this.createSolveButton();
        this.createShuffleButton();
        this.createShowHelpersButton();
    }

    createShuffleButton(): void {
        const btn = document.createElement('button');
        btn.addEventListener('click', () => {
            if (this.boardView.isSolving) return;

            this.board.shuffleBoard();
            this.boardView.generetePuzzles();
        });
        btn.textContent = 'shuffle';
        this.buttonsPanel.appendChild(btn);
    }

    createButtonsPanel(): void {
        this.buttonsPanel = document.createElement('div');
        this.buttonsPanel.id = 'buttons';
        this.buttonsPanel.classList.add('buttons-panel');
        this.wrapper.appendChild(this.buttonsPanel);
    }

    createSolveButton(): void {
        const btn = document.createElement('button');
        btn.addEventListener('click', async () => {
            if (this.boardView.isSolving) return;
            this.boardView.isSolving = true;
            const movesIndexes = await this.sovler.solve();

            this.boardView.animateSolving(movesIndexes);
        });
        btn.textContent = 'solve';
        this.buttonsPanel.appendChild(btn);
    }

    createShowHelpersButton(): void {
        const btn = document.createElement('button');
        btn.addEventListener('click', () => {
            if (!this.boardView.showHelpers) {
                btn.textContent = 'hide helpers';
            } else {
                btn.textContent = 'show helpers';
            }

            this.boardView.showHelpers = !this.boardView.showHelpers;
            this.boardView.generetePuzzles();
        });
        btn.textContent = 'show helpers';
        this.buttonsPanel.appendChild(btn);
    }
}
