'use strict';

var parse = require('esprima').parse;
var transform = require('esnext').transform;
var traverse = require('estraverse').traverse;
var attachComments = require('estraverse').attachComments;

module.exports = function (options) {
	options = options || {};

	var loc = options.loc !== false;
	var attachComment = !!options.comments;

	return function (files) {
		return files.map(function (file) {
			var ast = parse(file.contents, {
				loc: loc,
				source: file.path,
				range: attachComment,
				tokens: attachComment,
				comment: attachComment
			});

			if (attachComment) {
				attachComments(ast, ast.comments, ast.tokens);
				
				delete ast.comments;
				delete ast.tokens;

				traverse(ast, {
					leave: function (node) {
						delete node.range;

						[node.leadingComments, node.trailingComments].forEach(function (comments) {
							if (!comments) {
								return;
							}

							comments.forEach(function (comment) {
								delete comment.range;
								delete comment.extendedRange;
							});
						});
					}
				});
			}

			ast = transform(ast);

			return {
				type: 'File',
				program: ast,
				loc: {
					source: file.path
				}
			};
		});
	};
};
