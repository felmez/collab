const jwt = require('jsonwebtoken');

const SECRET_KEY = process.env.SECRET_KEY;

// verify token cookie middleware
const isLogged = (req, res, next) => {
    const token = req.cookies.token;

    if (token) {
        try {
            const loggedUser = jwt.verify(token, SECRET_KEY);
            if (loggedUser) {
                req.user = loggedUser;
                next();
            }
        } catch (error) {
            return res.clearCookie('token').status(400).render('pages/login', { error: 'token expired please login' });
        }
    } else {
        return res.clearCookie('token').status(400).render('pages/login', { error: 'token not found try to login' });
    }
};

module.exports = {
    isLogged,
    SECRET_KEY,
};
