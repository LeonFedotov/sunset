require('dotenv/config')
const { isItPossible } = require('./lib')
exports.isItPossible = function isItPossible (req, res) {
	res.send(req.body)
	// isItPossible(req.body.location).then(function(answer) {
	// 	res.send('Hello World!'+answer)
	// })
};
