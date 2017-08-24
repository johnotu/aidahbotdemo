const express = require('express');
const router = express.Router();

const Product = require('../models/product'); 

router.get('/', (req, res) => {
	//res.send('This is Doughman\'s dashboard');
	Product.getProducts((err, products) => {
		if (err) {
			return res.json({
				success: false,
				error: err
			});
		}
		return res.json({
			success: true,
			products: products
		});
	});
});

router.post('/', (req, res) => {
	let newProduct = new Product({
		name: req.body.name,
		description: req.body.description,
		image_link: req.body.image_link,
		price: req.body.price
	});

	Product.addProduct(newProduct, (err, product) => {
		if (err) {
			return res.json({
				success: false,
				error: err
			});
		}
		res.json({
			success: true,
			product: product
		});
	});
});

module.exports = router;