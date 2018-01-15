const { expect } = require('chai')
const request = require('superagent')
const debug = require('debug')
const [error, log] = [debug('app:error'), debug('app:log')]

const { getDrivingTime } = require('../src/shore')

describe('Shore', function () {
    it('Should find the closest beach to my given location')
    it('Should provide driving time from point a to point b', async function() {
    	const location = {lat: 32.0563392, lng: 34.7615647}
    	const drivingTime = await getDrivingTime(location, location)
        expect(drivingTime.toFormat('mm')).to.be.equal('00')
    })
})
