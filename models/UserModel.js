import { model, Schema } from 'mongoose';

const UserSchema = new Schema(
	{
		email: { type: String, required: true, unique: true },
		password: { type: String, required: true, minlength: 6 },
		isAdmin: { type: Boolean, default: false },
	},
	{ timestamps: true }
);

const UserModel = model('User', UserSchema);

export default UserModel;
