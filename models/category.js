const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CategorySchema = Schema({
	name: {type: String, required: true},
	status: {type: String, enum: ['Active', 'Inactive']},
	products: [String]
});

const Category = module.exports = mongoose.model('Category', CategorySchema);

module.exports.addCategory = (newCategory, callback) => {
	newCategory.save(callback);
}

module.exports.getCategories = callback => {
	Category.find(callback);
}
