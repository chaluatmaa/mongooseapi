// const mongodb = require("mongodb");
// const MongoClient = mongodb.MongoClient;
// const ObjectID = mongodb.ObjectId;

const { MongoClient, ObjectId } = require("mongodb");

const CONNECTION_URL =
	"mongodb+srv://task-manager:task-manager@cluster0.5j1gr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const databaseName = "task-manager";

MongoClient.connect(
	CONNECTION_URL,
	{
		useNewUrlParser: true,
	},
	(err, client) => {
		if (err) {
			return console.log("DATABASE NOT FOUND");
		}
		if (client) {
			console.log("Database connected");
		}
		const db = client.db(databaseName);
	}
);
