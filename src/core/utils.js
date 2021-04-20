import { camelToKebab } from '../components/table/table.functions';

export function capitalize(string) {
  if (typeof string !== 'string') {
    return '';
  }
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function storage(key, data = null) {
  if (!data) {
    return JSON.parse(localStorage.getItem(key));
  }
  localStorage.setItem(key, JSON.stringify(data));
}

export function isEqual(prevState, state) {
  if (typeof prevState === 'object' && typeof state === 'object') {
    return JSON.stringify(prevState) === JSON.stringify(state);
  }
  return prevState === state;
}

export function toInlineStyles(styles = {}) {
  return Object.keys(styles)
      .map((camelStyle) => (
        `${camelToKebab(camelStyle)}: ${styles[camelStyle]}`
      ))
      .join('; ');
}

export function debounce(fn, wait) {
  let timeout;

  return function(...args) {
    const later = () => {
      clearTimeout(timeout);
      fn(...args);
    };

    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}
