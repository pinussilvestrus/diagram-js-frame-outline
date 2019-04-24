import {
  bootstrapDiagram,
  inject
} from 'diagram-js/test/helper';

import {
  queryAll as domQueryAll
} from 'min-dom';

import {
  classes as svgClasses
} from 'tiny-svg';

import frameOutlineModule from '..';

import selectionModule from 'diagram-js/lib/features/selection';

describe('diagram-js-frame-outline', function() {

  beforeEach(bootstrapDiagram({
    modules: [
      frameOutlineModule,
      selectionModule
    ]
  }));

  describe('bootstrap', function() {

    it('should bootstrap diagram with component', inject(function() { }));

  });


  describe('select', function() {

    it('should add multiple outlines to frame', inject(
      function(selection, canvas, elementRegistry) {

        // given
        var shape = canvas.addShape({
          id: 'test',
          x: 10,
          y: 10,
          width: 100,
          height: 100,
          frameOnly: true
        });

        // when
        selection.select(shape);

        // then
        var gfx = elementRegistry.getGraphics(shape);
        var outlines = domQueryAll('.djs-outline', gfx);

        expect(outlines).to.have.length(2);
        expect(svgClasses(gfx).has('selected')).to.be.true; // Outline class is set
      }
    ));

  });


  describe('deselect', function() {

    it('should remove multiple outlines from frame', inject(
      function(selection, canvas, elementRegistry) {

        // given
        var shape = canvas.addShape({
          id: 'test',
          x: 10,
          y: 10,
          width: 100,
          height: 100,
          frameOnly: true
        });

        // when
        selection.select(shape);
        selection.deselect(shape);

        // then
        var gfx = elementRegistry.getGraphics(shape);
        var outlines = domQueryAll('.djs-outline', gfx);

        expect(outlines).to.have.length(2);
        expect(svgClasses(gfx).has('selected')).to.be.false; // Outline class is not set
      }
    ));

  });

});
