import TeamModel from "../models/TeamModel.js";
import cloudinary from "../config/cloudinary.js";

export const getAllTeams = async (req, res) => {
	try {
		const teams = await TeamModel.find({});
		if (teams.length === 0 || !teams) {
			return res.status(404).json({ message: "Teams not found" });
		}

		return res.status(200).json({ teams });
	} catch (error) {
		console.log("Error in get all teams controller", error);
		return res.status(500).json({ message: error.message });
	}
};
export const getTeam = async (req, res) => {
	try {
		const teamID = req.params.id;
		const team = await TeamModel.findById(teamID);
		if (!team) {
			return res.status(404).json({ message: "Team not found" });
		}

		return res.status(200).json({ team });
	} catch (error) {
		console.log("Error in get team controller", error);
		return res.status(500).json({ message: error.message });
	}
};
export const createTeam = async (req, res) => {
	try {
		const { name, designation, description } = req.body;
		if (!name || !designation || !description) {
			return res
				.status(400)
				.json({ message: "All fields are required" });
		}
		if (!req.file) {
			return res.status(400).json({ message: "Image is required" });
		}

		let uploadImage;
		try {
			uploadImage = await cloudinary.uploader.upload(
				req.file.path,
				{
					folder: "teams",
				}
			);
		} catch (error) {
			console.log("Cloudinary upload error", error);
			return res.status(500).json({ message: error.message });
		}

		const newTeam = await TeamModel.create({
			name,
			designation,
			description,
			image: {
				public_id: uploadImage.public_id,
				secure_url: uploadImage.secure_url,
			},
		});

		return res.status(200).json({ team: newTeam });
	} catch (error) {
		console.log("Error in create team controller", error);
		return res.status(500).json({ message: error.message });
	}
};
export const updateTeam = async (req, res) => {
	try {
		const teamID = req.params.id;
		const team = await TeamModel.findById(teamID);
		if (!team) {
			return res.status(404).json({ message: "Team not found" });
		}

		let uploadImage;
		if (req.file) {
			try {
				if (team.image && team.image.public_id) {
					await cloudinary.uploader.destroy(
						team.image.public_id
					);
				}

				uploadImage = await cloudinary.uploader.upload(
					req.file.path,
					{
						folder: "teams",
					}
				);
			} catch (uploadError) {
				console.log("Cloudinary upload error", uploadError);
				return res
					.status(500)
					.json({ message: uploadError.message });
			}
		}

		team.name = req.body.name || team.name;
		team.designation = req.body.designation || team.designation;
		team.description = req.body.description || team.description;

		if (uploadImage) {
			team.image = {
				public_id: uploadImage.public_id,
				secure_url: uploadImage.secure_url,
			};
		}

		await team.save();

		return res
			.status(200)
			.json({ message: "Project updated successfully", team });
	} catch (error) {
		console.log("Error in update team controller", error);
		return res.status(500).json({ message: error.message });
	}
};
export const deleteTeam = async (req, res) => {
	try {
		const teamID = req.params.id;
		const team = await TeamModel.findById(teamID);
		if (!team) {
			return res.status(404).json({ message: "Team not found" });
		}

		if (team.image && team.image.public_id) {
			await cloudinary.uploader.destroy(team.image.public_id);
		}
		await team.deleteOne();

		return res
			.status(200)
			.json({ message: "Team deleted successfully" });
	} catch (error) {
		console.log("Error in delete team controller", error);
		return res.status(500).json({ message: error.message });
	}
};
