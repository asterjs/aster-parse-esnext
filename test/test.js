/* global describe, it */

'use strict';

var assert = require('chai').assert,
	Rx = require('rx'),
	parseEsnext = require('..');

it('test', function (done) {
	var input = [{
			path: 'file.js',
			contents: 'x => /* transform */x * 2'
		}],
		expected = [{
			type: 'File',
			program: {
				type: 'Program',
				body: [{
					type: 'ExpressionStatement',
					expression: {
						type: 'FunctionExpression',
						params: [{
							type: 'Identifier',
							name: 'x'
						}],
						body: {
							type: 'BlockStatement',
							body: [{
								type: 'ReturnStatement',
								argument: {
									leadingComments: [{
										type: "Block",
										value: " transform "
									}],
									type: 'BinaryExpression',
									left: {type: 'Identifier', name: 'x'},
									operator: '*',
									right: {type: 'Literal', value: 2, raw: '2'}
								},
								loc: null
							}],
							loc: null
						},
						defaults: [],
						id: null,
						generator: false,
						expression: false,
						rest: null,
						async: false
					}
				}]
			},
			loc: {
				source: 'file.js'
			}
		}];

	// simulating file sequence and applying transformation
	parseEsnext({loc: false, comments: true})(Rx.Observable.fromArray(input))
	// checking against array of expected results iteratively
	.zip(expected, assert.deepEqual)
	// subscribing to check results
	.subscribe(function () {}, done, done);
});

