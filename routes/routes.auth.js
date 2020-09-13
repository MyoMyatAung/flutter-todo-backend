module.exports = (app) => {
    const authController = require('../controllers/controllers.auth');

    app.post('/signup', authController.signup);
    app.post('/login',authController.login);
}