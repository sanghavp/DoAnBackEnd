const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { organizationsService } = require('../services');

const createOrganizations = catchAsync(async (req, res) => {
  const organizations = await organizationsService.createOrganizations(req.body);
  res.status(httpStatus.CREATED).send(organizations);
});

const getOrganizationss = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['code', 'name', 'fullname', 'email', 'phone', 'leader', 'place']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await organizationsService.queryOrganizationss(filter, options);
  res.send(result);
});

const getOrganizations = catchAsync(async (req, res) => {
  const organizations = await organizationsService.getOrganizationsById(req.params.organizationsId);
  if (!organizations) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Organizations not found');
  }
  res.send(organizations);
});

const updateOrganizations = catchAsync(async (req, res) => {
  const organizations = await organizationsService.updateOrganizationsById(req.params.organizationsId, req.body);
  res.send(organizations);
});

const deleteOrganizations = catchAsync(async (req, res) => {
  await organizationsService.deleteOrganizationsById(req.params.organizationsId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createOrganizations,
  getOrganizationss,
  getOrganizations,
  updateOrganizations,
  deleteOrganizations,
};
