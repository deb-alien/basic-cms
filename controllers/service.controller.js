import ServiceModel from "../models/ServiceModel.js";
import cloudinary from "../config/cloudinary.js";

export const getAllServices = async (_req, res) => {
	try {
		const services = await ServiceModel.find({});
		if (services.length === 0 || !services) {
			return res
				.status(404)
				.json({ message: "Services not found" });
		}

		return res.status(200).json(services);
	} catch (error) {
		console.log("Error in get all services controller", error);
		res.status(500).json({ message: error.message });
	}
};
export const createService = async (req, res) => {
	try {
		const { title, description } = req.body;
		if (!title || !description) {
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
					folder: "services",
				}
			);
		} catch (uploadError) {
			console.log("Cloudinary upload error", uploadError);
			return res.status(500).json({ message: uploadError.message });
		}

		const newService = await ServiceModel.create({
			title,
			description,
			image: {
				public_id: uploadImage.public_id,
				secure_url: uploadImage.secure_url,
			},
		});

		return res
			.status(201)
			.json({
				message: "Service created successfully",
				service: newService,
			});
	} catch (error) {
		console.log("Error in create service controller", error);
		res.status(500).json({ message: error.message });
	}
};
export const getService = async (req, res) => {
	try {
		const service = await ServiceModel.findById(req.params.id);
		if (!service) {
			return res.status(404).json({ message: "Service not found" });
		}

		return res.status(200).json({ service });
	} catch (error) {
		console.log("Error in get service controller", error);
		res.status(500).json({ message: error.message });
	}
};
export const updateService = async (req, res) => {
	try {
		const serviceId = req.params.id;
		const service = await ServiceModel.findById(serviceId);
		if (!service) {
			return res.status(404).json({ message: "Service not found" });
		}

		let uploadImage;
		if (req.file) {
			try {
				if (service.image && service.image.public_id) {
					await cloudinary.uploader.destroy(
						service.image.public_id
					);
				}

				uploadImage = await cloudinary.uploader.upload(
					req.file.path,
					{
						folder: "services",
					}
				);
			} catch (uploadError) {
				console.log("Cloudinary upload error", uploadError);
				return res
					.status(500)
					.json({ message: uploadError.message });
			}
		}

		service.title = req.body.title || service.title;
		service.description = req.body.description || service.description;

		if (uploadImage) {
			service.image = {
				public_id: uploadImage.public_id,
				secure_url: uploadImage.secure_url,
			};
		}

		await service.save();

		return res
			.status(200)
			.json({ message: "Service updated successfully", service });
	} catch (error) {
		console.log("Error in update service controller", error);
		res.status(500).json({ message: error.message });
	}
};
export const deleteService = async (req, res) => {
	try {
		const serviceId = req.params.id;
		const service = await ServiceModel.findById(serviceId);
		if (!service) {
			return res.status(404).json({ message: "Service not found" });
		}

		if (service.image && service.image.public_id) {
			await cloudinary.uploader.destroy(service.image.public_id);
		}
		await service.deleteOne();

		return res
			.status(200)
			.json({ message: "Service deleted successfully" });
	} catch (error) {
		console.log("Error in delete service controller", error);
		res.status(500).json({ message: error.message });
	}
};
