import jwt from "jsonwebtoken";

export const verifyJwt = (req, res, next) => {
	const token = req.cookies.token;
	if (!token) {
		return res.status(401).json({ message: "Unauthorized" });
	}
	jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
		if (err) {
			return res.status(401).json({ message: "Unauthorized" });
		}
		req.user = {
			userID: decoded.userID,
			isAdmin: decoded.isAdmin,
		};
		next();
	});
};

export const adminPrivilegeRequired = (req, res, next) => {
	if (!req.user.isAdmin) {
		return res.status(403).json({ message: "Forbidden" });
	}
	next();
};
