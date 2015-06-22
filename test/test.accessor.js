/* global describe, it, require */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Validate if a value is equal to NaN:
	isnan = require( 'validate.io-nan' ),

	// Validate if a value is numeric:
	isNumber = require( 'validate.io-number-primitive' ),

	// Module to be tested:
	nanhmean = require( './../lib/accessor.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'accessor harmonic mean', function tests() {

	it( 'should export a function', function test() {
		expect( nanhmean ).to.be.a( 'function' );
	});

	it( 'should compute the harmonic mean using an accessor ignoring nun-numeric / missing values', function test() {
		var data,
			expected,
			sum,
			d,
			N = 0;

		data = [
			{'x':2},
			{'x':4},
			{'x':NaN},
			{'x':5},
			{'x':3},
			{'x':true},
			{'x':null},
			{'x':undefined},
			{'x':[]},
			{'x':{}},
			{'x':function(){}},
			{'x':8},
			{'x':2},
			/// 999 shall denote a missing value
			{'x':999}
		];

		sum = 0;
		for ( var i = 0; i < data.length; i++ ) {
			d = getValue( data[ i ] );
			if ( !isNumber( d ) || d === 999 ) {
				continue;
			}
			N += 1;
			sum += 1 / d;
		}
		expected = N / sum;

		assert.closeTo( nanhmean( data, [ 999 ], getValue ), expected, 1e-7 );

		function getValue( d ) {
			return d.x;
		}
	});



	it( 'should return NaN if an accessed array value is 0', function test() {
		var data, mu;

		data = [
			{'x':3},
			{'x':0},
			{'x':5}
		];

		mu = nanhmean( data, [], getValue );

		// Check: mu === NaN
		assert.isTrue( isnan( mu ) );

		function getValue( d ) {
			return d.x;
		}
	});

	it( 'should return NaN if an accessed array value is a negative number', function test() {
		var data, mu;

		data = [
			{'x':3},
			{'x':-4},
			{'x':5}
		];
		mu = nanhmean( data, [], getValue );

		// Check: mu === NaN
		assert.isTrue( isnan( mu ) );

		function getValue( d ) {
			return d.x;
		}
	});

	it( 'should return null if provided an empty array', function test() {
		assert.isNull( nanhmean( [], [], 		getValue ) );

		function getValue( d ) {
			return d.x;
		}
	});

});
