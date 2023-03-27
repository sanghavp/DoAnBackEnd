const httpStatus = require('http-status');
const { Place } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a Place
 * @param {Object} PlaceBody
 * @returns {Promise<Place>}
 */
const createPlace = async (PlaceBody) => {
  const Place = await Place.create(PlaceBody);
  return Place;
};

/**
 * Query for Places
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryPlaces = async (filter, options) => {
  const Places = await Place.paginate(filter, options);
  return Places;
};

/**
 * Get Place by id
 * @param {ObjectId} id
 * @returns {Promise<Place>}
 */
const getPlaceById = async (id) => {
  return Place.findById(id);
};

/**
 * Update Place by id
 * @param {ObjectId} PlaceId
 * @param {Object} updateBody
 * @returns {Promise<Place>}
 */
const updatePlaceById = async (PlaceId, updateBody) => {
  const Place = await getPlaceById(PlaceId);
  if (!Place) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Place not found');
  }
  Object.assign(Place, updateBody);
  await Place.save();
  return Place;
};

/**
 * Delete Place by id
 * @param {ObjectId} PlaceId
 * @returns {Promise<Place>}
 */
const deletePlaceById = async (PlaceId) => {
  const Place = await getPlaceById(PlaceId);
  if (!Place) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Place not found');
  }
  await Place.remove();
  return Place;
};

module.exports = {
  createPlace,
  queryPlaces,
  getPlaceById,
  updatePlaceById,
  deletePlaceById,
};
