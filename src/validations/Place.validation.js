const Joi = require('joi');
const { objectId, mac, ipAddress } = require('./custom.validation');

const createPlace = {
  body: Joi.object().keys(
      {
		lat: Joi.number(),
		long: Joi.number(),
		name: Joi.string(),
		r: Joi.number(),
		address: Joi.string(),
		time_start: Joi.date(),
		time_end: Joi.date(),
		org_id: Joi.string().custom(objectId),
		last_checkin: Joi.date(),
		wifi: Joi.bool().allow("", null),
		ip_address: Joi.string().custom(ipAddress).allow("", null),
		wifi_name: Joi.string().allow("", null),
		mac: Joi.boolean().allow("", null),
		mac_address: Joi.string().custom(mac).allow("", null),
		status: Joi.string().valid("in", "out"),
	}
  ),
};

const getPlaces = {
  query: Joi.object().keys(
      {
		lat: Joi.number(),
		long: Joi.number(),
		name: Joi.string(),
		r: Joi.number(),
		address: Joi.string(),
		org_id: Joi.string(),
		page: Joi.number(),
		limit: Joi.number(),
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
		lat: Joi.number(),
		long: Joi.number(),
		name: Joi.string(),
		r: Joi.number(),
		address: Joi.string(),
		time_start: Joi.date(),
		time_end: Joi.date(),
		org_id: Joi.string().custom(objectId),
		last_checkin: Joi.date(),
		wifi: Joi.bool().allow("", null),
		ip_address: Joi.string().custom(ipAddress).allow("", null),
		wifi_name: Joi.string().allow("", null),
		mac: Joi.boolean().allow("", null),
		mac_address: Joi.string().custom(mac).allow("", null),
		status: Joi.string().valid("in", "out"),
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
