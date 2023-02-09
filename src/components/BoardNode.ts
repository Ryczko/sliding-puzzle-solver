import { getColumnNumber } from '../utilities/getColumnNumber';
import { getRowNumber } from '../utilities/getRowNumber';
import { Board } from './Board';
import { cloneDeep } from 'lodash';

export class BoardNode {
    public g = 0;
    constructor(public parent: BoardNode | null, public board: Board, public moveIndex: number) {
        if (this.parent) this.g = parent.g + 1;
    }

    clone(): BoardNode {
        return cloneDeep(this);
    }

    score(): number {
        return this.getHeuristictValue() + this.g;
    }

    getStringState(): string {
        let result = '';
        this.board.gameState.forEach((state) => {
            result += state.value;
        });
        return result;
    }

    getPath(): number[] {
        let next = this.parent;
        const path = [];
        if (this.moveIndex !== -1) {
            path.push(this.moveIndex);
        }
        while (next && next.moveIndex !== -1) {
            path.push(next.moveIndex);
            next = next.parent;
        }

        return path.reverse();
    }

    getHeuristictValue(): number {
        let hValue = 0;
        for (let i = 0; i < this.board.gameState.length; i++) {
            if (!this.board.gameState[i].value) continue;

            const correctPlaceRow = getRowNumber(this.board.gameState[i].value - 1, this.board.gridSize);
            const correctPlaceColumn = getColumnNumber(this.board.gameState[i].value - 1, this.board.gridSize);
            hValue +=
                Math.abs(correctPlaceRow - this.board.gameState[i].x) +
                Math.abs(correctPlaceColumn - this.board.gameState[i].y);
        }
        return hValue;
    }
}
