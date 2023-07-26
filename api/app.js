// Create base API router on app.js with express
const express = require('express');

// Import API routes
const filesRouter = require('./server/routes/files');

// Load express app
const app = express();

// Load API routes
app.use(express.json());
app.use('/api/files', filesRouter);

// Catch 404 and forward to error handler
app.use((req, res, next) => {
    res.status(404).send('Not found');
});

// Error handler
app.use((err, req, res, next) => {
    //TODO ADD LOGGING
    console.error(err.stack);
    res.status(500).send('Internal server error');
});

// Start server on localhost:3000
app.listen(3000, function () {
    console.log('Example app listening on port ' + 3000 + '!');
});

// Export router
module.exports = app;