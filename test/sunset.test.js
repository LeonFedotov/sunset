const { expect } = require('chai')
const request = require('superagent')
const { getSunsetTime } = require('../src/sunset')
const _ = require('lodash')
const {DateTime} = require('luxon')
const {geocode} = require('../src/utils')
describe('Sunset', function () {
    it('should return sunset time for given location', async function() {

        const location = await geocode('bugrashov 1 tel aviv')

        const sunset = await request
            .get('https://api.sunrise-sunset.org/json')
            .query({date: DateTime.local().toISODate(), ...location})
            .then((res) => _.get(res, 'body.results.sunset'))
            .then(sunset => DateTime
                .fromString(sunset, 'h:mm:ss a')
                .setZone('utc', {keepLocalTime: true})
                .toLocal()
            )
        expect(await getSunsetTime(location)).to.be.eql(sunset)
    })
})
