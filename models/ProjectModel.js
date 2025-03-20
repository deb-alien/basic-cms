import { model, Schema } from "mongoose";

const ProjectSchema = new Schema(
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
		tags: { type: [], required: [true, "Tags is required"], default: [] },
	},
	{ timestamps: true }
);

const ProjectModel = model("Project", ProjectSchema);

export default ProjectModel;
