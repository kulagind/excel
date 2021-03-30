import { $ } from '@core/dom';

export function resizeHandler($root, event) {
  const direction = event.target.dataset.resize;
  const $resizer = $(event.target);
  const $parent = $resizer.closest('[data-type="resizable"]');
  const coords = $parent.getCoords();

  const $children = $root.getChildrenBySelector(
      `[data-${direction}="${$parent.data[direction]}"]`
  );

  document.onmousemove = (e) => {
    e.preventDefault();
    if (direction === 'col') {
      const delta = e.pageX - coords.right;
      $children.forEach(($element) => {
        $element.css({width: `${coords.width + delta}px`});
      });
    } else {
      const delta = e.pageY - coords.bottom;
      $parent.css({height: `${coords.height + delta}px`});
    }
  };

  document.onmouseup = () => {
    document.onmousemove = null;
  };
}
