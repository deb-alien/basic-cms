import { Schema, model } from 'mongoose';

const TeamSchema = new Schema(
	{
		name: { type: String, required: [true, "Name is required"] },
		designation: {
			type: String,
			required: [true, "Designation is required"],
		},
		image: {
			public_id: {
				type: String,
				required: [true, "public_id is required"],
			},
			secure_url: {
				type: String,
				required: [true, "secure_url is required"],
			},
		},
		description: {
			type: String,
			required: [true, "Description is required"],
		},
	},
	{ timestamps: true }
);

const TeamModel = model('Team', TeamSchema);

export default TeamModel;
