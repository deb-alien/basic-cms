import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const signJWTAndSendCookie = (user, res) => {
	const token = jwt.sign({ userID: user._id, isAdmin: user.isAdmin }, process.env.JWT_SECRET, {
		expiresIn: process.env.JWT_LIFETIME,
	});
	const sevenDay = 7 * 24 * 60 * 60 * 1000;
	const tokenCookieOptions = {
		expires: new Date(Date.now() + sevenDay),
		httpOnly: true,
	};
	res.cookie('token', token, tokenCookieOptions);
};

export const hashPassword = async (password) => {
	const salt = await bcrypt.genSalt(10);
	const hashedPassword = await bcrypt.hash(password, salt);
	return hashedPassword;
};

export const comparePassword = async (password, hashedPassword) => {
    return await bcrypt.compare(password, hashedPassword);
};

