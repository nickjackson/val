
# val

  get/set element value - inspired by jQuery .val()

## Installation

    $ component install nickjackson/val

## Example
```js
var val = require('val');
var el = document.querySelector('input');

val(el) // returns el value
val(el, 'new value'); // sets el with 'new value'
```

## Notes
* supports checkboxes - set with true/false
* supports selects
* need to test with other browsers


## License

  MIT
