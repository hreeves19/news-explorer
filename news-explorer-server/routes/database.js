const routes = require('express').Router();
const userRoutes = require('./userRoute');

// Get all events
routes.get('/test-connection', async (req, res) => {
    res.send('Database works!');
});

routes.use('user/', userRoutes);
module.exports = routes;