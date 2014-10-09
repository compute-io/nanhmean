nanhmean
===
[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Coverage Status][coveralls-image]][coveralls-url] [![Dependencies][dependencies-image]][dependencies-url]

> Computes the harmonic mean of an array of values ignoring any values which are not numeric.


## Installation

``` bash
$ npm install compute-nanhmean
```

For use in the browser, use [browserify](https://github.com/substack/node-browserify).


## Usage

To use the module,

``` javascript
var nanhmean = require( 'compute-nanhmean' );
```

#### nanhmean( arr )

Computes the harmonic mean ignoring non-numeric values.

``` javascript
var data = [ 1, 5, NaN, 3, 4, NaN, 16 ];

var mu = nanhmean( data );
// returns ~2.7088
```

Note: only calculate the harmonic mean for positive, real numbers. 

If an `array` contains negative numbers, the harmonic mean is nonsensical. For example, consider `x = [ 3, -3, 4 ]`. The harmonic mean of `x` is `12`, while the arithmetic mean is `1.33333...`. The harmonic mean should never be greater than the arithmetic mean. 

Similarly, if an `array` contains zero values, the harmonic mean is also zero: `1/0 --> infinity` and `1/infinity --> 0`. For example, consider `x = [ 0, 100, 1000, 10000 ]`. Using the textbook definition of the harmonic mean, the mean would be `0`, which, given `x`, does not make sense.

If an `array` contains elements less than or equal to `0`, the function returns `NaN`.



## Examples

``` javascript
var nanhmean = require( 'compute-nanhmean' );

var data = new Array( 1000 );

for ( var i = 0; i < data.length; i++ ) {
	if ( i%5 === 0 ) {
		data[ i ] = NaN;
	} else {
		data[ i ] = Math.random() * 100;
	}
}

console.log( nanhmean( data ) );
```

To run the example code from the top-level application directory,

``` bash
$ node ./examples/index.js
```


## Notes

The harmonic mean of an array containing non-numeric values is equal to the harmonic mean of an equivalent array which contains only the numeric values. Hence,

``` javascript
var d1 = [ 1, NaN, 2, 3, NaN ],
    d2 = [ 1, 2, 3 ];

console.log( nanhmean( d1 ) === nanhmean( d2 ) );
// returns true
```


## Tests

### Unit

Unit tests use the [Mocha](http://visionmedia.github.io/mocha) test framework with [Chai](http://chaijs.com) assertions. To run the tests, execute the following command in the top-level application directory:

``` bash
$ make test
```

All new feature development should have corresponding unit tests to validate correct functionality.


### Test Coverage

This repository uses [Istanbul](https://github.com/gotwarlost/istanbul) as its code coverage tool. To generate a test coverage report, execute the following command in the top-level application directory:

``` bash
$ make test-cov
```

Istanbul creates a `./reports/coverage` directory. To access an HTML version of the report,

``` bash
$ make view-cov
```


## License

[MIT license](http://opensource.org/licenses/MIT). 


---
## Copyright

Copyright &copy; 2014. Athan Reines.


[npm-image]: http://img.shields.io/npm/v/compute-nanhmean.svg
[npm-url]: https://npmjs.org/package/compute-nanhmean

[travis-image]: http://img.shields.io/travis/compute-io/nanhmean/master.svg
[travis-url]: https://travis-ci.org/compute-io/nanhmean

[coveralls-image]: https://img.shields.io/coveralls/compute-io/nanhmean/master.svg
[coveralls-url]: https://coveralls.io/r/compute-io/nanhmean?branch=master

[dependencies-image]: http://img.shields.io/david/compute-io/nanhmean.svg
[dependencies-url]: https://david-dm.org/compute-io/nanhmean

[dev-dependencies-image]: http://img.shields.io/david/dev/compute-io/nanhmean.svg
[dev-dependencies-url]: https://david-dm.org/dev/compute-io/nanhmean

[github-issues-image]: http://img.shields.io/github/issues/compute-io/nanhmean.svg
[github-issues-url]: https://github.com/compute-io/nanhmean/issues