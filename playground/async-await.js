const add = (a, b) => {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve(a + b);
		}, 2000);
	});
};

const doWork = async () => {
	const sum = await add(2, -1);
	const sum2 = await add(sum, 2);
	const sum3 = await add(sum2, 90);
	return sum3;
};

doWork()
	.then((result) => {
		console.log("Result:", result);
	})
	.catch((err) => {
		console.log(err);
	});
