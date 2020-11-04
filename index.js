require("dotenv").config();

const express = require("express");
const mongo = require("mongodb");
const cors = require("cors");
const app = express();

// CORS stuff
app.use(cors());
app.use((req, res, next) => {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");

	next();
});

const client = mongo.MongoClient;

// get all
app.get("/", (req, res) => {
	client.connect(process.env.MONGO_URI, (err, db) => {
		if (err) throw err;

		db.db("promotions")
			.collection("products")
			.find({})
			.toArray((err, result) => {
				if (err) throw err;

				res.send(result);

				db.close();
			});
	});
});

// get by id
app.get("/:id", (req, res) => {
	const query = { id: parseInt(req.params.id) };

	client.connect(process.env.MONGO_URI, (err, db) => {
		if (err) throw err;

		db.db("promotions")
			.collection("products")
			.findOne(query, (err, result) => {
				if (err) throw err;

				res.send(result);

				db.close();
			});
	});
});

// get by brand

// get by description

// query with regex

app.listen(9090, "0.0.0.0", () => {
	console.log(`Server listening on port 9090`);
});
