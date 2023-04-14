const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const scanQRSchema = mongoose.Schema(
  {
		lat: {
			type: Number,
			required: true,
			trim: true,
		},
		long: {
			type: Number,
			required: true,
			trim: true,
		},
		placeId: {
			type: String,
			required: true,
			trim: true,
		},
		currentTime: {
			type: String,
			required: true,
			trim: true,
		},
		userID: {
			type: String,
			required: true,
			trim: true,
		},
		extra: {
			type: Object,
			// required: true,
			// trim: true,
		},
	},
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
scanQRSchema.plugin(toJSON);
scanQRSchema.plugin(paginate);

/**
 * @typedef ScanQR
 */
const ScanQR = mongoose.model('ScanQR', scanQRSchema);

module.exports = ScanQR;
