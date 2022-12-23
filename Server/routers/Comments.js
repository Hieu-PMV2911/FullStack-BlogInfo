const express = require('express')
const route = express.Router()		
const {Comments} = require('../models')
const {ValidateToken} = require('../middlewares/AuthMiddlewares')

route.get('/comments/byId/:id', async (req, res) => {
	const createPost = req.params.id;
	const findPost = await Comments.findAll({where: {PostId: createPost}});
	res.json(findPost);
})

route.post('/comments/post',ValidateToken, async (req, res) => {
	const createPost = req.body;
	const userName = req.user.userName;
	createPost.userName = userName;
	await Comments.create(createPost);
	res.json(createPost);
})

route.delete('/comments/delete/:commentId', ValidateToken, async (req, res) => {
	const CommentId = req.params.commentId;

	await Comments.destroy({
		where:{
			id : CommentId
		}
	});

	res.json("Delete Success")
})

module.exports = route;