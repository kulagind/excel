const CODES = {
  A: 65,
  Z: 90,
};

export function createTable(rowsCount = 33) {
  const colsCount = CODES.Z - CODES.A + 1;
  const rows = [];

  const headerCols = new Array(colsCount).fill('').map(toHeaderCol).join('');

  rows.push(createRow(headerCols));

  for (let i = 0; i < rowsCount; i++) {
    const emptyRow = new Array(colsCount)
        .fill('')
        .map(createCell(i))
        .join('');

    rows.push(createRow(emptyRow, i + 1));
  }

  return rows.join('');
}

function toHeaderCol(_, index) {
  return createCol(String.fromCharCode(CODES.A + index), index);
}

function createRow(content, index = '') {
  const resize = index
    ? `<div class="row-resize" data-resize="row"></div>`
    : '';
  return `
    <div class="row" data-row="${index}" data-type="resizable">
      <div class="row-info">
        ${index ? index : ''}
        ${resize}
      </div>
      <div class="row-data">
        ${content}
      </div>
    </div>
  `;
}

function createCol(el, index) {
  return `
    <div class="column" data-type="resizable" data-col="${index}">
      ${el}
      <div class="col-resize" data-resize="col"></div>
    </div>
  `;
}

function createCell(row) {
  return (_, col) => {
    return `
      <div 
        class="cell" 
        contenteditable
        data-col="${col}"
        data-id="${row}:${col}">
      </div>
    `;
  };
}


