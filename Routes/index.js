const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');

router.get('/', auth, (req, res) => {
    return res.send({message:'Apenas usuarios autenticados'});
});

router.post('/', (req,res) => {
    return res.send({message:'Tudo ok com o post da raiz'});
});

module.exports = router;