const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const placeSchema = mongoose.Schema(
  {
		time: {
			type: String,
			required: true,
			trim: true,
		},
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
		name: {
			type: String,
			required: true,
			trim: true,
		},
		r: {
			type: Number,
			required: true,
			trim: true,
		},
		address: {
			type: String,
			required: true,
			trim: true,
		},
		orgId: {
			type: mongoose.Schema.ObjectId,
			required: true,
			trim: true,
		},
		minimumTime: {
			type: Number,
			required: false,
			default: 1
		},
		status: {
			type: String,
			required: true,
			default: "out"
		},
		time_start: {
			type: String,
			required: false
		},
		lastCheckin: {
			type: Date,
			required: false
		},
		tooLate: {
			type: Number,
			required: false
		},
	},
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
placeSchema.plugin(toJSON);
placeSchema.plugin(paginate);

/**
 * @typedef Place
 */
const Place = mongoose.model('Place', placeSchema);

module.exports = Place;
