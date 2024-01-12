const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const checkinSchema = mongoose.Schema(
  {
		userId: {
			type: String,
			required: true,
			trim: true,
		},
		time: {
			type: String,
			required: true,
			trim: true,
		},
		place: {
			type: Array,
			required: true,
			trim: true,
		},
		status: {
			type: Boolean,
			required: true,
			trim: true,
		},
		username: {
			type: String,
			required: true,
			trim: true,
		},
		ca: {
			type: Object,
			required: true,
			trim: true,
		},
	},
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
checkinSchema.plugin(toJSON);
checkinSchema.plugin(paginate);

/**
 * @typedef Checkin
 */
const Checkin = mongoose.model('Checkin', checkinSchema);

module.exports = Checkin;
