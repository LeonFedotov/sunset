const { expect } = require('chai')
const request = require('superagent')
const { getSunsetTime } = require('../src/sunset')
const _ = require('lodash')
const {DateTime} = require('luxon')
const {geocode, getLocalTimezone} = require('../src/utils')
const log = require('debug')('app:sunset:test:log')
describe('Sunset', function () {
    it('should return sunset time for given location', async function() {

        const location = await geocode('bugrashov 1 tel aviv')
        const zone = await getLocalTimezone(location)
        const date = DateTime.local().setZone(zone).toISODate()
        const sunset = await request
            .get('https://api.sunrise-sunset.org/json')
            .query({date, ...location})
            .then((res) => _.get(res, 'body.results.sunset'))
            .then(sunset => (
                log(`${date} ${sunset}`),
                DateTime
                .fromFormat(`${date} ${sunset}`, 'yyyy-MM-dd h:mm:ss a', {zone: 'utc'})
                .setZone(zone)
            ))
        expect(await getSunsetTime(location)).to.be.eql(sunset)
    })
})
