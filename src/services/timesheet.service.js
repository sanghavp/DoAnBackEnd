const httpStatus = require('http-status');
const { Timesheet } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a timesheet
 * @param {Object} timesheetBody
 * @returns {Promise<Timesheet>}
 */
const createTimesheet = async (user, timesheetBody) => {
  console.log("creat timesheet servirce: user", user);
  const timesheet = await Timesheet.create(Object.assign(timesheetBody, {user: user._id}));
  return timesheet;
};

/**
 * Query for timesheets
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryTimesheets = async (filter, options) => {
  options = Object.assign({}, options, {populate: 'user, target'});
  if(options.timeStart && options.timeEnd) {
    const timeStart = new Date(options.timeStart)
    const timeEnd = new Date(options.timeEnd)
    filter.createdAt = {
      $gte: timeStart , $lte: timeEnd
    }
  }
  const timesheets = await Timesheet.paginate(filter, options);
  console.log("kết quả của timesheets tại ts service: ", timesheets);
  return timesheets;
};

/**
 * Get timesheet by id
 * @param {ObjectId} id
 * @returns {Promise<Timesheet>}
 */
const getTimesheetById = async (id) => {
  return Timesheet.findById(id);
};

/**
 * Update timesheet by id
 * @param {ObjectId} timesheetId
 * @param {Object} updateBody
 * @returns {Promise<Timesheet>}
 */
const updateTimesheetById = async (timesheetId, updateBody) => {
  const timesheet = await getTimesheetById(timesheetId);
  if (!timesheet) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Timesheet not found');
  }
  Object.assign(timesheet, updateBody);
  await timesheet.save();
  return timesheet;
};

/**
 * Delete timesheet by id
 * @param {ObjectId} timesheetId
 * @returns {Promise<Timesheet>}
 */
const deleteTimesheetById = async (timesheetId) => {
  const timesheet = await getTimesheetById(timesheetId);
  if (!timesheet) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Timesheet not found');
  }
  await timesheet.remove();
  return timesheet;
};

module.exports = {
  createTimesheet,
  queryTimesheets,
  getTimesheetById,
  updateTimesheetById,
  deleteTimesheetById,
};
