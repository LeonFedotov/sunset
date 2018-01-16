const { isItPossible } = require('./lib')
exports.isItPossible = function isItPossible (req, res) {
	isItPossible(req.body.location).then(function(answer) {
		res.send('Hello World!'+answer)
	})
};
