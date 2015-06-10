'use strict';

// MODULES //

var isNumber = require( 'validate.io-number' );

// NANHMEAN //

/**
* FUNCTION: nanhmean( arr, clbk )
*	Computes the harmonic mean of an array using an accessor function ignoring non-numeric values..
*
* @param {Array} arr - input array
* @param {Function} clbk - accessor function for accessing array values
* @returns {Number|Null} harmonic mean or null
*/
function nanhmean( arr, clbk ) {
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
		if ( !isNumber( val ) ) {
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
