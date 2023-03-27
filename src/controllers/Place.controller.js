const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { PlaceService } = require('../services');

const createPlace = catchAsync(async (req, res) => {
  const Place = await PlaceService.createPlace(req.body);
  res.status(httpStatus.CREATED).send(Place);
});

const getPlaces = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['time', 'lat', 'long', 'name', 'r', 'address']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await PlaceService.queryPlaces(filter, options);
  res.send(result);
});

const getPlace = catchAsync(async (req, res) => {
  const Place = await PlaceService.getPlaceById(req.params.PlaceId);
  if (!Place) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Place not found');
  }
  res.send(Place);
});

const updatePlace = catchAsync(async (req, res) => {
  const Place = await PlaceService.updatePlaceById(req.params.PlaceId, req.body);
  res.send(Place);
});

const deletePlace = catchAsync(async (req, res) => {
  await PlaceService.deletePlaceById(req.params.PlaceId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createPlace,
  getPlaces,
  getPlace,
  updatePlace,
  deletePlace,
};
