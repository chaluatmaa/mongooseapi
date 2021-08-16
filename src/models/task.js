const mongoose = require("mongoose");

const Tasks = mongoose.model("Tasks", {
	desc: {
		type: String,
	},
	completed: {
		type: Boolean,
		default: false,
	},
});

module.exports = Tasks;
