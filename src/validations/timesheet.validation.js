const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createTimesheet = {
  body: Joi.object().keys(
      {
		lat: Joi.number().required(),
		long: Joi.number().required(),
		email: Joi.string(),
		target: Joi.string().custom(objectId),
		shift: Joi.string(),
		name: Joi.string(),
		status: Joi.string(),
		datetime: Joi.number(),
		address: Joi.string(),
	}
  ),
};

const getTimesheets = {
  query: Joi.object().keys(
      {
		email: Joi.string(),
		target: Joi.string(),
		shift: Joi.string(),
		name: Joi.string(),
		status: Joi.string(),
		datetime: Joi.number(),
		address: Joi.string(),
		user: Joi.string().custom(objectId),
		timeStart: Joi.number(),
		timeEnd: Joi.number(),
		page: Joi.number(),
		limit: Joi.number(),
	}
  ),
};

const getTimesheet = {
  params: Joi.object().keys({
    timesheetId: Joi.string().custom(objectId),
  }),
};

// const updateTimesheet = {
//   params: Joi.object().keys({
//     timesheetId: Joi.required().custom(objectId),
//   }),
//   body: Joi.object()
//     .keys({
// 		email: Joi.string(),
// 		target: Joi.string(),
// 		shift: Joi.string(),
// 		name: Joi.string(),
// 		status: Joi.string(),
// 		datetime: Joi.date(),
// 		address: Joi.string(),
// 		user: Joi.string(),
// 	})
//     .min(1),
// };

const deleteTimesheet = {
  params: Joi.object().keys({
    timesheetId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createTimesheet,
  getTimesheets,
  getTimesheet,
//   updateTimesheet,
  deleteTimesheet,
};
