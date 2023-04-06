const Joi = require('joi');
const { password, objectId, phoneNumber } = require('./custom.validation');

const createUser = {
  body: Joi.object().keys({
    email: Joi.string().email().allow('', null),
    name: Joi.string().required(),
    role: Joi.string().valid('user', 'admin'),
    phone: Joi.string().custom(phoneNumber).allow('', null),
    gender: Joi.string().valid('male', 'female'),
    orgId: Joi.string().required().custom(objectId),
  }),
};

const getUsers = {
  query: Joi.object().keys({
    name: Joi.string(),
    role: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getUser = {
  params: Joi.object().keys({
    userId: Joi.string().custom(objectId),
  }),
};

const updateUser = {
  params: Joi.object().keys({
    userId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      email: Joi.string().email().allow(null, ''),
      password: Joi.string().custom(password),
      name: Joi.string(),
      phone: Joi.string().custom(phoneNumber).allow('', null),
      gender: Joi.string().valid('male', 'female'),
    })
    .min(1),
};

const deleteUser = {
  params: Joi.object().keys({
    userId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
};
