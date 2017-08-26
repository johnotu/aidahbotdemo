const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = Schema({
	name: {type: String, required: true},
	description: {type: String},
	image_link: {type: String, required: true},
	price: {type: Number, required: true},
	status: {type: String, enum: ['Active', 'Inactive']},
	category: [String]
});

const Product = module.exports = mongoose.model('Product', ProductSchema);

module.exports.getProducts = callback => {
	Product.find(callback);
}

module.exports.addProduct = (newProduct, callback) => {
	newProduct.save(callback);
}