
import FrameOutline from './lib/FrameOutline';

import OutlineModule from 'diagram-js/lib/features/outline';

export default {
  __init__: [ 'frameOutline' ],
  __depends__: [
    OutlineModule
  ],
  frameOutline: [ 'type', FrameOutline ]
};