const dotenv = require("dotenv").config();
const express = require("express");
const mongo = require("mongodb");
const cors = require("cors");
const app = express();

// functionalities
const checkPalindrom = require("./functions/checkPalindrom");

// CORS stuff
app.use(cors());
app.use((req, res, next) => {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");

	next();
});

const client = mongo.MongoClient;

// get all
// get by brand
// get by description
app.get("/api/v1/productos", (req, res) => {
	const q_params = req.query;

	client.connect(
		process.env.MONGO_URI,
		{
			useNewUrlParser: true,
			useUnifiedTopology: true
		},
		(err, db) => {
			if (err) throw err;

			const query = q_params.query
				? {
						$or: [
							{
								brand: new RegExp(q_params.query, "g")
							},
							{
								description: new RegExp(q_params.query, "g")
							}
						]
				  }
				: {};

			const has_discount = q_params.query ? checkPalindrom(q_params.query) : false;

			db.db("promotions")
				.collection("products")
				.find(query)
				.toArray((err, result) => {
					if (err) throw err;

					if (!result.length) {
						res.json([]);
					} else if (has_discount) {
						result.map((elem) => {
							elem.discount_price = elem.price / 2;
						});

						res.json(result);
					} else {
						result.map((elem) => {
							elem.discount_price = elem.price;
						});

						res.json(result);
					}

					db.close();
				});
		}
	);
});

// get by id
app.get("/api/v1/productos/:id", (req, res) => {
	const query = { id: parseInt(req.params.id) };
	const has_discount = req.params.id ? checkPalindrom(req.params.id) : false;

	client.connect(
		process.env.MONGO_URI,
		{
			useNewUrlParser: true,
			useUnifiedTopology: true
		},
		(err, db) => {
			if (err) throw err;

			db.db("promotions")
				.collection("products")
				.find(query)
				.toArray((err, result) => {
					if (err) throw err;

					if (!result.length) {
						res.json([]);
					} else if (has_discount) {
						result.map((elem) => {
							elem.discount_price = elem.price / 2;
						});

						res.json(result);
					} else {
						result.map((elem) => {
							elem.discount_price = elem.price;
						});

						res.json(result);
					}

					db.close();
				});
		}
	);
});

var port = process.env.PORT || 27019;
app.listen(port, "0.0.0.0", () => {
	console.log(`Server listening on port ${port}`);
});
