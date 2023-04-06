const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { checkinService } = require('../services');

const createCheckin = catchAsync(async (req, res) => {
  const checkin = await checkinService.createCheckin(req.body);
  res.status(httpStatus.CREATED).send(checkin);
});

const getCheckins = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['userId', 'time', 'place', 'status', 'user_name', 'ca']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await checkinService.queryCheckins(filter, options);
  res.send(result);
});

const getCheckin = catchAsync(async (req, res) => {
  const checkin = await checkinService.getCheckinById(req.params.checkinId);
  if (!checkin) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Checkin not found');
  }
  res.send(checkin);
});

const updateCheckin = catchAsync(async (req, res) => {
  const checkin = await checkinService.updateCheckinById(req.params.checkinId, req.body);
  res.send(checkin);
});

const deleteCheckin = catchAsync(async (req, res) => {
  await checkinService.deleteCheckinById(req.params.checkinId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createCheckin,
  getCheckins,
  getCheckin,
  updateCheckin,
  deleteCheckin,
};
