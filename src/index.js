const { getDrivingTime, getBeachLocation } = require('./shore')
const { getSunsetTime } = require('./sunset')
const { DateTime } = require('luxon')
const log = require('debug')('main:log')
const isItPossible = async (location) => {
	const sunset = await getSunsetTime(location)
	const beach = await getBeachLocation(location)
	const time = await getDrivingTime(location, beach)
	return DateTime.local().plus(time) > sunset
}
module.exports = { isItPossible }
