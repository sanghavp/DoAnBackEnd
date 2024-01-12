const httpStatus = require('http-status');
const { User } = require('../models');
const ApiError = require('../utils/ApiError');

roles = {
  admin: ["admin", "manager", "leader", "user"],
  manager: ["manager", "leader", "user"] ,
  leader: ["leader", "user"],
}

/**
 * Create a user
 * @param {Object} userBody
 * @returns {Promise<User>}
 */
const createUser = async (userBody) => {
  if (await User.isUserNameTaken(userBody.username)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'user name already taken');
  }
  return User.create(userBody);
};

/**
 * Query for users
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryUsers = async (filter, options) => {
  
  // lấy thông tin user theo nhiều role
  if ( filter.role) {
    filter.role = { $in: filter.role.split(',') };
  }else {
    filter.role = roles[`${options.user.role}`]
  }
  // console.log(filter.role, options.user);

  // lấy thông tin user của nhiều tổ chức
  if ( filter.org_ids) {
    filter.org_ids = { $in: filter.org_ids.split(',') };
  }else {
    filter.org_ids = { $in: options.user.org_ids };
  }
  const users = await User.paginate(filter, options);
  return users;
};

/**
 * Get user by id
 * @param {ObjectId} id
 * @returns {Promise<User>}
 */
const getUserById = async (id) => {
  // const org = 
  return User.findById(id);
};

/**
 * Get user by user name
 * @param {string} email
 * @returns {Promise<User>}
 */
const getUserByUserName = async (username) => {
  return User.findOne({ username });
};

/**
 * Update user by id
 * @param {ObjectId} userId
 * @param {Object} updateBody
 * @returns {Promise<User>}
 */
const updateUserById = async (userId, updateBody) => {
  const user = await getUserById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  if (updateBody.username && (await User.isUserNameTaken(updateBody.email, userId))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Ten tai khoan khong dung!');
  }
  Object.assign(user, updateBody);
  await user.save();
  console.log("user seervice");
  return user;
};

/**
 * Delete user by id
 * @param {ObjectId} userId
 * @returns {Promise<User>}
 */
const deleteUserById = async (userId) => {
  const user = await getUserById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  await user.remove();
  return user;
};

module.exports = {
  createUser,
  queryUsers,
  getUserById,
  getUserByUserName,
  updateUserById,
  deleteUserById,
};
