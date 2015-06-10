/* global describe, it, require */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Matrix data structure:
	matrix = require( 'dstructs-matrix' ),

	// Module to be tested:
	nanhmean = require( './../lib' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'compute-nanhmean', function tests() {

	it( 'should export a function', function test() {
		expect( nanhmean ).to.be.a( 'function' );
	});

	it( 'should throw an error if the first argument is neither array-like or matrix-like', function test() {
		var values = [
			// '5', // valid as is array-like (length)
			5,
			true,
			undefined,
			null,
			NaN,
			function(){},
			{}
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( TypeError );
		}
		function badValue( value ) {
			return function() {
				nanhmean( value );
			};
		}
	});

	it( 'should throw an error if provided a dimension which is greater than 2 when provided a matrix', function test() {
		var values = [
			'5',
			5,
			true,
			undefined,
			null,
			NaN,
			[],
			{},
			function(){}
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( Error );
		}
		function badValue( value ) {
			return function() {
				nanhmean( matrix( [2,2] ), {
					'dim': value
				});
			};
		}
	});

	it( 'should throw an error if provided an unrecognized/unsupported data type option', function test() {
		var values = [
			'beep',
			'boop'
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( Error );
		}
		function badValue( value ) {
			return function() {
				nanhmean( matrix( [2,2] ), {
					'dtype': value
				});
			};
		}
	});

	it( 'should compute the harmonic mean', function test() {
		var data, expected, sum;

		data = [ 2, 4, 5, 3, 8, 2 ];

		sum = 0;
		for ( var i = 0; i < data.length; i++ ) {
			sum += 1 / data[ i ];
		}
		expected = data.length / sum;

		assert.closeTo( nanhmean( data ), expected, 1e-7 );
	});

	it( 'should compute the harmonic mean of a typed array', function test() {
		var data, expected, sum;

		data = new Int8Array( [ 2, 4, 5, 3, 8, 2 ] );

		sum = 0;
		for ( var i = 0; i < data.length; i++ ) {
			sum += 1 / data[ i ];
		}
		expected = data.length / sum;

		assert.closeTo( nanhmean( data ), expected, 1e-7  );
	});

	it( 'should compute the harmonic mean using an accessor function', function test() {
		var data, expected, actual, sum;

		data = [
			{'x':2},
			{'x':4},
			{'x':5},
			{'x':3},
			{'x':8},
			{'x':2}
		];

		sum = 0;
		for ( var i = 0; i < data.length; i++ ) {
			sum += 1 / getValue( data[ i ] );
		}
		expected = data.length / sum;

		actual = nanhmean( data, {
			'accessor': getValue
		});

		assert.strictEqual( actual, expected );

		function getValue( d ) {
			return d.x;
		}
	});

	it( 'should compute the harmonic mean along a matrix dimension', function test() {
		var expected,
			data,
			mat,
			mu,
			i;

		data = new Int8Array( 25 );
		for ( i = 0; i < data.length; i++ ) {
			data[ i ] = i;
		}
		mat = matrix( data, [5,5], 'int8' );

		// Default:
		mu = nanhmean( mat );
		expected = 'NaN;6.70569451836083;11.831685118789647;16.881778190740285;21.908826622131503';

		assert.strictEqual( mu.toString(), expected, 'default' );

		// Along columns:
		mu = nanhmean( mat, {
			'dim': 2
		});
		expected = 'NaN;6.70569451836083;11.831685118789647;16.881778190740285;21.908826622131503';

		assert.strictEqual( mu.toString(), expected, 'dim: 2' );

		// Along rows:
		mu = nanhmean( mat, {
			'dim': 1
		});
		expected = 'NaN,3.6557863501483676,6.0206975852817175,7.882826803368729,9.490584737363726';

		assert.strictEqual( mu.toString(), expected, 'dim: 1' );
	});

	it( 'should compute the harmonic mean of 1d matrices (vectors)', function test() {
		var data, mat, sum, expected;

		data = [ 2, 4, 5, 3, 8, 2 ];

		sum = 0;
		for ( var i = 0; i < data.length; i++ ) {
			sum += 1 / data[ i ];
		}
		expected = data.length / sum;

		// Row vector:
		mat = matrix( data, [1,6], 'int8' );
		assert.closeTo( nanhmean( mat ), expected, 1e-7 );

		// Column vector:
		mat = matrix( data, [6,1], 'int8' );
		assert.closeTo( nanhmean( mat ), expected, 1e-7 );
	});

	it( 'should compute the harmonic mean of matrices containing NaN', function test() {

		var data, mat, mu, expected;

		data = new Float64Array( [1,2,3,4,5,6,7,8,NaN] );
		mat = matrix( data, [3,3]);

		mu = nanhmean( mat, {
			'dtype': 'int8'
		});
		expected = '1;4;7';

		assert.strictEqual( mu.toString(), expected );
	});

});
