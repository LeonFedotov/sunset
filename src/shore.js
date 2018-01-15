const log = require('debug')('shore:log')
const error = require('debug')('shore:error')
const { Duration } = require('luxon')
const googleMaps = require('@google/maps')
const client = googleMaps.createClient({  key: process.env.GOOGLE_MAPS_API_KEY, Promise: Promise })

const addressFromCoords = async ({lat, lng}) => await client
        .reverseGeocode({latlng: [lat, lng]})
        .asPromise()
        .then(({ json: { results: [ { formatted_address } ] } }) => formatted_address)

const getDrivingTime = async (source, target) => {
    log('getting driving time for ', {source, target})
    const origin = addressFromCoords(source)
    const destination = addressFromCoords(target)
    try {
        const res = await client.distanceMatrix({
            origins: [origin],
            destinations: [destination],
            departure_time: Date.now(),
            mode: 'driving',
            avoid: ['tolls', 'ferries'],
            traffic_model: 'best_guess'
        })
        .asPromise()
        .then(({
            json: {
                rows: [ {
                    elements: [ {
                        duration: {
                            value: seconds
                        }
                    }]
                }]
            }
        }) => Duration.fromObject({seconds}))
        return res
    } catch(err) {
        error(err)
        return Duration.fromObject({seconds: 0})
    }

}

module.exports = { getDrivingTime }
