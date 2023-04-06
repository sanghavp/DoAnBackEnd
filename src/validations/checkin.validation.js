const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createCheckin = {
  body: Joi.object().keys(
      {
		userId: Joi.string(),
		time: Joi.string(),
		place: Joi.array(),
		status: Joi.boolean(),
		user_name: Joi.string(),
		ca: Joi.object(),
	}
  ),
};

const getCheckins = {
  query: Joi.object().keys(
      {
		userId: Joi.string(),
		time: Joi.string(),
		place: Joi.array(),
		status: Joi.boolean(),
		user_name: Joi.string(),
		ca: Joi.object(),
	}
  ),
};

const getCheckin = {
  params: Joi.object().keys({
    checkinId: Joi.string().custom(objectId),
  }),
};

const updateCheckin = {
  params: Joi.object().keys({
    checkinId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
		userId: Joi.string(),
		time: Joi.string(),
		place: Joi.array(),
		status: Joi.boolean(),
		user_name: Joi.string(),
		ca: Joi.object(),
	})
    .min(1),
};

const deleteCheckin = {
  params: Joi.object().keys({
    checkinId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createCheckin,
  getCheckins,
  getCheckin,
  updateCheckin,
  deleteCheckin,
};
