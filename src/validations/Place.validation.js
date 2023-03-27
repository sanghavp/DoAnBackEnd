const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createPlace = {
  body: Joi.object().keys(
      {
		time: Joi.string(),
		lat: Joi.number(),
		long: Joi.number(),
		name: Joi.string(),
		r: Joi.string(),
		address: Joi.string(),
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
		r: Joi.string(),
		address: Joi.string(),
	}
  ),
};

const getPlace = {
  params: Joi.object().keys({
    PlaceId: Joi.string().custom(objectId),
  }),
};

const updatePlace = {
  params: Joi.object().keys({
    PlaceId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
		time: Joi.string(),
		lat: Joi.number(),
		long: Joi.number(),
		name: Joi.string(),
		r: Joi.string(),
		address: Joi.string(),
	})
    .min(1),
};

const deletePlace = {
  params: Joi.object().keys({
    PlaceId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createPlace,
  getPlaces,
  getPlace,
  updatePlace,
  deletePlace,
};
