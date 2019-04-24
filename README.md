# diagram-js-frame-outline

diagram-js extension which adds an inner outline for frame elements

![gif](./resources/screencast.gif)

## Installation

```sh
$ npm i --save diagram-js-frame-outline
```

## Usage
```js
import BpmnModeler from 'bpmn-js/lib/Modeler';

import frameOutlineModule from 'diagram-js-frame-outline';

var modeler = new BpmnModeler({
  // ...
  additionalModules: [
    frameOutlineModule
  ]
});

```

