const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { placeService } = require('../services');

const createPlace = catchAsync(async (req, res) => {
  const place = await placeService.createPlace(req.body);
  res.status(httpStatus.CREATED).send(place);
});

const getPlaces = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['time', 'lat', 'long', 'name', 'r', 'address', 'org_id']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await placeService.queryPlaces(filter, options);
  res.send(result);
});

const getPlace = catchAsync(async (req, res) => {
  const place = await placeService.getPlaceById(req.params.placeId);
  if (!place) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Place not found');
  }
  res.send(place);
});

const updatePlace = catchAsync(async (req, res) => {
  const place = await placeService.updatePlaceById(req.params.placeId, req.body);
  res.send(place);
});

const deletePlace = catchAsync(async (req, res) => {
  await placeService.deletePlaceById(req.params.placeId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createPlace,
  getPlaces,
  getPlace,
  updatePlace,
  deletePlace,
};
