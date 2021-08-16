const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
const bcrypt = require("bcryptjs");
require("./db/mongoose");
const userRouter = require("./routers/user");
const taskRouter = require("./routers/task");

app.use(express.json());

app.use(userRouter);
app.use(taskRouter);

// const myFunction = async () => {
// 	const passowrd = "QWERTY";
// 	const hashedPassword = await bcrypt.hash(passowrd, 12);
// 	console.log(passowrd);
// 	console.log(hashedPassword);

// 	const isMatch = await bcrypt.compare(passowrd, hashedPassword);
// 	console.log(isMatch);
// };

// myFunction();

app.listen(PORT, () => {
	console.log("Server is up an listening on PORT", PORT);
});
