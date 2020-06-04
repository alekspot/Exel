const CODES = {
    A: 65,
    Z: 90
}

function toCell(row) {
    return function(cell, col) {
        return `
            <div 
                class="cell"
                contenteditable
                data-type="cell"
                data-id="${row}:${col}" 
                data-col="${col}"
            ></div>`
    }
}

function toColumn(col, index) {
    return `<div class="column" data-col="${index}" data-type="resizable">
    ${col}
    <div class="col-resize" data-resize="col"></div>
    </div>`
}

function createRow(index, cells) {
    const resizer = index && '<div class="row-resize" data-resize="row"></div>'
    return `
    <div class="row" data-type="resizable">
        <div class="row-info">
        ${index ? index : ''}
        ${resizer}
        </div>
        <div class="row-data" data-index="${index - 1}">${cells}</div>  
    </div>
    `
}

function toChar(el, index) {
    return String.fromCharCode(CODES.A + index)
}

export function createTable(rowsCount = 15) {
    const colsCount = CODES.Z - CODES.A + 1;
    const rows = [];

    const cols = new Array(colsCount)
        .fill('')
        .map(toChar)
        .map(toColumn)
        .join('')
    rows.push(createRow('', cols))

    for (let row = 0; row < rowsCount; row++) {
        const cells = new Array(colsCount)
            .fill('')
            .map(toCell(row))
            .join('')

        rows.push(createRow(row + 1, cells));
    }
    return rows.join('')
}
