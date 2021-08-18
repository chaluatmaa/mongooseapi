const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
require("./db/mongoose");
const userRouter = require("./routers/user");
const taskRouter = require("./routers/task");
const jwt = require("jsonwebtoken");

app.use(express.json());

app.use(userRouter);
app.use(taskRouter);

// const myFunction = async () => {
// 	const token = jwt.sign({ _id: "dummyID" }, "seriesofcharacters", {
// 		expiresIn: "7 days",
// 	});
// 	console.log("Token:", token);
// 	const verified = jwt.verify(token, "seriesofcharacters");
// 	console.log("Verify:", verified._id);
// };

// myFunction();

app.listen(PORT, () => {
	console.log("Server is up an listening on PORT", PORT);
});
