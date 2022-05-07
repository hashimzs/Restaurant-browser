import React from 'react'
import {Link,useParams,useLocation} from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"
import RestaurantDataService from "../services/restaurant"

const Addreview = (props) => {
  const location=useLocation()
  const [review,setreview]=React.useState("")
  const [editing,setediting]=React.useState(false)
  let {type}= useParams();
  let {id}=useParams();
  const [submitted,setsubmitted]=React.useState(false)
  const saveReview=(e)=>{
      var data ={
        text:review,
        name:props.user.name,
        user_id:props.user.id,
        restaurantId: id,
        review_id:""
      }
      if (editing){
        data.review_id=location.state._id
        RestaurantDataService.updateReview(data)
        .then(response => {
          setsubmitted(true)
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
      }
      else{
        RestaurantDataService.createReview(data)
        .then(response => {
          setsubmitted(true)
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
      }
  }

  React.useEffect(()=>{
    if (type==="edit"){
      setediting(true)
    }
  },[])

  const handleInputChange = (e)=>{
    setreview(e.target.value)
  }
  return (
    <>
     <div>
      {props.user ? (
      <div className="submit-form">
        {submitted ? (
          <div>
            <h4>You submitted successfully!</h4>
            <Link to={"/restaurants/" + id} className="btn btn-success">
              Back to Restaurant
            </Link>
          </div>
        ) : (
          <div>
            <div className="form-group">
              <label htmlFor="description">{ editing ? "Edit" : "Create" } Review</label>
              <input
                type="text"
                className="form-control"
                id="text"
                required
                value={review}
                onChange={handleInputChange}
                name="text"
              />
            </div>
            <button onClick={saveReview} className="btn btn-success">
              Submit
            </button>
          </div>
        )}
      </div>

      ) : (
      <div>
        Please log in.
      </div>
      )}

    </div>
    </>
  )
}

export default Addreview
