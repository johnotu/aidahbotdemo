const mongoose = require('mongoose');

const ProductSchema = mongoose.Schema({
	name: {type: String, required: true},
	description: {type: String},
	image_link: {type: String, required: true},
	price: {type: Number, required: true}
});

const Product = module.exports = mongoose.model('Product', ProductSchema);

module.exports.getProducts = callback => {
	Product.find(callback);
}

module.exports.addProduct = (newProduct, callback) => {
	newProduct.save(callback);
}