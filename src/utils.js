const googleMaps = require('@google/maps')
const client = googleMaps.createClient({  key: process.env.GOOGLE_MAPS_API_KEY, Promise: Promise })
const _ = require('lodash')
const log = require('debug')('app:utils:log')
const geocode = async (address) => await client
    .geocode({address})
    .asPromise()
    .then((res) => _.get(res, 'json.results.0.geometry.location', {lat: 0, lng: 0}))

const addressFromCoords = async ({lat, lng}) => await client
        .reverseGeocode({latlng: [lat, lng]})
        .asPromise()
        .then(({ json: { results: [ { formatted_address } ] } }) => formatted_address)

const getLocalTimezone = async (location) => (
    log('Getting local timezone...'),
    await client
        .timezone({location})
        .asPromise()
        .then(res => _.get(res, 'json.timeZoneId', 'utc'))
        .then((tz) => (log(tz), tz))
)

module.exports = { googleAPI: client, geocode, addressFromCoords, getLocalTimezone }
