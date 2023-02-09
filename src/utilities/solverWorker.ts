import { Board } from '../components/Board';
import { BoardNode } from '../components/BoardNode';
import { PriorityQueue } from '../components/PriorityQueue';
import { Puzzle } from '../components/Puzzle';

self.onmessage = function (message: MessageEvent<Puzzle[]>) {
    const puzzle = message.data;
    const gridSize = Math.sqrt(puzzle.length);
    const board = new Board(gridSize, puzzle);

    const queue = new PriorityQueue<BoardNode>();
    const startNode = new BoardNode(null, board, -1);
    queue.enqueue(startNode, startNode.score());
    const visited = new Set();

    while (queue.values.length > 0) {
        const current = queue.dequeue();

        if (current.val.getHeuristictValue() === 0) {
            return postMessage(current.val.getPath());
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
};
