const jwt = require("jsonwebtoken");
const User = require("../models/user");

const auth = async (req, res, next) => {
	// console.log("auth middlewware");
	// next();
	try {
		const token = req.header("Authorization").replace("Bearer ", "");
		const decoded = jwt.verify(token, "seriesofcharacters");
		const user = await User.findOne({
			_id: decoded._id,
			"tokens.token": token,
		});
		if (!user) {
			throw new Error();
		}
		req.token = token;
		req.user = user;
		next();
		console.log(token);
	} catch (error) {
		res.status(401).json({ error: "Please authenticate" });
	}
};

module.exports = auth;
