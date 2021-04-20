import { toInlineStyles } from '@core/utils';
import { DEFAULT_STYLES } from '../../constants';
import { parse } from './parse';

const CODES = {
  A: 65,
  Z: 90,
};

const DEFAULT_WIDTH = 120;
const DEFAULT_HEIGHT = 24;
const DEFAULT_DATA = '';

export function createTable(rowsCount = 33, state = {}) {
  const colsCount = CODES.Z - CODES.A + 1;
  const rows = [];

  const headerCols = new Array(colsCount)
      .fill('')
      .map(withWidthFromState(state))
      .map(toHeaderCol)
      .join('');

  rows.push(createRow(headerCols));

  for (let i = 0; i < rowsCount; i++) {
    const emptyRow = new Array(colsCount)
        .fill('')
        .map(createCell(state, i))
        .join('');

    const rowIndex = i + 1;
    rows.push(
        createRow(emptyRow, rowIndex, getHeight(state.rowState, rowIndex))
    );
  }

  return rows.join('');
}

function getWidth(state, index) {
  return (state[index] || DEFAULT_WIDTH) + 'px';
}

function getHeight(state, index) {
  return (state[index] || DEFAULT_HEIGHT) + 'px';
}

function getCellData(state, id) {
  return state[id] || DEFAULT_DATA;
}

function withWidthFromState(state) {
  return function(col, index) {
    return {
      col,
      index,
      width: getWidth(state.colState, index),
    };
  };
}

function toHeaderCol({ col, index, width }) {
  return createCol(String.fromCharCode(CODES.A + index), index, width);
}

function createRow(content, index = '', height = DEFAULT_HEIGHT) {
  const resize = index
    ? `<div class="row-resize" data-resize="row"></div>`
    : '';
  return `
    <div 
      class="row" 
      data-row="${index}" 
      data-type="resizable"
      style="height: ${height}">
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

function createCol(el, index, width) {
  return `
    <div 
      class="column" 
      data-type="resizable" 
      data-col="${index}" 
      style="width: ${width}">
      ${el}
      <div class="col-resize" data-resize="col"></div>
    </div>
  `;
}

function createCell(state, row) {
  return (_, col) => {
    const id = `${row}:${col}`;
    const styles = toInlineStyles({
      ...DEFAULT_STYLES,
      ...state.stylesState[id],
    });
    return `
      <div 
        class="cell" 
        contenteditable
        data-col="${col}"
        data-id="${id}"
        data-value="${getCellData(state.cellState, id)}"
        style="${styles}; width: ${getWidth(state.colState, col)}">
        ${parse(getCellData(state.cellState, id))}
      </div>
    `;
  };
}
