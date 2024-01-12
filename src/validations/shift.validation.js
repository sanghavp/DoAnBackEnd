const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createShift = {
  body: Joi.object().keys(
      {
		name: Joi.string(),
		time_start: Joi.date(),
		time_end: Joi.number(),
		from_date: Joi.date(),
		to_date: Joi.date(),
		code: Joi.string(),
		max_time_late: Joi.number(),
		description: Joi.string(),
	}
  ),
};

const getShifts = {
  query: Joi.object().keys(
      {
		page: Joi.number(),
		limit: Joi.number(),
    name: Joi.string(),
	}
  ),
};

const getShift = {
  params: Joi.object().keys({
    shiftId: Joi.string().custom(objectId),
  }),
};

const updateShift = {
  params: Joi.object().keys({
    shiftId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
		name: Joi.string(),
		time_start: Joi.date(),
		time_end: Joi.number(),
		from_date: Joi.date(),
		to_date: Joi.date(),
		code: Joi.string(),
		max_time_late: Joi.number(),
		description: Joi.string(),
	})
    .min(1),
};

const deleteShift = {
  params: Joi.object().keys({
    shiftId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createShift,
  getShifts,
  getShift,
  updateShift,
  deleteShift,
};
