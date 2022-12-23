import React, {useState} from 'react'
import axios from 'axios'
import './css/ChangePass.css'
const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleChangePassword = () => {
    axios.put('http://localhost:3001/auth/changePassword', {oldPassword: oldPassword, newPassword: newPassword}, 
    {
      headers:{
        accessToken : localStorage.getItem('accessToken')
      }
    }
    ).then((response) => {
      if(response.data.errors) {
        alert(response.data.errors);
      }else{
        alert(response.data.success);
      }
    })
  }
  return (
    <div style={{marginTop:"-10px"}}>
      <h2>ChangePassword</h2>
      <div class="container">
        <div style={{marginBottom:"20px"}}>
          <label for="uname" style={{marginRight:"10px"}}><b>Old Password</b></label>
          <input type="password" placeholder="Old Password..." name="uname" required
            onChange={(e)=>{setOldPassword(e.target.value)}}
          />
        <br/>
        </div>

        <div>
        <label for="psw"><b>Password</b></label>
        <input type="password" placeholder="Enter Password" name="psw" required style={{marginLeft:"40px"}} 
          onChange={(e)=>{setNewPassword(e.target.value)}}
        />
        </div>
        <br/>

        <button type="submit" style={{marginLeft:"60px"}} 
          onClick={handleChangePassword}
        >Change Password</button>
    </div>
    </div>
  )
}

export default ChangePassword