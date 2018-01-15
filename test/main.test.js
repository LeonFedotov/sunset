const { expect } = require('chai')
const { isItPossible } = require('../src')

describe('Main function', function () {
    it('Should figure out if its possible to drive to the beach in time for sunset', async function() {
        const location = {lat: 32.0563392, lng: 34.7615647}
        expect(await isItPossible(location)).to.be.eql(false)
    })
})
