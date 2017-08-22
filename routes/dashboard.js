const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
	res.send('This is Doughman\'s dashboard');
});

module.exports = router;