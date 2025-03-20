import { comparePassword, signJWTAndSendCookie } from '../lib/utils.js';
import UserModel from '../models/UserModel.js';

export const login = async (req, res) => {
	try {
		const { email, password } = req.body;
		if (!email || !password) {
			return res.status(400).json({ message: 'All fields are required' });
		}

		const user = await UserModel.findOne({ email });
		if (!user) {
			return res.status(404).json({ message: 'Invalid Credentials ' });
		}

		const isMatch = await comparePassword(password, user.password);
		if (!isMatch) {
			return res.status(400).json({ message: 'Invalid Credentials' });
		}

		signJWTAndSendCookie(user, res);

		return res.status(200).json({ message: 'User logged in successfully' });
    } catch (error) {
        console.log('Error in login controller', error);
        return res.status(500).json({ message: error.message });
    }
};
export const logout = async (req, res) => {
	res.cookie('token', null, { expires: new Date(Date.now()), httpOnly: true });
	return res.sendStatus(204);
};

export const getProfile = async (req, res) => {
	try {
		const userID = req.user.userID;
		const user = await UserModel.findById(userID);
		if (!user) {
			return res.status(404).json({ message: 'User not found' });
		}

		return res.status(200).json({
			user: {
				...user._doc,
				password: undefined,
			},
		});
	} catch (error) {}
};
