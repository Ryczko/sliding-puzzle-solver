export function getRowNumber(index: number | string, columnsCount: number): number {
    return Math.floor(+index / columnsCount);
}
