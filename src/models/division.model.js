const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const divisionSchema = mongoose.Schema(
  {
		org_id: {
			type: String,
			required: true,
			trim: true,
		},
		createdBy: {
			type: Object,
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
		detail: {
			type: Object,
			required: true,
			trim: true,
		},
		members: {
			type: Array,
            required: true,
            trim: true,
		},
		id_members: {
			type: Array,
			required: true,
			trim: true,
		},
		title: {
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
divisionSchema.plugin(toJSON);
divisionSchema.plugin(paginate);

/**
 * @typedef Division
 */
const Division = mongoose.model('Division', divisionSchema);

module.exports = Division;
