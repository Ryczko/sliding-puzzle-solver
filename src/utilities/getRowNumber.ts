export function getRowNumber(index: number | string, gridSize: number): number {
    return Math.floor(+index / gridSize);
}
