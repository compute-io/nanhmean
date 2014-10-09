
// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Module to be tested:
	hmean = require( './../lib' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'compute-nanhmean', function tests() {
	'use strict';

	it( 'should export a function', function test() {
		expect( hmean ).to.be.a( 'function' );
	});

	it( 'should throw an error if provided a non-array', function test() {
		var values = [
				'5',
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
				hmean( value );
			};
		}
	});

	it( 'should compute the harmonic mean', function test() {
		var data, sum, N, d, expected;

		data = [
			2,
			4,
			NaN,
			5,
			3,
			true,
			'5',
			null,
			undefined,
			[],
			{},
			function(){},
			8,
			2
		];

		sum = 0;
		N = 0;
		for ( var i = 0; i < data.length; i++ ) {
			d = data[ i ];
			if ( typeof d !== 'number' || d !== d ) {
				continue;
			}
			N += 1;
			sum += 1 / d;
		}
		expected = N / sum;

		assert.closeTo( hmean( data ), expected, 1e-7 );
	});

	it( 'should return NaN if an array contains any values less than or equal to 0', function test() {
		var data, actual;

		data = [ 2, 4, 0, 3, 8, 2 ];
		actual = hmean( data );

		assert.ok( typeof actual === 'number' && actual !== actual );

		data = [ 2, 4, -10, 3, 8, 2 ];
		actual = hmean( data );

		assert.ok( typeof actual === 'number' && actual !== actual );
	});

});