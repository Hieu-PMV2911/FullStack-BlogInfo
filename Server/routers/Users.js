const express = require('express')
const route = express.Router()
const {Users} = require('../models')
const bcrypt = require('bcrypt')
const {sign} = require('jsonwebtoken')
const { ValidateToken } = require('../middlewares/AuthMiddlewares')

route.post('/user/register', async (req, res) => {
	const {userName, password} = req.body;
	bcrypt.hash(password, 10).then((hash) => {
		Users.create({
			userName: userName,
			password: hash
		});
	})
})

route.post('/user/login', async (req, res) => {
	const {userName, password} = req.body;
	const User = await Users.findOne({where: {userName: userName}})

	if(!User) return res.json({errors: "Wrong User!!!"});

	bcrypt.compare(password, User.password).then((match) => {
		if(!match) return res.json({errors: "Wrong User or Password!!!"});
		const accessToken = sign({userName: User.userName, id: User.id},
			"importantSecret")
		res.json({
			token: accessToken,
			userName: userName,
			id: User.id,
		})
	})
})

route.get('/auth', ValidateToken, (req, res) => {
	return res.json(req.user);
})

route.get('/byUserId/:id', ValidateToken, async (req, res) => {
	const id = req.params.id;
	const UserId = await Users.findByPk(id,{
		attributes: {exclude: ['password']}
	});
	res.json(UserId);
})

route.put('/changePassword', ValidateToken, async (req, res) => {
	const {oldPassword, newPassword} = req.body;
	const user = await await Users.findOne({where: {userName: req.user.userName}})

	if(!user) return res.json({errors: "Wrong User!!!"});

	bcrypt.compare(oldPassword, user.password).then((match) => {
		if(!match) return res.json({errors: "Wrong Password!!!"});

		bcrypt.hash(newPassword, 10).then((hash) => {
			Users.update({password: hash},{where:{userName: req.user.userName}});
			return res.json({success: "Update Success!!!"});
		})

	})
})

module.exports = route;