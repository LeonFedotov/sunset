const request = require('superagent')
const log = require('debug')('app:sunset:log')
const error = require('debug')('app:sunset:error')
const { DateTime } = require('luxon')
const { getLocalTimezone } = require('./utils')

const getSunsetTime = async (location) => {
    const zone = await getLocalTimezone(location)
    const date = DateTime.local().setZone(zone).toISODate()

    log('Requesting sunset time for location', {location, date: DateTime.local().setZone(zone)})
    return await request
        .get('https://api.sunrise-sunset.org/json')
        .query({date, ...location})
        .then(({body:{ results: {sunset}}}) => DateTime
            .fromFormat(`${date} ${sunset}`, 'yyyy-MM-dd h:mm:ss a', {zone: 'utc'})
            .setZone(zone)
        )
        .then(time => (
            log(`Sunset is at ${time}`),
            time
        ))
        .catch(error)
}

module.exports = { getSunsetTime }
