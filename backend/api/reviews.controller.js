import ReviewsDAO from "../DAO/reviewsDAO.js";

export default class ReviewsController{
    static async apiPostReview(req,res,next){
        try{
            const restaurantId=req.body.restaurantId
            const review=req.body.text
            const user = {
            name:req.body.name,
            _id:req.body.user_id
            }
        const date = new Date()

        await ReviewsDAO.addreview(
            restaurantId,
            user,
            review,
            date
        )
        res.json({status:"success"})
        }catch(e){
            res.status(500).json({error: e})
        }
    }

    static async apiUpdateReview(req,res,next){
        try{
        const reviewId=req.body.review_id
        const user_id=req.body.user_id
        const text = req.body.text
        const date= new Date()
        console.log(reviewId)
        console.log(user_id)


        const reviewResponse = await ReviewsDAO.updatereview(
            reviewId,
            user_id,
            text,
            date
        )
        var {error}= reviewResponse
        if(error){
            res.status(400).json({error})
        }
            res.json({status:"success"})
        
        }catch(e){
            res.status(500).json({error: e})
        }
    }

    static async apiDeleteReview(req,res,next){
        const reviewId=req.body.review_id
        const userId=req.body.user_id
        console.log(reviewId)
        console.log(userId)
        try{
            await ReviewsDAO.deleteReview(
               reviewId,
               userId
            )
            res.json({status:"success"})
        }catch(e){
            res.status(500).json({error:e.message})
        }
    }

}