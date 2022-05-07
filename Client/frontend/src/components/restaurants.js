import React from 'react'
import restaurantDataService from "../services/restaurant"
import {Link,useParams} from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"

const Restaurant = (props) => {
  const [restaurant,setRestaurant]=React.useState({
    id: null,
    name: "",
    address: {},
    cuisine: "",
    reviews: []
  })

  let {id}= useParams();

  React.useEffect(()=>{
    restaurantDataService.get(id)
    .then(response=>{
      console.log(response.data.restaurant)
      setRestaurant(response.data.restaurant)
    })
    
    console.log(id)
  },[id])
console.log(props.user.id)
  const deleteReview = (reviewId,index)=>{
    restaurantDataService.deleteReview(reviewId,props.user.id)
    .then(Response=>{
      setRestaurant(prevState=>{ 
        prevState={...prevState}
        prevState.reviews.splice(index,1)
        return prevState
      })
    })
  }

  return (
    <>
    <div>
      {restaurant ? (
        <div>
          <h5>{restaurant.name}</h5>
          <p>
            <strong>Cuisine: </strong>{restaurant.cuisine}<br/>
            <strong>Address: </strong>{restaurant.address.building} {restaurant.address.street}, {restaurant.address.zipcode}
          </p>
          {
            props.user? (
              <Link to={"/restaurants/" + id + "/review/new"} className="btn btn-primary">
                Add Review
              </Link>
            ) : (
              <Link to={"/login"} className="btn btn-primary">
               login
              </Link>
            )
          }
         
          <h4> Reviews </h4>
          <div className="row">
            {restaurant.reviews.length > 0 ? (
             restaurant.reviews.map((review, index) => {
               return (
                 <div className="col-lg-4 pb-1" key={index}>
                   <div className="card">
                     <div className="card-body">
                       <p className="card-text">
                         {review.text}<br/>
                         <strong>User: </strong>{review.name}<br/>
                         <strong>Date: </strong>{review.date}
                       </p>
                       {props.user && props.user.id === review.user_id &&
                          <div className="row">
                            <div onClick={() => deleteReview(review._id, index)} className="btn btn-primary col-lg-5 mx-1 mb-1">Delete</div>
                            <Link to={"/restaurants/" + id + "/review/edit"}
                              state={review}
                                
                             className="btn btn-primary col-lg-5 mx-1 mb-1">Edit</Link>
                          </div>                   
                       }
                     </div>
                   </div>
                 </div>
               );
             })
            ) : (
            <div className="col-sm-4">
              <p>No reviews yet.</p>
            </div>
            )}

          </div>

        </div>
      ) : (
        <div>
          <br />
          <p>No restaurant selected.</p>
        </div>
      )}
    </div>
    </>
  )
}

export default Restaurant
