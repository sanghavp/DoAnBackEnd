const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createScanQR = {
  body: Joi.object().keys(
      {
		lat: Joi.number(),
		long: Joi.number(),
		placeId: Joi.string(),
		currentTime: Joi.string(),
		userID: Joi.string(),
		extra: Joi.object(),
	}
  ),
};

const getScanQRs = {
  query: Joi.object().keys(
      {
		lat: Joi.number(),
		long: Joi.number(),
		placeId: Joi.string(),
		time: Joi.string(),
		userID: Joi.string(),
		extra: Joi.object(),
	}
  ),
};

const getScanQR = {
  params: Joi.object().keys({
    scanQRId: Joi.string().custom(objectId),
  }),
};

const updateScanQR = {
  params: Joi.object().keys({
    scanQRId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
		lat: Joi.number(),
		long: Joi.number(),
		placeId: Joi.string(),
		time: Joi.string(),
		userID: Joi.string(),
		extra: Joi.object(),
	})
    .min(1),
};

const deleteScanQR = {
  params: Joi.object().keys({
    scanQRId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createScanQR,
  getScanQRs,
  getScanQR,
  updateScanQR,
  deleteScanQR,
};
