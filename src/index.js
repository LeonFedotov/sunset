const _ = require('lodash')
const { getDrivingTime, getBeachLocation } = require('./shore')
const { geocode, getLocalTimezone } = require('./utils')
const { getSunsetTime } = require('./sunset')
const { DateTime, Interval } = require('luxon')
const log = require('debug')('app:main:log')
const isItPossible = async (input) => {
    const location = _.isString(input) ? await geocode(input) : input
    const zone = await getLocalTimezone(location)
    const sunset = await getSunsetTime(location)
    const now = DateTime.local().setZone(zone)
    if(now > sunset) {
        const { hours, minutes } = Interval.fromDateTimes(sunset, now).toDuration().shiftTo('hours', 'minutes').toObject()
        log(`Sunset is was ${hours} hours and ${minutes.toFixed(0)} minutes ago.`)
        return false
    } else {
        const beach = await getBeachLocation(location)
        const time = await getDrivingTime(location, beach)
        const { hours, minutes } = Interval.fromDateTimes(now, sunset).toDuration().shiftTo('hours', 'minutes').toObject()
        log(`Sunset is in ${hours} hours and ${minutes.toFixed(0)} minutes.`)
        return now.plus(time) < sunset
    }

}
module.exports = { isItPossible }
