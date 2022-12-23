import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {Link, useParams} from 'react-router-dom'
const Profile = () => {
  const {id} = useParams();
  const [userName, setUserName] = useState("");
  const [listPotsUser, setListPotsUser] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:3001/auth/byUserId/${id}`, {headers:{
      accessToken : localStorage.getItem('accessToken')
    }}).then((response) =>{
      setUserName(response.data.userName)
    });

    axios.get(`http://localhost:3001/posts/byUserId/${id}`, {headers:{
      accessToken : localStorage.getItem('accessToken')
    }}).then((response) =>{
      setListPotsUser(response.data)
    });
  },[])

  return (
    <div style={{marginTop:"-10px"}}>
    <h2>User {userName}</h2>
    <button style={{marginBottom:"10px"}}>
      <Link to='/changePassword' style={{textDecoration: "none"}}>
      Change Password
      </Link>
      </button>
				<ul className="w3-ul w3-card-4">
					{listPotsUser.map((values,key)=>{
						return (
						<li key={key} className="w3-bar">
							<span className="w3-bar-item w3-button w3-white w3-xlarge w3-right">
							</span>
              <Link to={`/profile/${values.UserId}`}>
							  <img src="https://toigingiuvedep.vn/wp-content/uploads/2022/01/hinh-avatar-cute-nu.jpg" className="w3-bar-item w3-circle w3-hide-small" style={{width:"85px"}} />
              </Link>
							<div className="w3-bar-item">
								<span  style={{fontSize:"25px", color:"black"}}>{values.userName}</span><br/>
								<span style={{fontSize:"20px", marginLeft:"-15px"}}>{values.title}</span><br/>
							</div>
						</li>
						)
					})}
				</ul>
    </div>
  )
}

export default Profile