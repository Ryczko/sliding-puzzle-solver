import { Board } from './Board';
import { BoardNode } from './BoardNode';
import { PriorityQueue } from './PriorityQueue';

export class Solver {
    wrapper = document.querySelector('.wrapper');
    constructor(private board: Board) {
        this.wrapper = document.querySelector('.wrapper');
    }

    solve(): number[] {
        const queue = new PriorityQueue<BoardNode>();
        const startNode = new BoardNode(null, this.board, -1);
        queue.enqueue(startNode, startNode.score());
        const visited = new Set();

        while (queue.values.length > 0) {
            const current = queue.dequeue();

            if (current.val.getHeuristictValue() === 0) {
                return current.val.getPath();
            }
            const options = current.val.board.getPossibleMoves();

            for (const option of options) {
                const newState = current.val.clone();
                newState.board.makeMove(option);

                if (visited.has(newState.getStringState())) {
                    continue;
                }

                newState.parent = current.val;
                newState.moveIndex = option;

                queue.enqueue(newState, newState.score());
                visited.add(newState.getStringState());
            }
        }
    }
}
