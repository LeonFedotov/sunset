const log = require('debug')('app:shore:log')

const { Duration } = require('luxon')
const _ = require('lodash')
const { googleAPI: client, geocode } = require('./utils')
const getDrivingTime = async (source, target) => {
    log('Getting driving time for ', {source, target})
    const origin = _.isString(source) ? source : [source.lat, source.lng]
    const destination = _.isString(target) ? target : [target.lat, target.lng]
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
    .then(duration => (log('Got duration', duration.shiftTo('hours', 'minutes').toObject()), duration))
}

const getBeachLocation = async (input) => {
    const {lat, lng} = _.isString(input) ? await geocode(input) : input
    log('Getting close city for beach', {lat, lng})
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
        .then(city => (log(`Found city close by: ${city}`), city))

    return `Beach ${city}`
}



module.exports = { getDrivingTime, getBeachLocation }
