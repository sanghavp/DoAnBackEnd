const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const organizationsSchema = mongoose.Schema(
  {
		code: {
			type: String,
			required: true,
			unique: true,
			trim: true,
		},
		name: {
			type: String,
			required: true,
			unique: true,
			trim: true,
		},
		fullname: {
			type: String,
			required: true,
			// unique: true,
			trim: true,
		},
		email: {
			type: String,
			// required: true,
			trim: true,
		},
		phone: {
			type: String,
			// required: true,
			trim: true,
		},
		leader: {
			type: String,
			required: true,
			trim: true,
		},
		place: {
			type: Array,
			// required: true,
			trim: true,
		},
	},
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
organizationsSchema.plugin(toJSON);
organizationsSchema.plugin(paginate);

/**
 * @typedef Organizations
 */
const Organizations = mongoose.model('Organizations', organizationsSchema);

module.exports = Organizations;
