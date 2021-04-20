import { $ } from '@core/dom';

export function resizeHandler($root, event) {
  return new Promise((resolve) => {
    const direction = event.target.dataset.resize;
    const $resizer = $(event.target);
    const $parent = $resizer.closest('[data-type="resizable"]');
    const coords = $parent.getCoords();
    let value;

    const $children = $root.getChildrenBySelector(
        `[data-${direction}="${$parent.data[direction]}"]`
    );

    document.onmousemove = (e) => {
      e.preventDefault();
      if (direction === 'col') {
        const delta = e.pageX - coords.right;
        value = coords.width + delta;
        $children.forEach(($element) => {
          $element.css({ width: `${value}px` });
        });
      } else {
        const delta = e.pageY - coords.bottom;
        value = coords.height + delta;
        $parent.css({ height: `${value}px` });
      }
    };

    document.onmouseup = () => {
      document.onmousemove = null;
      resolve({
        value,
        type: direction,
        id: $parent.data[direction]
      });
    };
  });
}
