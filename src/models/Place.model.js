const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const placeSchema = mongoose.Schema( 
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
		org_id: {
			type: mongoose.Schema.ObjectId,
			ref: 'Organization',
            required: true,
            trim: true,
		},
		minimumTime: {
			type: Number,
			required: false,
			default: 30
		},
		status: {
			type: String,
			required: true,
			default: "out"
		},
		time_start: {
			type: Number,
			required: false
		},
		time_end: {
			type: Number,
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
		// wifi check
		wifi: {
            type: Boolean,
            required: true,
            default: false
        },
		ip_address: {
			type: String,
            trim: true,
			validate(value) {
				if (!!value && !value.match(/(?:(?:25[0-5]|2[0-4]\d|[01]?\d?\d{1})\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d?\d{1})/g)) {
					throw new Error('BE: Địa chỉ IP không chính xác!');
				}
			},
		},
		wifi_name: {
			type: String,
            trim: true,
		},
		// mac check
		mac: {
            type: Boolean,
            required: true,
            default: false
        },
		mac_address: {
			type: String,
			trim: true,
			validate(value) {
				if (!!value && !value.match(/^([0-9a-fA-F]{2}[:-]){5}([0-9a-fA-F]{2})$/)) {
					throw new Error('BE: Địa chỉ MAC không chính xác!');
				}
			}
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
