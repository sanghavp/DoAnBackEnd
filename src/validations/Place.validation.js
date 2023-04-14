const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createPlace = {
  body: Joi.object().keys(
      {
		time: Joi.string(),
		lat: Joi.number(),
		long: Joi.number(),
		name: Joi.string(),
		r: Joi.number(),
		address: Joi.string(),
		orgId: Joi.string(),
	}
  ),
};

const getPlaces = {
  query: Joi.object().keys(
      {
		time: Joi.string(),
		lat: Joi.number(),
		long: Joi.number(),
		name: Joi.string(),
		r: Joi.number(),
		address: Joi.string(),
		orgId: Joi.string(),
	}
  ),
};

const getPlace = {
  params: Joi.object().keys({
    placeId: Joi.string().custom(objectId),
  }),
};

const updatePlace = {
  params: Joi.object().keys({
    placeId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
		time: Joi.string(),
		lat: Joi.number(),
		long: Joi.number(),
		name: Joi.string(),
		r: Joi.number(),
		address: Joi.string(),
		orgId: Joi.string(),
	})
    .min(1),
};

const deletePlace = {
  params: Joi.object().keys({
    placeId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createPlace,
  getPlaces,
  getPlace,
  updatePlace,
  deletePlace,
};
