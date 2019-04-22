# envhelper [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url] [![Coverage percentage][coveralls-image]][coveralls-url]
> Environment Label Helper

## Installation

```sh
$ npm install --save @nickfan/envhelper
```

## Usage

```js
const envhelper = require('@nickfan/envhelper');

envhelper.genEnvUrlByWebUrl("http://dev-mockup.example.com", "testing") === "http://test-mockup.example.com"

```
## License

MIT © [nick fan](https://github.com/nickfan)


[npm-image]: https://badge.fury.io/js/envhelper.svg
[npm-url]: https://npmjs.org/package/envhelper
[travis-image]: https://travis-ci.org/nickfan/envhelper.svg?branch=master
[travis-url]: https://travis-ci.org/nickfan/envhelper
[daviddm-image]: https://david-dm.org/nickfan/envhelper.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/nickfan/envhelper
[coveralls-image]: https://coveralls.io/repos/nickfan/envhelper/badge.svg
[coveralls-url]: https://coveralls.io/r/nickfan/envhelper
