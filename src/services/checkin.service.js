const httpStatus = require('http-status');
const { Checkin } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a checkin
 * @param {Object} checkinBody
 * @returns {Promise<Checkin>}
 */
const createCheckin = async (checkinBody) => {
  const checkin = await Checkin.create(checkinBody);
  return checkin;
};

/**
 * Query for checkins
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryCheckins = async (filter, options) => {
  const checkins = await Checkin.paginate(filter, options);
  return checkins;
};

/**
 * Get checkin by id
 * @param {ObjectId} id
 * @returns {Promise<Checkin>}
 */
const getCheckinById = async (id) => {
  return Checkin.findById(id);
};

/**
 * Update checkin by id
 * @param {ObjectId} checkinId
 * @param {Object} updateBody
 * @returns {Promise<Checkin>}
 */
const updateCheckinById = async (checkinId, updateBody) => {
  const checkin = await getCheckinById(checkinId);
  if (!checkin) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Checkin not found');
  }
  Object.assign(checkin, updateBody);
  await checkin.save();
  return checkin;
};

/**
 * Delete checkin by id
 * @param {ObjectId} checkinId
 * @returns {Promise<Checkin>}
 */
const deleteCheckinById = async (checkinId) => {
  const checkin = await getCheckinById(checkinId);
  if (!checkin) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Checkin not found');
  }
  await checkin.remove();
  return checkin;
};

module.exports = {
  createCheckin,
  queryCheckins,
  getCheckinById,
  updateCheckinById,
  deleteCheckinById,
};
