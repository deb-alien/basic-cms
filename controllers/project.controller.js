import ProjectModel from "../models/ProjectModel.js";
import cloudinary from "../config/cloudinary.js";

export const getAllProjects = async (req, res) => {
	try {
		const projects = await ProjectModel.find({});
		if (projects.length === 0 || !projects) {
			return res
				.status(404)
				.json({ message: "Projects not found" });
		}

		return res.status(200).json({ projects });
	} catch (error) {
		console.log("Error in get all projects controller", error);
		return res.status(500).json({ message: error.message });
	}
};

export const createProject = async (req, res) => {
	try {
		const { title, description, tags } = req.body;
		if (!title || !description || !tags) {
			return res
				.status(400)
				.json({ message: "All fields are required" });
		}

		if (!req.file) {
			return res.status(400).json({ message: "Image is required" });
		}

		let uploadimage;
		try {
			uploadimage = await cloudinary.uploader.upload(
				req.file.path,
				{
					folder: "projects",
				}
			);
		} catch (uploadError) {
			console.log("Cloudinary upload error", uploadError);
			return res.status(500).json({ message: uploadError.message });
		}

		console.log(uploadimage);

		const newProject = await ProjectModel.create({
			title,
			image: {
				public_id: uploadimage.public_id,
				secure_url: uploadimage.secure_url,
			},
			description,
			tags,
		});

		return res.status(200).json({
			message: "Project created successfully",
			project: newProject,
		});
	} catch (error) {
		console.log("Error in create project controller", error);
		res.status(500).json({ message: error.message });
	}
};

export const getProject = async (req, res) => {
	try {
		const projectID = req.params.id;
		const project = await ProjectModel.findById(projectID);
		if (!project) {
			return res.status(404).json({ message: "Project not found" });
		}

		return res.status(200).json({ project });
	} catch (error) {
		console.log("Error in get project controller", error);
		res.status(500).json({ message: error.message });
	}
};

export const deleteProject = async (req, res) => {
	try {
		const projectID = req.params.id;
		const project = await ProjectModel.findById(projectID);
		if (!project) {
			return res.status(404).json({ message: "Project not found" });
		}

		if (project.image && project.image.public_id) {
			await cloudinary.uploader.destroy(project.image.public_id);
		}
		await project.deleteOne();

		return res
			.status(200)
			.json({ message: "Project deleted successfully" });
	} catch (error) {
		console.log("Error in delete project controller", error);
		return res.status(500).json({ message: error.message });
	}
};
export const updateProject = async (req, res) => {
	try {
		const { title, description, tags } = req.body;
		const projectID = req.params.id;

		const project = await ProjectModel.findById(projectID);
		if (!project) {
			return res.status(404).json({ message: "Project not found" });
		}

		let uploadimage;
		if (req.file) {
			try {
				if (project.image && project.image.public_id) {
					await cloudinary.uploader.destroy(
						project.image.public_id
					);
				}
				uploadimage = await cloudinary.uploader.upload(
					req.file.path,
					{
						folder: "projects",
					}
				);
			} catch (uploadError) {
				console.log("Cloudinary upload error", uploadError);
				return res
					.status(500)
					.json({ message: uploadError.message });
			}
		}

		project.title = title;
		project.description = description;
		project.tags = tags || project.tags;

		if (uploadimage) {
			project.image = {
				public_id: uploadimage.public_id,
				secure_url: uploadimage.secure_url,
			};
		}

		await project.save();

		return res
			.status(200)
			.json({ message: "Project updated successfully", project });
	} catch (error) {
		console.log("Error in update project controller", error);
		return res.status(500).json({ message: error.message });
	}
};
