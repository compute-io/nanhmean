'use strict';

// MODULES //

var isNumber = require( 'validate.io-number' );

// FUNCTIONS //

var contains = require( './contains.js' );

// NANHMEAN //

/**
* FUNCTION: nanhmean( arr, encoding, clbk )
*	Computes the harmonic mean of an array using an accessor function ignoring non-numeric values..
*
* @param {Array} arr - input array
* @param {Array} encoding - array whose elements encode missing values
* @param {Function} clbk - accessor function for accessing array values
* @returns {Number|Null} harmonic mean or null
*/
function nanhmean( arr, encoding, clbk ) {
	var len = arr.length,
		sum = 0,
		N = 0,
		val,
		i;

	if ( !len ) {
		return null;
	}
	for ( i = 0; i < len; i++ ) {
		val = clbk( arr[ i ], i );
		if ( !isNumber( val ) || contains( encoding, val ) ) {
			continue;
		}
		if ( val <= 0 ) {
			return NaN;
		}
		N += 1;
		sum += 1 / val;
	}
	return N / sum;
} // end FUNCTION nanhmean()


// EXPORTS //

module.exports = nanhmean;
