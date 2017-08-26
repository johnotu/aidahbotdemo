const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ComboSchema = Schema({
	name: {type: String, required: true},
	qty: {type: Number, required: true},
	category: [String],
	price: {type: Number},
	status: {type: String, enum: ['Active', 'Inactive']}
});

const Combo = module.exports = mongoose.model('Combo', ComboSchema);

module.exports.addCombo = (newCombo, callback) => {
	newCombo.save(callback);
}

module.exports.getCombos = callback => {
	Combo.find(callback);
}
