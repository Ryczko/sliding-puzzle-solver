export function getColumnNumber(index: number | string, gridSize: number): number {
    return +index % gridSize;
}
