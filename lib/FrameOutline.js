var LOW_PRIORITY = 500;

import {
  append as svgAppend,
  attr as svgAttr,
  create as svgCreate
} from 'tiny-svg';

import {
  queryAll as domQueryAll
} from 'min-dom';

import {
  assign
} from 'min-dash';

function isFrameElement(element) {
  return !!(element && element.frameOnly);
}


/**
 * @class
 *
 * A plugin that adds a second (inner) outline to frame elements
 *
 * @param {EventBus} eventBus
 * @param {Styles} styles
 * @param {ElementRegistry} elementRegistry
 */
export default function FrameOutline(eventBus, styles) {

  this.offset = 6;

  var OUTLINE_STYLE = styles.cls('djs-outline', [ 'no-fill' ]);

  var self = this;

  function createOutline(gfx, bounds) {
    var outline = svgCreate('rect');

    svgAttr(outline, assign({
      x: 10,
      y: 10,
      width: 100,
      height: 100
    }, OUTLINE_STYLE));

    svgAppend(gfx, outline);

    return outline;
  }

  // A low priortity is necessary, because outlines of labels have to be updated
  // after the label bounds have been updated in the renderer.
  eventBus.on([ 'shape.added', 'shape.changed' ], LOW_PRIORITY, function(event) {
    var element = event.element,
        gfx = event.gfx;

    if (!isFrameElement(element)) {
      return;
    }

    var outlines = domQueryAll('.djs-outline', gfx),
        outline = outlines[1];

    if (!outline) {
      outline = createOutline(gfx, element);
    }

    self.updateFrameOutline(outline, element);
  });
}


/**
* Updates the (inner) outline of a frame shape respecting the dimension of the
* element and an outline offset.
*
* @param {SVGElement} outline
* @param {djs.model.Base} element
*/
FrameOutline.prototype.updateFrameOutline = function(outline, element) {
  svgAttr(outline, {
    x: this.offset,
    y: this.offset,
    width: element.width - this.offset * 2,
    height: element.height - this.offset * 2
  });
};


FrameOutline.$inject = ['eventBus', 'styles'];