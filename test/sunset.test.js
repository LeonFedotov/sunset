const { expect } = require('chai')
const request = require('superagent')
const { getSunsetTime } = require('../src/sunset')

describe('Sunset', function () {
    it('should return sunset time for given location', async function() {
        const location = {lat: 32.0563392, lng: 34.7615647}

        const {body: {results: {sunset:rawSunset}}} = await request
            .get('https://api.sunrise-sunset.org/json')
            .query(location)
        expect((await getSunsetTime(location)).toFormat('h:mm:ss a')).to.be.equal(rawSunset)
    })
})
