const httpStatus = require('http-status');
const { Organizations, User, Place } = require('../models');
const userService = require('./user.service');
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
  return Organizations.findById(id).populate('leader').exec();
};

/**
 * Update organizations by id
 * @param {ObjectId} organizationsId
 * @param {Object} updateBody
 * @returns {Promise<Organizations>}
 */
const updateOrganizationsById = async (organizationsId, req) => {
  const organizations = await getOrganizationsById(organizationsId);
  if (!organizations) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Organizations not found');
  }

  // Cập nhật thông tin cho quản lí cũ và mới
  if(req.body.leader) {
    console.log(organizations.leader);
    if(organizations.leader) {
      userService.updateUserById(organizations.leader._id,{org_ids: [req.params.organizationsId], role: "user"});
    }
    userService.updateUserById(req.body.leader,{ role: "manager"});
  }
  Object.assign(organizations, req.body);
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
  await Place.deleteMany({org_id: organizationsId})
  const users = await User.find({org_ids: organizations})
  users.forEach(async user => {
    if(user.org_ids.length == 1 && user.role != "admin") {
      await user.remove();
    } else if(user.org_ids.length > 1 ) {
      user.org_ids = user.org_ids.filter(function(element) {
        return element.toString() != organizationsId; // Chỉ giữ lại các phần tử có giá trị khác với organizationsId
      });
      console.log('user removed', user.org_ids);
      await user.save();
    }
  })
  return organizations;
};

module.exports = {
  createOrganizations,
  queryOrganizationss,
  getOrganizationsById,
  updateOrganizationsById,
  deleteOrganizationsById,
};
