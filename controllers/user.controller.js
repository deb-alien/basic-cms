import UserModel from '../models/UserModel.js';
import { hashPassword } from '../lib/utils.js';

export const createUser = async (req, res) => {
	try {
		const { email, password } = req.body;
		
		const hashPwd = await hashPassword(password)
		const newUser = await UserModel.create({
			email,
			password: hashPwd,
		});

		return res.status(200).json({
			user: {
				...newUser._doc,
				password: undefined,
			},
		});
	} catch (error) {
		console.log('Error in get user controller', error);
		res.status(500).json({ message: error.message });
	}
};

export const updateUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const userID = req.params.id
        if(!email || !password) {
            return res.status(400).json({ message: 'All fields are required' });            
        }

		const hashPwd = await hashPassword(password)
		const user = await UserModel.findByIdAndUpdate(userID, { email, password: hashPwd }, { new: true });

		if (!user) {
			return res.status(404).json({ message: 'User not found' });
		}

        return res.status(200).json({ message: 'User updated successfully', user: { ...user._doc, password: undefined} });
	} catch (error) {
		console.log('Error in update user controller', error);
		res.status(500).json({ message: error.message });
	}
};

export const deleteUser = async (req, res) => {
	try {
		const userID = req.params.id;
		const user = await UserModel.findByIdAndDelete(userID);
		if (!user) {
			return res.status(404).json({ message: 'User not found' });
		}
		return res.status(200).json({ message: 'User deleted successfully' });
	} catch (error) {
		console.log('Error in delete user controller', error);
		res.status(500).json({ message: error.message });
	}
};