
import mongodb from "mongodb"
const ObjectId = mongodb.ObjectId
let reviews
export default class ReviewsDAO{

    static async injectDB(conn){
        if (reviews){
            return
        }
        try{
            reviews=await conn.db(process.env.RESTREVIEWS_NS).collection("reviews")
        }catch(e){
            console.error('unable to establis connecion handles in userDAO: ',e.message)
        }
    }
    static async addreview(restaurantId,user,review,date){
        try{
            const reviewDoc ={
                name:user.name,
                user_id:user._id,
                date: date,
                text:review,
                restaurantId_id: ObjectId(restaurantId)

            }
            await reviews.insertOne(reviewDoc)
        }catch(e){
            console.error('unable to post review: ',e)
            return{error: e}
        }

    }
    
    static async deleteReview(reviewId,userId){
        try{
             await reviews.deleteOne({
                _id: ObjectId(reviewId),
                user_id:userId
            })
            
        }catch(e){
            console.error('unable to delete review: ',e)
            return{error: e} 
            }

    }

    static async updatereview(reviewId,userId,text,date){
        try{
            const updateResponse = await reviews.updateOne(
            {user_id:userId,_id: ObjectId(reviewId)},
            {$set: {text:text, date:date} }
            )
                return updateResponse
        }catch(e){
            console.error('unable to post review: ',e)
            return{error: e}
        }
    }
}