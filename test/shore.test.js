const { expect } = require('chai')
const { getDrivingTime, getBeachLocation } = require('../src/shore')

describe('Shore', function () {
    it('Should find the closest beach to my given location', async function() {
        const location = {lat: 32.0563392, lng: 34.7615647}
        const beachLocation = await getBeachLocation(location)
        expect(beachLocation).to.be.eql('Beach Tel Aviv-Yafo')
    })
    it('Should provide driving time from point a to point b', async function() {
        const location = {lat: 32.0563392, lng: 34.7615647}
        const drivingTime = await getDrivingTime(location, location)
        expect(drivingTime.toFormat('mm')).to.be.equal('00')
    })
})
