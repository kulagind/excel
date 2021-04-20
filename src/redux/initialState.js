import { DEFAULT_STYLES, DEFAULT_TITLE } from '../constants';
import { storage } from '../core/utils';

const defaultState = {
  colState: {},
  rowState: {},
  currentText: '',
  cellState: {},
  currentStyles: DEFAULT_STYLES,
  stylesState: {},
  title: DEFAULT_TITLE
};

const normalize = (state) => ({
  ...state,
  currentStyle: DEFAULT_STYLES,
  currentText: ''
});

export const initialState = {
  ...defaultState,
  ...normalize(storage('excel-state'))
};
