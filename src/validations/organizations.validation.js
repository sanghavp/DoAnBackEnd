const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createOrganizations = {
  body: Joi.object().keys({
    code: Joi.string(),
    name: Joi.string(),
    fullname: Joi.string(),
    email: Joi.string(),
    phone: Joi.string(),
    leader: Joi.string(),
    place: Joi.array(),
  }),
};

const getOrganizationss = {
  query: Joi.object().keys({
    code: Joi.string(),
    name: Joi.string(),
    fullname: Joi.string(),
    email: Joi.string(),
    phone: Joi.string(),
    leader: Joi.string(),
    place: Joi.array(),
  }),
};

const getOrganizations = {
  params: Joi.object().keys({
    organizationsId: Joi.string().custom(objectId),
  }),
};

const updateOrganizations = {
  params: Joi.object().keys({
    organizationsId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      code: Joi.string(),
      name: Joi.string(),
      fullname: Joi.string(),
      email: Joi.string(),
      phone: Joi.string(),
      leader: Joi.string(),
      place: Joi.array(),
    })
    .min(1),
};

const deleteOrganizations = {
  params: Joi.object().keys({
    organizationsId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createOrganizations,
  getOrganizationss,
  getOrganizations,
  updateOrganizations,
  deleteOrganizations,
};
