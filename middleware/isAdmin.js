const jwt = require('jsonwebtoken');

const SECRET_KEY = process.env.SECRET_KEY;

// verify token cookie middleware
const isAdmin = (req, res, next) => {
    const token = req.cookies.token;

    if (token) {
        try {
            const loggedUser = jwt.verify(token, SECRET_KEY);
            if (loggedUser.role === 'admin') {
                console.log('its here and admin');
                req.user = loggedUser;
                next();
            } else {
                console.log('its here and not admin');
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
    isAdmin,
    SECRET_KEY,
};
