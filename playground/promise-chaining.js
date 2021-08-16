require("../src/db/mongoose");
const User = require("../src/models/user");
const Task = require("../src/models/task");

// Task.findByIdAndDelete("611a1470b0ab4a50bd0a4788")
// 	.then((result) => {
// 		console.log(result);
// 		return Task.countDocuments({ completed: false });
// 	})
// 	.then((count) => console.log(count))
// 	.catch((err) => console.log(err));

// const updateAgeAndCount = async (id, age) => {
// 	const user = await User.findByIdAndUpdate(id, { age: age });
// 	const count = await User.countDocuments({ age });
// 	return count;
// };

// updateAgeAndCount("6119ed518bca5047eae24a4c", 29)
// 	.then((count) => {
// 		console.log(count);
// 	})
// 	.catch((err) => {
// 		console.log(err);
// 	});

const deleteTaskAndCount = async (id) => {
	const task = await Task.findByIdAndDelete(id);
	const count = await Task.countDocuments({ completed: false });
	return count;
};

deleteTaskAndCount("6119f18e2c92084870cf7903")
	.then((count) => {
		console.log(count);
	})
	.catch((err) => {
		console.log(err);
	});
