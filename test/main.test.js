const { expect } = require('chai')
const { isItPossible } = require('../src')

describe('Main function', function () {
    it('Should figure out if its possible to drive to the beach in time for sunset', async function() {
        const location = 'bugrashov 1 tel aviv'
        expect(await isItPossible(location)).to.be.eql(true)
    })
})
