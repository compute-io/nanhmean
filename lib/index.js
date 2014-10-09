/**
*
*	COMPUTE: nanhmean
*
*
*	DESCRIPTION:
*		- Computes the harmonic mean of an array of values ignoring any values which are not numeric.
*
*
*	NOTES:
*		[1] 
*
*
*	TODO:
*		[1] 
*
*
*	LICENSE:
*		MIT
*
*	Copyright (c) 2014. Athan Reines.
*
*
*	AUTHOR:
*		Athan Reines. kgryte@gmail.com. 2014.
*
*/

(function() {
	'use strict';

	// NANHMEAN //

	/**
	* FUNCTION: nanhmean( arr )
	*	Computes the harmonic mean over an array of values ignoring non-numeric values.
	*
	* @param {Array} arr - array of values
	* @returns {Number} harmonic mean
	*/
	function nanhmean( arr ) {
		if ( !Array.isArray( arr ) ) {
			throw new TypeError( 'hmean()::invalid input argument. Must provide an array.' );
		}
		var len = arr.length,
			sum = 0,
			N = 0,
			val;
		for ( var i = 0; i < len; i++ ) {
			val = arr[ i ];
			if ( typeof val !== 'number' || val !== val ) {
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

})();