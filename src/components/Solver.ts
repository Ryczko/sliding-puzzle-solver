import { Board } from './Board';
const worker = new Worker(new URL('../utilities/solverWorker.ts', import.meta.url));

export class Solver {
    constructor(private board: Board) {}

    solve(): Promise<number[]> {
        return new Promise((resolve) => {
            worker.postMessage(this.board.gameState);

            worker.onmessage = (message) => {
                const movesIndexes = message.data;
                resolve(movesIndexes);
            };
        });
    }
}
