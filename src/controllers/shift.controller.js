const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { shiftService } = require('../services');

const createShift = catchAsync(async (req, res) => {
  const shift = await shiftService.createShift(req.body);
  res.status(httpStatus.CREATED).send(shift);
});

const getShifts = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'time_start', 'time_end', 'from_date', 'to_date', 'code', 'max_time_late', 'description', '']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await shiftService.queryShifts(filter, options);
  res.send(result);
});

const getShift = catchAsync(async (req, res) => {
  const shift = await shiftService.getShiftById(req.params.shiftId);
  if (!shift) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Shift not found');
  }
  res.send(shift);
});

const updateShift = catchAsync(async (req, res) => {
  const shift = await shiftService.updateShiftById(req.params.shiftId, req.body);
  res.send(shift);
});

const deleteShift = catchAsync(async (req, res) => {
  await shiftService.deleteShiftById(req.params.shiftId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createShift,
  getShifts,
  getShift,
  updateShift,
  deleteShift,
};
