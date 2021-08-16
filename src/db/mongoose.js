const mongoose = require("mongoose");

const CONNECTION_URL =
	"mongodb+srv://task-manager:task-manager@cluster0.5j1gr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

mongoose.connect(
	CONNECTION_URL,
	{
		useNewUrlParser: true,
		useCreateIndex: true,
		useCreateIndex: true,
		useUnifiedTopology: true,
		useFindAndModify: false,
	},
	() => {
		console.log("DB CONNECTED");
	}
);
