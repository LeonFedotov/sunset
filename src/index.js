const _ = require('lodash')
const { getDrivingTime, getBeachLocation } = require('./shore')
const { geocode } = require('./utils')
const { getSunsetTime } = require('./sunset')
const { DateTime, Interval } = require('luxon')
const log = require('debug')('app:main:log')
const isItPossible = async (input) => {
    const location = _.isString(input) ? await geocode(input) : input
    const sunset = await getSunsetTime(location)
    const beach = await getBeachLocation(location)
    const time = await getDrivingTime(location, beach)
    const { hours, minutes } = Interval.fromDateTimes(DateTime.local(), sunset).toDuration().shiftTo('hours', 'minutes').toObject()
    log(`Sunset is in ${hours} hours and ${minutes.toFixed(0)} minutes.`)
    return DateTime.local().plus(time) < sunset
}
module.exports = { isItPossible }
