const express = require('express');
const router = express.Router();
const Users = require('../Models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config/config');

//Funções axiliares

const createUserToken = (userId) => {
    return jwt.sign({ id:userId }, config.jwt_pass, { expiresIn: config.jwt_expires_in });
}

router.get('/', async (req, res) => {
    try {
        const users = await Users.find({});
        return res.send(users);
    } 
    catch (err) {
        return res.status(500).send({ error: `Erro na consulta de usuarios!` });
    }
});

router.post('/create', async (req, res) => {
    const { login, email, password } = req.body;

    if(!login || !email || !password) return res.status(400).send({ error: `Dados insuficientes!`});

    try {
        if (await Users.findOne({login})) return res.status(400).send({ error: `Usuario ja cadastrado!` });

        const user = await Users.create(req.body);
        user.password = undefined;
        return res.status(201).send({user, token: createUserToken(user.id)});
    } 
    catch (err) {
        return res.status(500).send({ error: `Erro ao buscar usuario!` })
    }
});

router.post('/auth', async (req,res) => {
    const { login, email, password } = req.body;

    if(!login || !email || !password) return res.status(400).send({ error: 'Dados insuficientes!'});
    
    try {
        const user = await Users.findOne({ login }).select('+password');
        if(!user) return res.status(400).send({ error: `Usuario não cadastrado!`});

        const pass_ok = await bcrypt.compare(password, user.password);

        if(!pass_ok) return res.status(401).send({ error: 'Erro ao autenticar usuariuouoo!' });
        
        user.password = undefined;
        return res.status(200).send({user, token: createUserToken(user.id)});

    } catch (error) {
        return res.status(500).send({ error: `Erro ao buscar usuario!`});
    }
});
module.exports = router;