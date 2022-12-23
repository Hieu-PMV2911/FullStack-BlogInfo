import './App.css'
import {BrowserRouter as Router,Route, Routes, Link} from 'react-router-dom'
import Home from './pages/Home.js';
import Create from './pages/Create.js';
import Post from './pages/Post';
import Register from './pages/Register';
import Login from './pages/Login';
import PageNotFound from './pages/PageNotFound';
import { AuthContext } from './helpers/Helpers';
import {useState, useEffect} from 'react'
import axios from 'axios';
import Profile from './pages/Profile';
import ChangePassword from './pages/ChangePassword';
function App() {
  const [authState, setAuthState] = useState({
    userName: "",
    id: 0,
    status: false,
  });
  useEffect(()=>{
    axios.get("http://localhost:3001/auth/auth",{
      headers:{
        accessToken : localStorage.getItem("accessToken")
      }
    }).then((response)=>{
      if(response.data.error){
        setAuthState({
          userName: "",
          id: 0,
          status: false,
        });
      }else{
        setAuthState({
          userName: response.data.userName,
          id: response.data.id,
          status: true,
        });
      }
    })
  },[])
  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    setAuthState({
      userName: "",
      id: 0,
      status: false
    });
  }
  return (
    <div className="App" style={{}}>
      <AuthContext.Provider value={{authState, setAuthState}} >
        <Router>
          <div className="navbar">
            {localStorage.getItem('accessToken') &&
              (
                <>
                  <Link className="navbar-link" to="/">Home Page</Link><br />
                  <Link className="navbar-link" to="/create">Create A Post</Link>
                </>
              )
 }
            {
              !authState.status ? (
                <>
                  <Link className="navbar-link" to="/register">Register</Link>
                  <Link className="navbar-link" to="/login">Login</Link>
                  {/* setAuthState(true) */}
                </>
              ) : (
                <>
                  <h7 onClick={handleLogout} style={{cursor:"pointer"}} className="navbar-link">Logout</h7>
                </>
              )
            }
            <h7 style={{marginLeft:"20px"}}>{authState.userName}</h7>
          </div>
          <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/create" element={<Create />} />
              <Route path="/post/:id" element={<Post />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/profile/:id" element={<Profile />} />
              <Route path="/changePassword" element={<ChangePassword />} />
              <Route path="/*" element={<PageNotFound />} />
          </Routes>
        </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
