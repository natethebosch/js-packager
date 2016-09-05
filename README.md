# js-packager

### Basics
Takes a directory structure of javascript packages (`module.exports...`)
```
├── root.js
└── util
    ├── convert.js
    └── validation
        └── is-valid.js
```

and compiles a javascript library from it such that 
each file is accessible by

```js
myLib.util.validation.IsValid == // module.exports from util/validation/is-valid.js
```

### Require

References to other files may be done using node.js `require` syntax.
```js
// e.g.
// contents of convert.js

var strToIntConv = function(value){
	return parseInt(value, 10);
};

module.exports = {
	ToInt: strToIntConv
};

// contents of is-valid.js 

var conv = require("../convert.js");

var IsValid = function(value){
	return !IsNaN(conv.ToInt(value));
};

module.exports = IsValid;
```
