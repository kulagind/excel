import { ExcelComponent } from '@core/ExcelComponent';
import {
  getCellId,
  shouldResize,
  matrix,
  nextSelector,
} from './table.functions';
import { resizeHandler } from './table.resize';
import { createTable } from './table.template';
import { TableSelection } from './TableSelection';
import { $ } from '@core/dom';

export class Table extends ExcelComponent {
  static className = 'excel__table';
  resizer = null;

  constructor($root, options) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown', 'keydown', 'input', 'click'],
      ...options
    });
  }

  toHTML() {
    return createTable();
  }

  prepare() {
    this.selection = new TableSelection();
  }

  init() {
    super.init();

    this.selectCell(this.$root.find('[data-id="0:0"]'));

    this.$on('formula:input', (result) => {
      this.selection.current.text(result);
    });

    this.$on('formula:done', () => {
      this.selection.current.focus();
    });
  }

  onMousedown(event) {
    if (shouldResize(event)) {
      resizeHandler(this.$root, event);
    } else if (getCellId(event)) {
      const $target = $(event.target);
      if (event.shiftKey) {
        const $cells = matrix($target, this.selection.current).map((id) =>
          this.$root.find(`[data-id="${id}"]`)
        );

        this.selection.selectGroup($cells);
      } else {
        this.selection.select($target);
      }
    }
  }

  onKeydown(event) {
    const keys = [
      'Enter',
      'Tab',
      'ArrowLeft',
      'ArrowRight',
      'ArrowUp',
      'ArrowDown',
    ];

    const { key } = event;

    if (keys.includes(key) && !event.shiftKey) {
      event.preventDefault();
      const id = this.selection.current.id(true);
      const $next = this.$root.find(nextSelector(key, id));
      this.selectCell($next);
    }
  }

  onInput(event) {
    this.$emit('table:input', $(event.target));
  }

  onClick(event) {
    this.$emit('table:select', $(event.target));
  }

  selectCell($cell) {
    this.selection.select($cell);
    this.$emit('table:select', $cell);
  }
}
