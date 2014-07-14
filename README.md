# aster-parse-esnext
[![NPM version][npm-image]][npm-url]
[![Build Status][travis-image]][travis-url]

> ES6->ES5 parser for aster.

## Usage

This is internal module and should be used as part of [aster-parse](https://npmjs.org/package/aster-parse) or [aster-src](https://npmjs.org/package/aster-src).

It uses [esprima#harmony](https://github.com/ariya/esprima/tree/harmony) and [esnext](https://github.com/square/esnext) transpiler to do it's job.

In order to use ES6 parser for all the `.js` files, register it in your build script as following:

```javascript
var aster = require('aster');

aster.src.registerParser('.js', require('aster-parse-esnext'));
```

## API

### parseEsNext(options)

#### options.loc
Type: `Boolean`
Default: `true`

Location tracking (required for source maps).

#### options.comments
Type: `Boolean`
Default: `false`

Include comments to AST.

## License

[MIT License](http://en.wikipedia.org/wiki/MIT_License)

[npm-url]: https://npmjs.org/package/aster-parse-esnext
[npm-image]: https://badge.fury.io/js/aster-parse-esnext.png

[travis-url]: http://travis-ci.org/asterjs/aster-parse-esnext
[travis-image]: https://secure.travis-ci.org/asterjs/aster-parse-esnext.png?branch=master
