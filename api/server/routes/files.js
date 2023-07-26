// Load router and express
const express = require('express');
const router = express.Router();
const controller = require('../controllers');

// Setup base routes to files prefix
router.get('/data', controller.files.getDataFiles);
router.get('/list', controller.files.getFilesList);
router.get('/data/:fileName', controller.files.getFileByName),

// Exports router
module.exports = router;