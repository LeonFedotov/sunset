require('dotenv/config')
const { isItPossible } = require('./lib')
exports.isItPossible = function isItPossible (req, res) {
    const location = 'broadway ny'
    isItPossible(location ).then(function(answer) {
        res.send('Hello World!'+answer)
    })
};
