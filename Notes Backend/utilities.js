const jwt = require('jsonwebtoken');

function authenticationToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(" ")[1]; // Ensure proper extraction

    if (!token) return res.sendStatus(401); // Unauthorized if no token

    jwt.verify(token, process.env.TOKEN_KEY, (err, user) => {
        if (err) return res.sendStatus(403); // Forbidden if token is invalid
        req.user = user;
        next();
    });
}

module.exports = {
    authenticationToken,    
};
