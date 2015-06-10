/* global describe, it, require, beforeEach */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Matrix data structure:
	matrix = require( 'dstructs-matrix' ),

	// Module to be tested:
	nanhmean = require( './../lib/matrix.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'matrix harmonic mean', function tests() {

	var data,
		mat,
		i;

	data = new Int8Array( 25 );
	for ( i = 0; i < data.length; i++ ) {
		data[ i ] = i;
	}

	beforeEach( function before() {
		mat = matrix( data, [5,5], 'int8' );
	});

	it( 'should export a function', function test() {
		expect( nanhmean ).to.be.a( 'function' );
	});

	it( 'should compute the harmonic mean along matrix columns', function test() {
		var out, mu, expected;

		out = matrix( [5,1], 'int8' );

		// NaN converted to 0 for int8 array
		mu = nanhmean( out, mat );
		expected = '0;6;11;16;21';

		assert.strictEqual( mu.toString(), expected );

		mu = nanhmean( out, mat, 2 );
		expected = '0;6;11;16;21';

		assert.strictEqual( mu.toString(), expected );

		// Flip a matrix up-down:
		mat.strides[ 0 ] *= -1;
		mat.offset = mat.length + mat.strides[ 0 ];

		mu = nanhmean( out, mat );
		expected = '21;16;11;6;0';

		assert.strictEqual( mu.toString(), expected, 'flipud' );
	});

	it( 'should compute the harmonic mean along matrix rows', function test() {
		var out, mu, expected;

		out = matrix( [1,5], 'int8' );

		mu = nanhmean( out, mat, 1 );
		expected = '0,3,6,7,9';

		assert.strictEqual( mu.toString(), expected );

		// Flip a matrix left-right:
		mat.strides[ 1 ] *= -1;
		mat.offset = mat.strides[ 0 ] - 1;

		mu = nanhmean( out, mat, 1 );
		expected = '9,7,6,3,0';

		assert.strictEqual( mu.toString(), expected, 'fliplr' );
	});

	it( 'should return null if provided a matrix having one or more zero dimensions', function test() {
		var out, mat;

		out = matrix( [0,0] );

		mat = matrix( [0,10] );
		assert.isNull( nanhmean( out, mat ) );

		mat = matrix( [10,0] );
		assert.isNull( nanhmean( out, mat ) );

		mat = matrix( [0,0] );
		assert.isNull( nanhmean( out, mat ) );
	});

});
