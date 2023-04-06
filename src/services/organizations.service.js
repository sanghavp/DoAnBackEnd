const httpStatus = require('http-status');
const { Organizations } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a organizations
 * @param {Object} organizationsBody
 * @returns {Promise<Organizations>}
 */
const createOrganizations = async (organizationsBody) => {
  const organizations = await Organizations.create(organizationsBody);
  return organizations;
};

/**
 * Query for organizationss
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryOrganizationss = async (filter, options) => {
  const organizationss = await Organizations.paginate(filter, options);
  return organizationss;
};

/**
 * Get organizations by id
 * @param {ObjectId} id
 * @returns {Promise<Organizations>}
 */
const getOrganizationsById = async (id) => {
  return Organizations.findById(id);
};

/**
 * Update organizations by id
 * @param {ObjectId} organizationsId
 * @param {Object} updateBody
 * @returns {Promise<Organizations>}
 */
const updateOrganizationsById = async (organizationsId, updateBody) => {
  const organizations = await getOrganizationsById(organizationsId);
  if (!organizations) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Organizations not found');
  }
  Object.assign(organizations, updateBody);
  await organizations.save();
  return organizations;
};

/**
 * Delete organizations by id
 * @param {ObjectId} organizationsId
 * @returns {Promise<Organizations>}
 */
const deleteOrganizationsById = async (organizationsId) => {
  const organizations = await getOrganizationsById(organizationsId);
  if (!organizations) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Organizations not found');
  }
  await organizations.remove();
  return organizations;
};

module.exports = {
  createOrganizations,
  queryOrganizationss,
  getOrganizationsById,
  updateOrganizationsById,
  deleteOrganizationsById,
};
