export function shouldResize(event) {
    return event.target.dataset.resize
}

export function isCell(event) {
    return event.target.dataset.type === 'cell'
}

export function matrix($lastTarget, $firstTarget) {
    const selectedColCount = Math.abs($firstTarget.id(true).col - $lastTarget.id(true).col) + 1
    const selectedRowCount = Math.abs($firstTarget.id(true).row - $lastTarget.id(true).row) + 1
    const minRowIndex = Math.min(Number($firstTarget.id(true).row), Number($lastTarget.id(true).row))
    const minColIndex = Math.min(Number($firstTarget.id(true).col), Number($lastTarget.id(true).col))

    const rowsWithSelected = new Array(selectedRowCount).fill(0).map((item, index) => minRowIndex + index)
    const colsWithSelected = new Array(selectedColCount).fill(0).map((item, index) => minColIndex + index)

    return rowsWithSelected.reduce((group, rowId) => [...group, ...colsWithSelected.map(colId => `${rowId}:${colId}`)], [])
}

export function nextSelector(key, { row, col }, rowsCount, colsCount) {
    const MIN_VALUE = 0
    switch (key) {
    case 'Enter':
    case 'ArrowDown':
        row = row < rowsCount - 1 ? row + 1 : row
        break
    case 'Tab':
    case 'ArrowRight':
        col = col < colsCount - 1 ? col + 1 : col
        break
    case 'ArrowLeft':
        col = col - 1 < MIN_VALUE ? MIN_VALUE : col - 1
        break
    case 'ArrowUp':
        row = row - 1 < MIN_VALUE ? MIN_VALUE : row - 1
        break
    }
    return `[data-id="${row}:${col}"]`
}
