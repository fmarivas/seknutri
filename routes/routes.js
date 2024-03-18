const express = require('express')
const router = express.Router()
const path = require('path')
const IsAuth = require('../controllers/middleware/auth')

router.get('/user_details', IsAuth, (req,res) =>{
	res.sendFile(path.join(__dirname, '../public/userDetailsForms.html'));	 
})

router.post('/user_details', IsAuth, (req , res) => {
	res.send('Aqui ja posso processar a sua informacao!')
	
	
	
	
	
	
	
})

module.exports = router