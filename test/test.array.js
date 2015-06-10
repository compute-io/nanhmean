/* global describe, it, require */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Validate if a value is equal to NaN:
	isnan = require( 'validate.io-nan' ),

	// Validate if a value is numeric:
	isNumber = require( 'validate.io-number' ),

	// Module to be tested:
	nanhmean = require( './../lib/array.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'array harmonic mean', function tests() {

	it( 'should export a function', function test() {
		expect( nanhmean ).to.be.a( 'function' );
	});

	it( 'should compute the harmonic mean', function test() {
		var data,
			d,
			sum,
			N,
			expected;

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

		N = 0;
		sum = 0;
		for ( var i = 0; i < data.length; i++ ) {
			d = data[ i ];
			if ( !isNumber( d ) ) {
				continue;
			}
			N += 1;
			sum += 1 / d;
		}
		expected = N/ sum;

		assert.closeTo( nanhmean( data ), expected, 1e-7 );
	});

	it( 'should return NaN if an input array contains a 0', function test() {
		var data, mu;

		data = [ 2, 4, 0, 3, 8, 2 ];
		mu = nanhmean( data );

		// Check: mu === NaN
		assert.isTrue( isnan( mu ) );
	});

	it( 'should return NaN if an input array contains a negative number', function test() {
		var data, mu;

		data = [ 3, -4, 5 ];
		mu = nanhmean( data );

		// Check: mu === NaN
		assert.isTrue( isnan( mu ) );

	});


	it( 'should return null if provided an empty array', function test() {
		assert.isNull( nanhmean( [] ) );
	});

});
