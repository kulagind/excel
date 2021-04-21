import {
  CHANGE_TEXT,
  TABLE_RESIZE,
  CHANGE_STYLE,
  APPLY_STYLE,
  CHANGE_TITLE,
  UPDATE_DATE
} from './types';

export function tableResize(payload) {
  return {
    type: TABLE_RESIZE,
    payload,
  };
}

export function changeText(payload) {
  return {
    type: CHANGE_TEXT,
    payload,
  };
}

export function changeStyles(payload) {
  return {
    type: CHANGE_STYLE,
    payload,
  };
}

export function applyStyle(payload) {
  return {
    type: APPLY_STYLE,
    payload,
  };
}

export function changeTitle(payload) {
  return {
    type: CHANGE_TITLE,
    payload,
  };
}

export function updateDate() {
  return {
    type: UPDATE_DATE
  };
}
