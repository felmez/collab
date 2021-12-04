const jwt = require('jsonwebtoken');

const SECRET_KEY = process.env.SECRET_KEY;

// verify token cookie middleware
const isManager = (req, res, next) => {
    const token = req.cookies.token;

    if (token) {
        try {
            const loggedUser = jwt.verify(token, SECRET_KEY);
            if (loggedUser.role === 'manager') {
                console.log('its here and manager');
                req.user = loggedUser;
                next();
            } else {
                console.log('its here and not manager');
                return res.clearCookie('token').status(400).render('pages/login', { error: 'access denied' });
            }
        } catch (error) {
            return res.clearCookie('token').status(400).render('pages/login', { error: 'token expired please login' });
        }
    } else {
        return res.clearCookie('token').status(400).render('pages/login', { error: 'token not found try to login' });
    }
};

module.exports = {
    isManager,
    SECRET_KEY,
};
