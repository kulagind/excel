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
import * as actions from '../../redux/actions';
import { DEFAULT_STYLES } from '@/constants';
import { parse } from './parse';

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
    return createTable(33, this.store.getState());
  }

  prepare() {
    this.selection = new TableSelection();
  }

  init() {
    super.init();

    this.selectCell(this.$root.find('[data-id="0:0"]'));

    this.$on('formula:input', (result) => {
      this.selection.current
          .attr('data-value', result)
          .text(parse(result));
      this.updateTextInStore(result);
    });

    this.$on('formula:done', () => {
      this.selection.current.focus();
    });

    this.$on('toolbar:applyStyle', (style) => {
      this.selection.applyStyle(style);
      this.$dispatch(actions.applyStyle({
        value: style,
        ids: this.selection.selectedIds
      }));
    });
  }

  async resizeTable(event) {
    try {
      const data = await resizeHandler(this.$root, event);
      this.$dispatch(actions.tableResize(data));
    } catch (e) {
      console.warn('Resize error:', e.message);
    }
  }

  onMousedown(event) {
    if (shouldResize(event)) {
      this.resizeTable(event);
    } else if (getCellId(event)) {
      const $target = $(event.target);
      if (event.shiftKey) {
        const $cells = matrix($target, this.selection.current).map((id) =>
          this.$root.find(`[data-id="${id}"]`)
        );

        this.selection.selectGroup($cells);
      } else {
        this.selectCell($target);
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
    this.selection.current
        .attr('data-value', $(event.target).text())
        .text(parse($(event.target).text()));
    this.updateTextInStore($(event.target).text());
  }

  updateTextInStore(value) {
    this.$dispatch(actions.changeText({
      id: this.selection.current.id(),
      value
    }));
  }

  onClick(event) {
    const $target = $(event.target);
    if ($target.data.id) {
      this.$emit('table:select', $target);
    }
  }

  selectCell($cell) {
    this.selection.select($cell);
    this.$emit('table:select', $cell);
    const styles = $cell.getStyles(Object.keys(DEFAULT_STYLES));
    this.$dispatch(actions.changeStyles(styles));
  }
}
