const express = require('express')
const router = express.Router()

router.get('/test', (req,res) =>{
	 res.render('index', { title: 'Minha Aplicação', message: 'Olá, Mundo!' });
})

module.exports = router