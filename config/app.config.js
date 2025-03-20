import dotenv from "dotenv";
import { connect } from "mongoose";
import multer from "multer";

dotenv.config();

export const PORT = process.env.PORT;
export const JWT_SECRET = process.env.JWT_SECRET;
export const JWT_LIFETIME = process.env.JWT_LIFETIME;
export const NODE_ENV = process.env.NODE_ENV;

export const ConnectMongoDB = async () => {
	try {
		await connect(process.env.MONGO_URI);
		console.log("Connected to MongoDB");
	} catch (error) {
		console.log("Failed to connect to MongoDB");
		console.log(error);
	}
};

export const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;
export const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY;
export const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET;

const sotrage = multer.diskStorage({
	filename: (req, file, cb) => {
		return cb(null, `${Date.now()}-${file.originalname}`);
	},
});

export const upload = multer({ storage: sotrage });
