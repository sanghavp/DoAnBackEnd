const httpStatus = require('http-status');
const { Division } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a division
 * @param {Object} divisionBody
 * @returns {Promise<Division>}
 */
const createDivision = async (divisionBody) => {
  const division = await Division.create(divisionBody);
  return division;
};

/**
 * Query for divisions
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryDivisions = async (filter, options) => {
  const divisions = await Division.paginate(filter, options);
  return divisions;
};

/**
 * Get division by id
 * @param {ObjectId} id
 * @returns {Promise<Division>}
 */
const getDivisionById = async (id) => {
  return Division.findById(id);
};

/**
 * Update division by id
 * @param {ObjectId} divisionId
 * @param {Object} updateBody
 * @returns {Promise<Division>}
 */
const updateDivisionById = async (divisionId, updateBody) => {
  const division = await getDivisionById(divisionId);
  if (!division) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Division not found');
  }
  Object.assign(division, updateBody);
  await division.save();
  return division;
};

/**
 * Delete division by id
 * @param {ObjectId} divisionId
 * @returns {Promise<Division>}
 */
const deleteDivisionById = async (divisionId) => {
  const division = await getDivisionById(divisionId);
  if (!division) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Division not found');
  }
  await division.remove();
  return division;
};

module.exports = {
  createDivision,
  queryDivisions,
  getDivisionById,
  updateDivisionById,
  deleteDivisionById,
};
