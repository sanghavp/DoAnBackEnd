const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const userSchema =  mongoose.Schema (
	{
		id: {
			type: mongoose.Schema.ObjectId,
			trim: true,
		},
		name: {
			type: String,
            trim: true,
        },
	}
)

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
		// leader: userSchema
		leader: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
		// leader_id: {
		// 	type: mongoose.Schema.Types.ObjectId,
        //     ref: 'User',
		// 	required: false,
		// },
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
