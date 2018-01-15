const request = require('superagent')
const log = require('debug')('sunset:log')
const error = require('debug')('sunset:error')
const {DateTime: dt} = require('luxon')

const getSunsetTime = async (location) => (
    log('Requesting sunset time for location', location),
    await request
        .get('https://api.sunrise-sunset.org/json')
        .query(location)
        .then(({body:{ results: {sunset}}}) => dt.fromString(sunset, 'h:mm:ss a'))
        .catch(error)
)
module.exports = { getSunsetTime }
