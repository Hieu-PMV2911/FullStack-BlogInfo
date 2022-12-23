const express = require('express')
const route = express.Router()		
const {Likes} = require('../models')
const {ValidateToken} = require('../middlewares/AuthMiddlewares')
const e = require('express')

route.post('/',ValidateToken, async (req, res) => {
	const {PostId} = req.body;
	const UserId = req.user.id;

	const found = await Likes.findOne({where: {PostId: PostId, UserId : UserId}});

	if(!found) {
		await Likes.create({PostId: PostId, UserId: UserId});
		res.json({likes: true});
	}else{
		await Likes.destroy({
			where:{
				PostId : PostId, UserId : UserId
			}
		});
		res.json({likes: false});
	}
})



module.exports = route;