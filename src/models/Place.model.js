const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const PlaceSchema = mongoose.Schema(
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
			type: String,
			required: true,
			trim: true,
		},
		address: {
			type: String,
			required: true,
			trim: true,
		},
	},
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
PlaceSchema.plugin(toJSON);
PlaceSchema.plugin(paginate);

/**
 * @typedef Place
 */
const Place = mongoose.model('Place', PlaceSchema);

module.exports = Place;
