import restaurantsDAO from "../DAO/restaurantsDAO.js";


export default class RestaurantsController{
    static async apiGetRestaurants(req,res,next){
        const page=req.query.page ? parseInt(req.query.page) : 0
        const restaurantsPerPage=req.query.restaurantsPerPage ? parseInt(req.query.restaurantsPerPage) : 20

        let filters = {}
        if(req.query.name){
            filters.name = req.query.name
        }
        else if(req.query.cuisine){
            filters.cuisine = req.query.cuisine
        }
        else if(req.query.zipcode){
            filters.zipcode = req.query.zipcode
        }
        
        const { restaurantsList,NumRestaurants } = await restaurantsDAO.getresteraunts({
            filters,
            page,
            restaurantsPerPage
        })
        
        let response = {
            restaurants:restaurantsList,
            page: page,
            filters: filters,
            entries_per_page: restaurantsPerPage,
            total_results: NumRestaurants
        }
        
        res.json(response)
    }

    static async apiGetRestaurantById(req,res,next){
        try{
            let id=await req.params.id || {}
            let restaurant= await restaurantsDAO.getRestaurantById(id)
            if(!restaurant){
                res.status(404).res.json({error:"not found"})
                return
            }
            res.json({restaurant})
        }catch(e){
            console.log('api ',e)
            res.status(500).json({error:e})
        }
       
    }

    static async apiGetCusines(req,res,next){
        try{
            let cuisine=await restaurantsDAO.getCuisine()
            res.json({cuisine})
        }catch(e){
            console.log('api ',e)
            res.status(500).json({error:e})
        }
    }
}