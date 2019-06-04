const jwt = require('jsonwebtoken'); 
const config = require('../config/config');

const auth = (req, res, next) => {
    const token_header = req.headers.auth;

    if(!token_header) return res.status(401).send({error:'Autenticação recusada'});

    jwt.verify(token_header, config.jwt_pass, (err, decoded) => {
        if(err) return res.status(401).send({ error: 'Token Invalido!'});
        return next();
    });
}

module.exports = auth;