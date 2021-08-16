const express = require("express");
const router = express.Router();
const Tasks = require("../models/task");

router.get("/tasks", async (req, res) => {
	// Tasks.find()
	// 	.then((result) => {
	// 		console.log(result);
	// 		res.send(result);
	// 	})
	// 	.catch((err) => {
	// 		console.log(err);
	// 	});
	try {
		const tasks = await Tasks.find();
		res.status(200).send(tasks);
	} catch (error) {
		res.status(500).send();
	}
});

router.get("/tasks/:id", async (req, res) => {
	const _id = req.params.id;
	// Tasks.findById(_id)
	// 	.then((result) => {
	// 		console.log(result);
	// 		res.send(result);
	// 	})
	// 	.catch((err) => {
	// 		console.log(err);
	// 	});

	try {
		const tasks = await Tasks.findById(_id);
		res.status(200).send(tasks);
	} catch (error) {
		res.status(500).send();
	}
});

router.post("/tasks", async (req, res) => {
	// const task = new Tasks(req.body);
	// console.log(task);
	// task
	// 	.save()
	// 	.then((result) => {
	// 		console.log(result);
	// 		res.send(result);
	// 	})
	// 	.catch((err) => {
	// 		console.log(err);
	// 		res.send(err);
	// 	});

	try {
		const task = new Tasks(req.body);
		await task.save();
		console.log(task);
		res.status(201).send(task);
	} catch (error) {
		res.status(500).send();
	}
});

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
		const user = await User.findByIdAndUpdate(_id, req.body, {
			new: true,
			runValidators: true,
		});
		if (!user) return res.status(404).send();
		console.log(user);
		res.send(user);
	} catch (error) {
		res.status(400).send();
	}
});

router.delete("/tasks/:id", async (req, res) => {
	const _id = req.params.id;
	try {
		const user = await Tasks.findByIdAndDelete(_id);
		if (!user) {
			return res.status(400);
		}
		res.status(201).send(user);
	} catch (error) {
		res.status(403).send();
	}
});

module.exports = router;
