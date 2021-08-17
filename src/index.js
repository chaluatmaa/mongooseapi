const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
require("./db/mongoose");
const userRouter = require("./routers/user");
const taskRouter = require("./routers/task");
const jwt = require("jsonwebtoken");

// app.use((req, res, next) => {
// 	// console.log(req.method, req.path);
// 	// next();
// 	if (req.method === "GET") {
// 		res.send("GET requests are disabled");
// 	} else {
// 		next();
// 	}
// });

// ASSIGNMENT

// app.use((req, res, next) => {
// 	if (req.method) {
// 		res.send("SITE IS UNDER MAINTAINENCE");
// 	}
// });

app.use(express.json());

app.use(userRouter);
app.use(taskRouter);

// const myFunction = async () => {
// 	const token = jwt.sign({ _id: "dummyID" }, "seriesofcharacters", {
// 		expiresIn: "7 days",
// 	});
// 	console.log("Token:", token);
// 	const verified = jwt.verify(token, "seriesofcharacters");
// 	console.log("Verify:", verified);
// };

// myFunction();

app.listen(PORT, () => {
	console.log("Server is up an listening on PORT", PORT);
});
