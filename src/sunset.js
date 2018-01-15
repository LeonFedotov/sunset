const request = require('superagent')
const log = require('debug')('app:sunset:log')
const error = require('debug')('app:sunset:error')
const {DateTime: dt} = require('luxon')

const getSunsetTime = async (location) => (
    log('Requesting sunset time for location', location),
    await request
        .get('https://api.sunrise-sunset.org/json')
        .query({date: dt.local().toISODate(), ...location})
        .then(({body:{ results: {sunset}}}) => dt
                .fromString(sunset, 'h:mm:ss a')
                .setZone('utc', {keepLocalTime: true})
                .toLocal()
        )
        .then(time => (
            log(`Sunset is at ${time.toISO()}`),
            time
        ))
        .catch(error)
)
module.exports = { getSunsetTime }
