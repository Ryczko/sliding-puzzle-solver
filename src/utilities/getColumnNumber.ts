export function getColumnNumber(index: number | string, columnsCount: number): number {
    return +index % columnsCount;
}
