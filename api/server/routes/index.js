// Load router and express
const express = require('express');
const router = express.Router();

// Get home base
router.get('/', (req, res, next ) => {
    res.render('index', { title: 'Express' });
});

// Export router
module.exports = router;