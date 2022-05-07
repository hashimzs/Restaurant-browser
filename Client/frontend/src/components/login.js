import React from 'react'
import {link,useNavigate} from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"

const Login = ({Login}) => {
  const [user,setuser]=React.useState({name:"", id:""})
  const navigate=useNavigate();
  const login = () => {
    Login(user)
    navigate('/');
  }

  const handleInputChange=(e)=>{
    const {name,value}=e.target
    setuser({...user, [name]:value})
  }
  return (
    <>
    <div>
    <div className="submit-form">
      <div>
        <div className="form-group">
          <label htmlFor="user">Username</label>
          <input
            type="text"
            className="form-control"
            id="name"
            required
            value={user.name}
            onChange={handleInputChange}
            name="name"
          />
        </div>

        <div className="form-group">
          <label htmlFor="id">ID</label>
          <input
            type="text"
            className="form-control"
            id="id"
            required
            value={user.id}
            onChange={handleInputChange}
            name="id"
          />
        </div>

        <button onClick={login} className="btn btn-success">
          Login
        </button>
      </div>
    </div>
    </div>
    </>
  )
}

export default Login
