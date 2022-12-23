import React, {useEffect, useState, useContext} from 'react'
import {useParams} from 'react-router-dom'
import axios from 'axios';
import {AuthContext} from '../helpers/Helpers'

const Post = () => {
	const {id} = useParams()
	const {authState} = useContext(AuthContext)
	const [postObject, setPostObject] = useState([])
	const [postComment, setPostComment] = useState([])
	const [newsComment, setNewsComment] = useState("")
	useEffect(()=>{
		axios.get(`http://localhost:3001/posts/byId/${id}`).then((response)=>{
			setPostObject(response.data);
		})

		axios.get(`http://localhost:3001/comment/comments/byId/${id}`).then((response)=>{
			setPostComment(response.data);
		})
	}, [])

	const onSubmit = () => {
		axios.post(`http://localhost:3001/comment/comments/post`,{commentsBody: newsComment, PostId:id},
		{
			headers:{
				accessToken: localStorage.getItem("accessToken")
			}
		}
		).then((response)=>{
			if(response.data.error){
				console.log({error: response.data.error})
			}else{
				const commentOld = {commentsBody: newsComment, userName:response.data.userName};
				setPostComment([...postComment, commentOld])
				setNewsComment("")
			}
		})
	}

	const handleDeleteCmt = (id) => {
		axios.delete(`http://localhost:3001/comment/comments/delete/${id}`, {
			headers:{
				accessToken : localStorage.getItem('accessToken')
			}
		}).then((response) => {
			setPostComment(postComment.filter((val)=>{
				return val.id != id;
			}))
		})
	}

	const handleUpdatePost = (options) => {
		if(options === "title"){
			const newTitle = prompt("Update new Title!");
			if(!newTitle.isEmpty()) {
			axios.put(`http://localhost:3001/posts/put/title`, {newTitle: newTitle, id:id}, {
				headers:{
					accessToken : localStorage.getItem('accessToken')
				}
			})
			setPostObject({...postObject, title: newTitle});
			}
		}else if(options === "postText"){
			const newPostText = prompt("Update new postText!");
			if(!newPostText.isEmpty()) {
				axios.put(`http://localhost:3001/posts/put/postText`, {newPostText: newPostText, id : id}, {
				headers:{
					accessToken : localStorage.getItem('accessToken')
				}
			})
			setPostObject({...postObject, postText: newPostText});
			}
		}
	}

	return (
		<div className="w3-container" style={{display: 'flex'}}>                                                                                                
			<div style={{flex: 1}}>
				<h2 style={{alignItems: 'center', textAlign: 'center'}}>List Posts</h2>
				<ul className="w3-ul w3-card-4">
					<li className="w3-bar">
							<span onClick="this.parentElement.style.display='none'" className="w3-bar-item w3-button w3-white w3-xlarge w3-right">×</span>
						<img src="https://toigingiuvedep.vn/wp-content/uploads/2022/01/hinh-avatar-cute-nu.jpg" className="w3-bar-item w3-circle w3-hide-small" style={{width:"85px"}} />
						<div className="w3-bar-item">
							<span className="w3-large">{postObject.userName}</span><br/>
							<span onClick={()=>{
								if(authState.userName === postObject.userName){
									handleUpdatePost("title")}}}>
									{postObject.title}
								</span><br/>
							<span onClick={()=>{
								if(authState.userName === postObject.userName){
								handleUpdatePost("postText")}}}>
								{postObject.postText}
							</span><br/>
						</div>
					</li>
				</ul>
			</div>
			<div style={{flex: 1}}>
				<h2>List Comments</h2>
				<div style={{alignItems: 'center', marginLeft:"100px"}}>
					<div>
						<div className="formContainer">
							<label for="">Add Comment</label>
							<input type="text" autocomplete="off" value={newsComment}  id="inputCreatePost" name="comment" placeholder="Ex. Comment" onChange={(e)=>{setNewsComment(e.target.value)}} />
							<button type="submit" onClick={onSubmit}> Create Comment</button>
						</div>
					</div>
				</div>
				<ul className="w3-ul w3-card-4" style={{display: "inline-block", margin:"15px 0"}}>
					{postComment.map((values,key)=>{
						return (
						<li key={key} className="w3-bar" style={{}}>
							{authState.userName === values.userName && <span onClick={(id)=>{handleDeleteCmt(values.id)}} className="w3-bar-item w3-button w3-white w3-xlarge w3-right">×</span> }
							<img src="https://toigingiuvedep.vn/wp-content/uploads/2022/01/hinh-avatar-cute-nu.jpg" className="w3-bar-item w3-circle w3-hide-small" style={{width:"85px"}} />
							<div className="w3-bar-item">
								<span className="w3-large">{values.commentsBody}</span><br/>
								{/* <span className="w3-large">{values.createdAt}</span><br/> */}
								<span className="w3-large">User: {values.userName}</span><br/>
							</div>
						</li>
						)
					})}
				</ul>
			</div>
		</div>
	)
}

export default Post