const CODES = {
  A: 65,
  Z: 90,
};

export function createTable(rowsCount = 33) {
  const colsCount = CODES.Z - CODES.A + 1;
  const rows = [];

  const headerCols = new Array(colsCount)
      .fill('')
      .map(toHeaderCol)
      .join('');

  rows.push(createRow(headerCols));

  const emptyRow = new Array(colsCount)
      .fill('')
      .map(createCell)
      .join('');

  for (let i = 0; i < rowsCount; i++) {
    rows.push(createRow(emptyRow, i + 1));
  }

  return rows.join('');
}

function toHeaderCol(_, index) {
  return createCol(String.fromCharCode(CODES.A + index));
}

function createRow(content, index = '') {
  return `
    <div class="row">
      <div class="row-info">
        ${index}
      </div>
      <div class="row-data">
        ${content}
      </div>
    </div>
  `;
}

function createCol(el) {
  return `
    <div class="column">
      ${el}
    </div>
  `;
}

function createCell() {
  return `
    <div class="cell" contenteditable>
    </div>
  `;
}
