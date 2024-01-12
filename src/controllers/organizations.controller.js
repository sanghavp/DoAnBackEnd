const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { organizationsService, userService } = require('../services');

const createOrganizations = catchAsync(async (req, res) => {
  // console.log({req})
  const organizations = await organizationsService.createOrganizations(req.body);
  const user = await userService.getUserById(req.user._id)
  let org_ids = user.org_ids;
  org_ids.push(organizations.id)
  Object.assign(user, {org_ids});
  await user.save();
  console.log("org_ids: ", {orgids: org_ids, orgId: organizations.id});
  res.status(httpStatus.CREATED).send(organizations);
});

const getOrganizationss = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['code', 'name', 'fullname', 'email', 'phone', 'leader', 'place']);
  const query = pick(req.query, ['sortBy', 'limit', 'page']);
  const options = Object.assign(query, {populate: 'leader'});
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
  const organizations = await organizationsService.updateOrganizationsById(req.params.organizationsId, req);
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
