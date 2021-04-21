import { DEFAULT_STYLES, DEFAULT_TITLE } from '../constants';
import { clone } from '@/core/utils';

const defaultState = {
  colState: {},
  rowState: {},
  currentText: '',
  cellState: {},
  currentStyles: DEFAULT_STYLES,
  stylesState: {},
  title: DEFAULT_TITLE,
  createdAt: new Date().toJSON()
};

const normalize = (state) => ({
  ...state,
  currentStyle: DEFAULT_STYLES,
  currentText: ''
});

export function normalizeInitialState(state) {
  return state ? normalize(state) : clone(defaultState);
}
