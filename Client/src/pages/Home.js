import axios from 'axios';
import {useEffect, useState, useContext} from 'react'
import { useNavigate , Link , useParams } from 'react-router-dom'
import { LikeOutlined } from '@ant-design/icons';
import './css/Home.css'
import {AuthContext} from '../helpers/Helpers'
const Home = () => {
	const {id} = useParams();
	const navigate = useNavigate()
	const {authState} = useContext(AuthContext)
	const [likePost, setLikePost] = useState([])
	const [listOfPost, setListOfPost] = useState([])
	const [listPotsUser, setListPotsUser] = useState([]);
	useEffect(()=>{
		if(!localStorage.getItem('accessToken')){
			navigate('/login')
		}else{
			axios.get("http://localhost:3001/posts",
			{headers:{
				accessToken : localStorage.getItem('accessToken')
			}
			}).then((response)=>{
			setListOfPost(response.data.listPost);
			setLikePost(response.data.likePost.map((like)=>{
				return like.PostId;
			}));
			})		
		}
	}, []);

	useEffect(() => {
		axios.get(`http://localhost:3001/posts/byUserId/${id}`, {headers:{
			accessToken : localStorage.getItem('accessToken')
		}}).then((response) =>{
			setListPotsUser(response.data)
		});
	},[])



	const handleLike = (PostId) => {
		axios.post(`http://localhost:3001/likes`,{PostId:PostId}, 
		{headers:{
			accessToken : localStorage.getItem('accessToken')
		}}).then((response)=>{
			setListOfPost(listOfPost.map((post)=>{
				if(post.id === PostId){
					if(response.data.likes){
						return {...post, Likes : [...post.Likes, 0]};
					}else{
						const likeOld = post.Likes;
						likeOld.pop();
						return {...post,  Likes : likeOld};
					}
				}else{
					return post;
				}
			}))
			if(likePost.includes(PostId)){
				setListOfPost.filter((id) =>{
					return id != PostId;
				})
			}else{
				setLikePost([...likePost], PostId);
			}
		})
	}

	const handleDeletePost = (id) =>{
		axios.delete(`http://localhost:3001/posts/delete/${id}`,
		{headers:{
			accessToken : localStorage.getItem('accessToken')
		}}).then((response) =>{
			navigate('/')
			alert("Delete Success. Pls reload page again!!!");
		})
	}



	return (
		<div className="App">
			<div className="w3-container">                                                                                                
				<h2>List Posts</h2>
				<ul className="w3-ul w3-card-4">
					{listOfPost.map((values,key)=>{
						return (
						<li key={key} className="w3-bar">
							{authState.userName === values.userName && <span onClick={()=>{handleDeletePost(values.id)}} className="w3-bar-item w3-button w3-white w3-xlarge w3-right">×</span>}
							<span onClick={()=>{handleLike(values.id)}} className="w3-bar-item w3-button w3-white w3-xlarge w3-right">
							<LikeOutlined className={likePost.includes(values.id) ? "unLike" : "Like"} />{values.Likes.length}
							</span>
							<Link to={`/profile/${values.UserId}`}>
								<img src="https://toigingiuvedep.vn/wp-content/uploads/2022/01/hinh-avatar-cute-nu.jpg" className="w3-bar-item w3-circle w3-hide-small" style={{width:"85px"}} />
							</Link>
							<div className="w3-bar-item" onClick={()=>{navigate(`/post/${values.id}`)}}>
								<span  style={{fontSize:"25px", color:"black"}}>{values.userName}</span><br/>
								<span style={{fontSize:"20px", marginLeft:"-15px"}}>{values.title}</span><br/>
							</div>
						</li>
						)
					})}
				</ul>
			</div>
		</div>
	);
}

export default Home
