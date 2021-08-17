const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		unique: true,
		required: true,
		trim: true,
		validate(value) {
			if (!validator.isEmail(value)) {
				throw new Error("Email is invalid");
			}
		},
		lowercase: true,
	},
	age: {
		type: Number,
		default: new Date().getDate(),
		validate(value) {
			if (value < 0) {
				throw new Error("Age must be a positive number");
			}
		},
	},
	password: {
		type: String,
		required: true,
		validate(value) {
			if (value.toLowerCase().includes("password")) {
				throw new Error("Password can't contain the word password");
			}
		},
	},
	tokens: [
		{
			token: {
				type: String,
				required: true,
			},
		},
	],
});

userSchema.methods.generateAuthToken = async function () {
	const user = this;
	const token = jwt.sign({ _id: user._id.toString() }, "seriesofcharacters");
	user.tokens = user.tokens.concat({ token: token });
	await user.save();
	return token;
};

// Find by credentials

userSchema.statics.findByCredentials = async (email, password) => {
	const user = await User.findOne({ email: email });
	if (!user) {
		throw new Error("Unable to login ");
	}

	const isMatch = await bcrypt.compare(password, user.password);
	if (!isMatch) {
		throw new Error("Unable to login");
	}

	return user;
};

// Hash the plain text password before saving

userSchema.pre("save", async function (next) {
	const user = this;
	console.log("just before saving");
	if (user.isModified("password")) {
		user.password = await bcrypt.hash(user.password, 10);
	}
	next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
