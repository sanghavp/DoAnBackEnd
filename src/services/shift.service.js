const httpStatus = require('http-status');
const { Shift } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a shift
 * @param {Object} shiftBody
 * @returns {Promise<Shift>}
 */
const createShift = async (shiftBody) => {
  const shift = await Shift.create(shiftBody);
  return shift;
};

/**
 * Query for shifts
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryShifts = async (filter, options) => {
  const shifts = await Shift.paginate(filter, options);
  return shifts;
};

/**
 * Get shift by id
 * @param {ObjectId} id
 * @returns {Promise<Shift>}
 */
const getShiftById = async (id) => {
  return Shift.findById(id);
};

/**
 * Update shift by id
 * @param {ObjectId} shiftId
 * @param {Object} updateBody
 * @returns {Promise<Shift>}
 */
const updateShiftById = async (shiftId, updateBody) => {
  const shift = await getShiftById(shiftId);
  if (!shift) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Shift not found');
  }
  Object.assign(shift, updateBody);
  await shift.save();
  return shift;
};

/**
 * Delete shift by id
 * @param {ObjectId} shiftId
 * @returns {Promise<Shift>}
 */
const deleteShiftById = async (shiftId) => {
  const shift = await getShiftById(shiftId);
  if (!shift) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Shift not found');
  }
  await shift.remove();
  return shift;
};

module.exports = {
  createShift,
  queryShifts,
  getShiftById,
  updateShiftById,
  deleteShiftById,
};
