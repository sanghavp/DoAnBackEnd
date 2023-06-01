const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const shiftSchema = mongoose.Schema(
  {
		name: {
			type: String,
			required: true,
			trim: true,
		},
		time_start: {
			type: Number,
			required: true,
			trim: true,
		},
		time_end: {
			type: Number,
			required: true,
			trim: true,
		},
		from_date: {
			type: Date,
			required: true,
			trim: true,
		},
		to_date: {
			type: Date,
			required: true,
			trim: true,
		},
		code: {
			type: String,
			required: true,
			trim: true,
		},
		max_time_late: {
			type: Number,
			required: true,
			trim: true,
		},
		description: {
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
shiftSchema.plugin(toJSON);
shiftSchema.plugin(paginate);

/**
 * @typedef Shift
 */
const Shift = mongoose.model('Shift', shiftSchema);

module.exports = Shift;
