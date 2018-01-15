const log = require('debug')('shore:log')
const error = require('debug')('shore:error')
const { Duration } = require('luxon')
const _ = require('lodash')
const googleMaps = require('@google/maps')
const client = googleMaps.createClient({  key: process.env.GOOGLE_MAPS_API_KEY, Promise: Promise })

const addressFromCoords = async ({lat, lng}) => await client
        .reverseGeocode({latlng: [lat, lng]})
        .asPromise()
        .then(({ json: { results: [ { formatted_address } ] } }) => formatted_address)

const getDrivingTime = async (source, target) => {
    log('getting driving time for ', {source, target})
    const origin = _.isString(source) ? source : await addressFromCoords(source)
    const destination = _.isString(target) ? target : await addressFromCoords(target)
    return await client.distanceMatrix({
        origins: [origin],
        destinations: [destination],
        departure_time: Date.now(),
        mode: 'driving',
        avoid: ['tolls', 'ferries'],
        traffic_model: 'best_guess'
    })
    .asPromise()
    .then(res => Duration.fromObject({seconds: _.get(res, 'json.rows.0.elements.0.duration.value', 0)}))
}

const getBeachLocation = async ({lat, lng}) => {
    const city = await client
        .reverseGeocode({latlng: [lat, lng]})
        .asPromise()
        .then(res => _.chain(res)
            .get('json.results.0.address_components', [])
            .filter(({types}) => types.includes('locality'))
            .pop()
            .get('long_name', '')
            .value()
        )

    return `Beach ${city}`
}
module.exports = { getDrivingTime, getBeachLocation }
