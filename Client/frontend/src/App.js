import React from 'react'
import {Routes,Route,Link} from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"

import AddReview from './components/add-review'
import Login from './components/login'
import Restaurant from './components/restaurants'
import RestaurantsList from './components/restaurants-list'

const App = () => {

  async function logout(){
    setuser(null)
  }

  async function login(user=null){
    setuser({...user})
  }
  
  const [user,setuser] = React.useState(null)

  return (
    <>
       <nav className="navbar navbar-expand navbar-dark bg-dark">
         <a href="/" className="navbar-brand">
           Restaurant Reviews
         </a>

         <div>
           <div className="navbar-nav mr-auto">

              <li className="nav-item">
                  <Link to="/" className="nav-link">
                      Restaurants
                  </Link>
              </li>

              {
                user? (
                  <li className="nav-item">
                    <div onClick={logout} className="nav-link">
                       Logout {user.name}
                    </div>
                  </li>
                ) : (
                  <li className="nav-item">
                    <Link to="/login" className="nav-link">
                       Login
                    </Link>
                  </li>
                )
              }
           </div>
         </div>
        </nav>
      
        <div className="container mt-3">
        <Routes>
          <Route exact path="/" element={<RestaurantsList/>} />
          <Route 
            path="/restaurants/:id/review/:type"
            element={<AddReview user={user}/>}
          />
          <Route 
            path="/restaurants/:id"
            element={<Restaurant user={user} />}
          />
          <Route 
            path="/login"
            element={<Login Login={login} />}
          />
        </Routes>
      </div>
              
        
    </>
  );
}

export default App
