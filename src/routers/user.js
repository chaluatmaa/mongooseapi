const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Tasks = require("../models/task");

router.get("/users", async (req, res) => {
	// User.findById({ _id: id })
	// 	.then((result) => {
	// 		if (!result) {
	// 			return res.status(404);
	// 		}
	// 		console.log(result);
	// 		res.send(result);
	// 	})
	// 	.catch((err) => {
	// 		console.log(err);
	// 	});
	try {
		const user = await User.find();
		if (!user) return res.status(404).send();
		console.log(user);
		res.status(200).send(user);
	} catch (error) {
		res.status(500).send();
	}
});
router.get("/users/:id", async (req, res) => {
	const id = req.params.id;
	// // User.findOne({ _id: id })
	// User.findById({ _id: id })
	// 	.then((result) => {
	// 		if (!result) {
	// 			return res.status(404);
	// 		}
	// 		console.log(result);
	// 		res.send(result);
	// 	})
	// 	.catch((err) => {
	// 		console.log(err);
	// 	});
	try {
		const user = await User.findById({ _id: id });
		if (!user) return res.status(404).send();
		console.log(user);
		res.status(200).send(user);
	} catch (error) {
		res.status(500).send();
	}
});

router.post("/users", async (req, res) => {
	const user = new User(req.body);
	try {
		await user.save();
		res.status(201).send(user);
	} catch (error) {
		res.status(400).send(error);
	}
	// user
	// 	.save()
	// 	.then((result) => {
	// 		console.log(result);
	// 		res.status(201).send(result);
	// 	})
	// 	.catch((err) => {
	// 		console.log(err);
	// 		res.status(400).send();
	// 	});
});

router.delete("/users/:id", async (req, res) => {
	const _id = req.params.id;
	try {
		const user = await User.findByIdAndDelete(_id);
		if (!user) {
			return res.status(400);
		}
		res.status(201).send(user);
	} catch (error) {
		res.status(403).send();
	}
});

// router.get("/tasks", async (req, res) => {
// 	// Tasks.find()
// 	// 	.then((result) => {
// 	// 		console.log(result);
// 	// 		res.send(result);
// 	// 	})
// 	// 	.catch((err) => {
// 	// 		console.log(err);
// 	// 	});
// 	try {
// 		const tasks = await Tasks.find();
// 		res.status(200).send(tasks);
// 	} catch (error) {
// 		res.status(500).send();
// 	}
// });

// router.get("/tasks/:id", async (req, res) => {
// 	const _id = req.params.id;
// 	// Tasks.findById(_id)
// 	// 	.then((result) => {
// 	// 		console.log(result);
// 	// 		res.send(result);
// 	// 	})
// 	// 	.catch((err) => {
// 	// 		console.log(err);
// 	// 	});

// 	try {
// 		const tasks = await Tasks.findById(_id);
// 		res.status(200).send(tasks);
// 	} catch (error) {
// 		res.status(500).send();
// 	}
// });

// router.post("/tasks", async (req, res) => {
// 	// const task = new Tasks(req.body);
// 	// console.log(task);
// 	// task
// 	// 	.save()
// 	// 	.then((result) => {
// 	// 		console.log(result);
// 	// 		res.send(result);
// 	// 	})
// 	// 	.catch((err) => {
// 	// 		console.log(err);
// 	// 		res.send(err);
// 	// 	});

// 	try {
// 		const task = new Tasks(req.body);
// 		await task.save();
// 		console.log(task);
// 		res.status(201).send(task);
// 	} catch (error) {
// 		res.status(500).send();
// 	}
// });

router.patch("/users/:id", async (req, res) => {
	const updates = Object.keys(req.body);
	const allowedUpdates = ["name", "age", "password", "email"];
	const isValidOperation = updates.every((update) => {
		return allowedUpdates.includes(update);
	});

	if (!isValidOperation) {
		return res.status(400).send({ err: "Invalid updates ! " });
	}
	const _id = req.params.id;
	try {
		// const user = await User.findByIdAndUpdate(_id, req.body, {
		// 	new: true,
		// 	runValidators: true,
		// });
		const user = await User.findById(_id);
		updates.forEach((update) => {
			user[update] = req.body[update];
		});
		await user.save();
		// if (!user) return res.status(404).send();
		console.log(user);
		res.send(user);
	} catch (error) {
		res.status(400).send();
	}
});

router.post("/users/login", async (req, res) => {
	try {
		const user = await User.findByCredentials(
			req.body.email,
			req.body.password
		);
		console.log(user);
		res.send(user);
	} catch (error) {}
});

// router.delete("/tasks/:id", async (req, res) => {
// 	const _id = req.params.id;
// 	try {
// 		const user = await Tasks.findByIdAndDelete(_id);
// 		if (!user) {
// 			return res.status(400);
// 		}
// 		res.status(201).send(user);
// 	} catch (error) {
// 		res.status(403).send();
// 	}
// });

module.exports = router;
