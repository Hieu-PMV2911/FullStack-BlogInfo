const express = require('express')
const route = express.Router()
const {Post, Likes} = require('../models')
const {ValidateToken} = require('../middlewares/AuthMiddlewares.js')

route.get('/',ValidateToken,async (req, res) => {
	const listPost = await Post.findAll({include:[Likes]});
	const likePost = await Likes.findAll({where: {UserId: req.user.id}});
	res.json({listPost: listPost, likePost: likePost})
})

route.get('/byId/:id', async (req, res) => {
	const createPost = req.params.id;
	const findPost = await Post.findByPk(createPost);
	res.json(findPost)
})

route.get('/byUserId/:id', async (req, res) => {
	const id = req.params.id;
	const findUserId = await Post.findAll({where: {userId: id}, include:[Likes]});
	res.json(findUserId)
})

route.post('/post',ValidateToken, async (req, res) => {
	const createPost = req.body;
	const id = req.params.id;
	createPost.userName = req.user.userName;
	createPost.UserId = req.user.id;
	await Post.create(createPost);
	res.json(createPost)
})

route.put('/put/title',ValidateToken, async (req, res) => {
	const {newTitle, id} = req.body;
	await Post.update({title : newTitle},{where :{id : id}});
	res.json(newTitle)
})

route.put('/put/postText',ValidateToken, async (req, res) => {
	const {newPostText, id} = req.body;
	await Post.update({postText : newPostText},{where :{id : id}});
	res.json(newPostText)
})

route.delete('/delete/:postId',ValidateToken, async (req, res) => {
	const PostId = req.params.postId;

	await Post.destroy({
		where:{
			id : PostId
		}
	});

	res.json("Delete Success")
})

module.exports = route;