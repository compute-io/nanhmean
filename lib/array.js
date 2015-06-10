'use strict';

// MODULES //

var isNumber = require( 'validate.io-number' );

// NANHMEAN //

/**
* FUNCTION: nanhmean( arr )
*	Computes the harmonic mean of an array ignoring non-numeric values.
*
* @param {Array|Number[]|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array} arr - input array
* @returns {Number|Null} harmonic mean or null
*/
function nanhmean( arr ) {
	var len = arr.length,
		sum = 0,
		N = 0,
		val,
		i;

	if ( !len ) {
		return null;
	}

	for ( i = 0; i < len; i++ ) {
		val = arr[ i ];

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
