const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createDivision = {
  body: Joi.object().keys(
      {
		org_id: Joi.string(),
		createdBy: Joi.object(),
		from_date: Joi.date(),
		to_date: Joi.date(),
		detail: Joi.object(),
		members: Joi.array(),
		id_members: Joi.array(),
		title: Joi.string(),
	}
  ),
};

const getDivisions = {
  query: Joi.object().keys(
      {
		org_id: Joi.string(),
		createdBy: Joi.object(),
		from_date: Joi.date(),
		to_date: Joi.date(),
		detail: Joi.object(),
		members: Joi.array(),
		id_members: Joi.array(),
		title: Joi.string(),
	}
  ),
};

const getDivision = {
  params: Joi.object().keys({
    divisionId: Joi.string().custom(objectId),
  }),
};

const updateDivision = {
  params: Joi.object().keys({
    divisionId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
		org_id: Joi.string(),
		createdBy: Joi.object(),
		from_date: Joi.date(),
		to_date: Joi.date(),
		detail: Joi.object(),
		members: Joi.array(),
		id_members: Joi.array(),
		title: Joi.string(),
	})
    .min(1),
};

const deleteDivision = {
  params: Joi.object().keys({
    divisionId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createDivision,
  getDivisions,
  getDivision,
  updateDivision,
  deleteDivision,
};
