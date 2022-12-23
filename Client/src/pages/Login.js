import React, {useEffect, useState, useContext} from 'react'
import axios from 'axios';
import {useParams, useNavigate} from 'react-router-dom'
import { AuthContext } from '../helpers/Helpers';
const Login = () => {
	const [userName, setUserName] = useState("")
	const [password, setPassword] = useState("")
	const navigation = useNavigate()
	const {setAuthState} = useContext(AuthContext)
	const onSubmit = async (data) => {
		await axios.post("http://localhost:3001/auth/user/login", {userName: userName, password: password}).then((response)=>{
			// navigation("/")
			if(response.data.errors){
				alert(response.data.errors)
			}else{
				localStorage.setItem("accessToken", response.data.token);
				setAuthState({
					userName: response.data.userName,
					id: response.data.id,
					status: true,
				})
				navigation("/")
			}
		})
	}

  return (
    <div style={{marginTop:"-10px"}}>
	<h2>Login</h2>
		<div style={{alignItems: 'center', display:"inline-block"}}>
			<div>
				<div className="formContainer">
				<label for="">User</label>
				<input type="text" autocomplete="off"
				value={userName}  id="inputCreatePost" name="comment" placeholder="Ex. Comment" onChange={(e)=>{setUserName(e.target.value)}} />
				<label for="">Password</label>
				<input type="password" autocomplete="off"
				value={password}  id="inputCreatePost" name="comment" placeholder="Ex. Comment" onChange={(e)=>{setPassword(e.target.value)}} />
				<button type="submit" onClick={onSubmit}> Login </button>
				</div>
			</div>
		</div>
	</div>
  )
}

export default Login