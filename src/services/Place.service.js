const httpStatus = require('http-status');
const { Place } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a place
 * @param {Object} placeBody
 * @returns {Promise<Place>}
 */
const createPlace = async (placeBody) => {
  const place = await Place.create(placeBody);
  return place;
};

/**
 * Query for places
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryPlaces = async (filter, options) => {
  const places = await Place.paginate(filter, options);
  return places;
};

/**
 * Get place by id
 * @param {ObjectId} id
 * @returns {Promise<Place>}
 */
const getPlaceById = async (id) => {
  return Place.findById(id);
};

/**
 * Update place by id
 * @param {ObjectId} placeId
 * @param {Object} updateBody
 * @returns {Promise<Place>}
 */
const updatePlaceById = async (placeId, updateBody) => {
  const place = await getPlaceById(placeId);
  if (!place) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Place not found');
  }
  Object.assign(place, updateBody);
  await place.save();
  return place;
};

/**
 * Delete place by id
 * @param {ObjectId} placeId
 * @returns {Promise<Place>}
 */
const deletePlaceById = async (placeId) => {
  const place = await getPlaceById(placeId);
  if (!place) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Place not found');
  }
  await place.remove();
  return place;
};

module.exports = {
  createPlace,
  queryPlaces,
  getPlaceById,
  updatePlaceById,
  deletePlaceById,
};
