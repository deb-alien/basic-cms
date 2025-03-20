import { Schema, model } from "mongoose";

const ServiceSchema = new Schema(
	{
		title: { type: String, required: [true, "Title is required"] },
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

const ServiceModel = model("Service", ServiceSchema);

export default ServiceModel;
