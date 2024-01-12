const Joi = require('joi');
const { password, objectId, phoneNumber } = require('./custom.validation');

const createUser = {
  body: Joi.object().keys({
    username: Joi.string().required(),
    email: Joi.string().email().allow("", null),
    name: Joi.string().required(),
    role: Joi.string().valid('user', 'manager', 'leader', 'admin'),
    phone: Joi.string().custom(phoneNumber).allow('', null),
    gender: Joi.string().valid('male', 'female'),
    org_ids: Joi.array().items(Joi.string().custom(objectId)),
    password: Joi.string().required()
  }),
};

const getUsers = {
  query: Joi.object().keys({
    name: Joi.string(),
    username: Joi.string(),
    role: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
    org_ids: Joi.string()
  }),
};

const getUser = {
  params: Joi.object().keys({
    org_ids: Joi.array().items(Joi.string().custom(objectId)),
    userId: Joi.string().custom(objectId),
  }),
};

const getCurentUser = {
  params: Joi.object().keys({
    none: Joi.string()
  }),
};

const updateUser = {
  params: Joi.object().keys({
    userId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      email: Joi.string().email().allow(null, ''),
      name: Joi.string(),
      phone: Joi.string().custom(phoneNumber).allow('', null),
      gender: Joi.string().valid('male', 'female'),
      role: Joi.string().valid("admin", "manager", "leader", "user" ),
      org_ids: Joi.array().items(Joi.string().custom(objectId)),
    })
    .min(1),
};

const changePassword = {
  params: Joi.object().keys({
      userId: Joi.string().custom(objectId),
    }),
    body: Joi.object()
    .keys({
        password: Joi.string().custom(password).required(),
      })
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
  getCurentUser,
  updateUser,
  deleteUser,
  changePassword,
};
