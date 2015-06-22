nanhmean
===
[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Coverage Status][coveralls-image]][coveralls-url] [![Dependencies][dependencies-image]][dependencies-url]

> Computes the harmonic mean ignoring any values which are not numeric.

The [harmonic mean](http://en.wikipedia.org/wiki/Harmonic_mean) is defined as

<div class="equation" align="center" data-raw-text="
    H = \frac{N}{\sum_{i=0}^{N-1} \frac{1}{x_i}}" data-equation="eq:harmonic_mean">
	<img src="https://cdn.rawgit.com/compute-io/nanhmean/323f5c47275f812989d149802394952979ccbf39/docs/img/eqn1.svg" alt="Equation for the harmonic mean.">
	<br>
</div>

where `x_0, x_1,...,x_{N-1}` are individual data values and `N` is the total number of values in the data set.

## Installation

``` bash
$ npm install compute-nanhmean
```

For use in the browser, use [browserify](https://github.com/substack/node-browserify).


## Usage


``` javascript
var nanhmean = require( 'compute-nanhmean' );
```

#### nanhmean( x[, opts] )

Computes the harmonic mean ignoring non-numeric values. `x` may be either an [`array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array), [`typed array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Typed_arrays), or [`matrix`](https://github.com/dstructs/matrix).

``` javascript
var data, mu;

data = [ 1, 5, NaN, 3, 4, NaN, 16 ];
mu = nanhmean( data );
// returns ~2.7088

data = new Int32Array( data );
mu = nanhmean( data );
// returns ~2.7088
```

Note: only calculate the harmonic mean for positive, real numbers.

If an `array` contains negative numbers, the harmonic mean is nonsensical. For example, consider `x = [ 3, -3, 4 ]`. The harmonic mean of `x` is `12`, while the arithmetic mean is `1.33333...`. The harmonic mean should never be greater than the arithmetic mean.

Similarly, if an `array` contains zero values, the harmonic mean is also zero: `1/0 --> infinity` and `1/infinity --> 0`. For example, consider `x = [ 0, 100, 1000, 10000 ]`. Using the textbook definition of the harmonic mean, the mean would be `0`, which, given `x`, does not make sense.

If an `array` contains elements less than or equal to `0`, the function returns `NaN`.

If the array or matrix contains missing values encoded by numbers, use the `encoding` option to ensure they do not affect the calculation:

* __encoding__: `array` holding all values which will be regarded as missing values. Default: `[]`.

```
var data, mu;

data = [ 1, 5, 999, 3, 4, 981, 16 ];
mu = nanhmean( data, {
	'encoding': [ 981, 999 ]
});
// returns ~2.7088

data = new Int32Array( data );
mu = nanhmean( data, {
	'encoding': [ 981, 999 ]
});
// returns ~2.7088
```

For object `arrays`, provide an accessor `function` for accessing `array` values.

``` javascript
var data = [
	{'x':2},
	{'x':4},
    {'x':NaN},
	{'x':5},
	{'x':3},
    {'x':NaN},
	{'x':8},
	{'x':2}
];

function getValue( d, i ) {
	return d.x;
}

var mu = nanhmean( data, {
	'accessor': getValue
});
// returns ~3.144
```

If provided a [`matrix`](https://github.com/dstructs/matrix), the function accepts the following `options`:

*	__dim__: dimension along which to compute the [harmonic mean](http://en.wikipedia.org/wiki/Harmonic_mean) . Default: `2` (along the columns).
*	__dtype__: output [`matrix`](https://github.com/dstructs/matrix) data type. Default: `float64`.

By default, the function computes the [harmonic mean](http://en.wikipedia.org/wiki/Harmonic_mean) along the columns (`dim=2`).

``` javascript
var matrix = require( 'dstructs-matrix' ),
	data,
	mat,
	mu,
	i;

data = new Int8Array( 25 );
for ( i = 0; i < data.length; i++ ) {
	data[ i ] = i;
}
mat = matrix( data, [5,5], 'int8' );
/*
	[  0  1  2  3  4
	   5  6  7  8  9
	  10 11 12 13 14
	  15 16 17 18 19
	  20 21 22 23 24 ]
*/

mu = nanhmean( mat );
/*
	[  NaN
	   6.706
	  11.832
	  16.882
	  21.909 ]
*/
```

To compute the [harmonic mean](http://en.wikipedia.org/wiki/Harmonic_mean)  along the rows, set the `dim` option to `1`.

``` javascript
mu = nanhmean( mat, {
	'dim': 1
});
/*
	[ NaN, 3.656, 6.021, 7.883, 9.491 ]
*/
```

By default, the output [`matrix`](https://github.com/dstructs/matrix) data type is `float64`. To specify a different output data type, set the `dtype` option.

``` javascript
mu = nanhmean( mat, {
	'dim': 1,
	'dtype': 'uint8'
});
/*
	[ 0, 3, 6, 7, 9 ]
*/

var dtype = mu.dtype;
// returns 'uint8'
```

Note: `NaN` will be coerced to `0` for [`typed arrays`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Typed_arrays) of type integer. Only typed arrays of type `float64` and `float32` can hold `NaN` values.

If provided a [`matrix`](https://github.com/dstructs/matrix) having either dimension equal to `1`, the function treats the [`matrix`](https://github.com/dstructs/matrix) as a [`typed array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Typed_arrays) and returns a `numeric` value.

``` javascript
data = [ 2, 4, 5, 3, 8, 2 ];

// Row vector:
mat = matrix( new Int8Array( data ), [1,6], 'int8' );
mu = nanhmean( mat );
// returns ~3.144

// Column vector:
mat = matrix( new Int8Array( data ), [6,1], 'int8' );
mu = nanhmean( mat );
// returns ~3.144
```

If provided an empty [`array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array), [`typed array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Typed_arrays), or [`matrix`](https://github.com/dstructs/matrix), the function returns `null`.

``` javascript
mu = nanhmean( [] );
// returns null

mu = nanhmean( new Int8Array( [] ) );
// returns null

mu = nanhmean( matrix( [0,0] ) );
// returns null

mu = nanhmean( matrix( [0,10] ) );
// returns null

mu = nanhmean( matrix( [10,0] ) );
// returns null
```

## Examples

``` javascript
var matrix = require( 'dstructs-matrix' ),
	nanhmean = require( 'compute-hmean' );

var data,
	mat,
	mu,
	i;


// ----
// Plain arrays...
data = new Array( 1000 );
for ( i = 0; i < data.length; i++ ) {
	if ( i%5 === 0 ) {
		data[ i ] = NaN;
	} else {
		data[ i ] = Math.random() * 100;
	}
}
mu = nanhmean( data );

// ----
// Object arrays (accessors)...
function getValue( d ) {
	return d.x;
}
for ( i = 0; i < data.length; i++ ) {
	data[ i ] = {
		'x': data[ i ]
	};
}
mu = nanhmean( data, {
	'accessor': getValue
});

// ----
// Typed arrays...
// only Float64Array and Float32Array support NaN
data = new Float64Array( 1000 );
for ( i = 0; i < data.length; i++ ) {
	if ( i%5 === 0 ) {
		data[ i ] = NaN;
	} else {
		data[ i ] = Math.random() * 100;
	}
}
mu = nanhmean( data );

// ----
// Matrices (along rows)...
mat = matrix( data, [100,10], 'float64' );
mu = nanhmean( mat, {
	'dim': 1
});

// ----
// Matrices (along columns)...
mu = nanhmean( mat, {
	'dim': 2
});

// ----
// Matrices (custom output data type)...
mu = nanhmean( mat, {
	'dtype': 'uint8'
});
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

Unit tests use the [Mocha](http://mochajs.org) test framework with [Chai](http://chaijs.com) assertions. To run the tests, execute the following command in the top-level application directory:

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


---
## License

[MIT license](http://opensource.org/licenses/MIT).


## Copyright

Copyright &copy; 2014-2015. The [Compute.io](https://github.com/compute-io) Authors.


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
