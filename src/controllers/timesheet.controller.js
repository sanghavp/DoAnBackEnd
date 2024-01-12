const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { timesheetService, placeService } = require('../services');

const createTimesheet = catchAsync(async (req, res) => {
  const timesheet = await timesheetService.createTimesheet(req.user, req.body);
  await placeService.updatePlaceById(req.body.target, {status: req.body.status});
  res.status(httpStatus.CREATED).send(timesheet);
});

const getTimesheets = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['email', 'target', 'shift', 'name', 'status', 'datetime', 'address', 'user']);
  const options = pick(req.query, ['sortBy', 'limit', 'page',"timeStart", "timeEnd"]);
  const result = await timesheetService.queryTimesheets(filter, options);
  res.send(result);
});

const getTimesheet = catchAsync(async (req, res) => {
  const timesheet = await timesheetService.getTimesheetById(req.params.timesheetId);
  if (!timesheet) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Timesheet not found');
  }
  res.send(timesheet);
});

const updateTimesheet = catchAsync(async (req, res) => {
  const timesheet = await timesheetService.updateTimesheetById(req.params.timesheetId, req.body);
  res.send(timesheet);
});

const deleteTimesheet = catchAsync(async (req, res) => {
  await timesheetService.deleteTimesheetById(req.params.timesheetId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createTimesheet,
  getTimesheets,
  getTimesheet,
  updateTimesheet,
  deleteTimesheet,
};
