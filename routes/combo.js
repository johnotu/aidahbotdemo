const express = require('express');
const router = express.Router();

const Combo = require('../models/combo'); 

router.get('/', (req, res) => {
	Combo.getCombos((err, combos) => {
		if (err) {
			return res.json({
				success: false,
				error: err
			});
		}
		return res.json({
			success: true,
			combos: combos
		});
	});
});

router.post('/', (req, res) => {
	let newCombo = new Combo({
		name: req.body.name,
		qty: req.body.qty,
		category: req.body.category,
		price: req.body.price,
		status: req.body.status
	});

	Combo.addCombo(newCombo, (err, combo) => {
		if (err) {
			return res.json({
				success: false,
				error: err
			});
		}
		res.json({
			success: true,
			combo: combo
		});
	});
});

module.exports = router;