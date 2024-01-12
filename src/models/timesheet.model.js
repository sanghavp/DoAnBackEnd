const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const ObjectId = mongoose.Schema.ObjectId;

const timesheetSchema = mongoose.Schema(
  {
		email: {
			type: String,
			// required: true,
			trim: true,
		},
		target: {
			type: ObjectId,
			ref: 'Place'
		},
		// shift: {
		// 	type: String,
		// 	required: true,
		// 	trim: true,
		// },
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
		status: {
			type: String,
			required: true,
			trim: true,
		},
		datetime: {
			type: Number,
			required: true,
			trim: true,
		},
		address: {
			type: String,
			required: true,
			trim: true,
		},
		user: {
			type: ObjectId,
			required: true,
			// trim: true,
			ref: 'User',
		},
	},
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
timesheetSchema.plugin(toJSON);
timesheetSchema.plugin(paginate);

/**
 * @typedef Timesheet
 */
const Timesheet = mongoose.model('Timesheet', timesheetSchema);

module.exports = Timesheet;
