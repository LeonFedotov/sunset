const { getDrivingTime, getBeachLocation } = require('./shore')
const { getSunsetTime } = require('./sunset')
const { DateTime, Interval } = require('luxon')
const log = require('debug')('app:main:log')
const isItPossible = async (location) => {
    const sunset = await getSunsetTime(location)
    const beach = await getBeachLocation(location)
    const time = await getDrivingTime(location, beach)
    const {hours, minutes} = Interval.fromDateTimes(DateTime.local(), sunset).toDuration().shiftTo('hours', 'minutes').toObject()
    log(`Sunset is in ${hours} hours and ${minutes} minutes.`)
    return DateTime.local().plus(time) > sunset
}
module.exports = { isItPossible }
