import mongodb from "mongodb"
const ObjectId = mongodb.ObjectId
let restaurants

export default class restaurantsDAO {
    static async injectDB(conn) {
        if (restaurants){
            return
        }
        try{
            restaurants = await conn.db(process.env.RESTREVIEWS_NS).collection("restaurants")
        }catch (e) {
            console.error("UNable to establish connection handle in restaurantsDAO: ",{e})
        }
    }

    static async getresteraunts({
        filters = null,
        page = 0,
        restaurantsPerPage = 20
    }={}) {
        let query
        if (filters) {
            if ("name" in filters) {
                query = {$text: {$search: filters["name"]}}
            }
            else if ("cuisine" in filters) {
                query = {"cuisine": {$eq: filters["cuisine"]}}
            }
            else if ("zipcode" in filters) {
                query = {"address.zipcode": {$eq: filters["zipcode"]}}
            }
        }

        let cursor 

        try {
            cursor = await restaurants
                .find(query)
        }catch(e){
            console.error("unable to find command ,", {e})
            return{ restaurantsList: [], totalNumRestaurants: 0}
        }

        const displayCursor = await cursor.limit(restaurantsPerPage).skip(restaurantsPerPage*page)

        try{
            const restaurantsList = await displayCursor.toArray()
            const NumRestaurants = await restaurants.countDocuments(query)
            console.log({restaurantsList})
            return{restaurantsList, NumRestaurants}
        }catch (e) {
            console.error("unable to convert cursor to array or count documents, ",{e})
            return { restaurantsList: [],totalNumRestaurants:0}
        }
    
    }
    
    static async getRestaurantById(id){
        try {
            const pipeline = [
              {
                  $match: {
                      _id: new ObjectId(id),
                  },
              },
                    {
                        $lookup: {
                            from: "reviews",
                            let: {
                                id: "$_id",
                            },
                            pipeline: [
                                {
                                    $match: {
                                        $expr: {
                                            $eq: ["$restaurantId_id", "$$id"],
                                        },
                                    },
                                },
                                {
                                    $sort: {
                                        date: -1,
                                    },
                                },
                            ],
                            as: "reviews",
                        },
                    },
                    {
                        $addFields: {
                            reviews: "$reviews",
                        },
                    },
                ]
            return await restaurants.aggregate(pipeline).next()
          } catch (e) {
            console.error(`Something went wrong in getRestaurantByID: ${e}`)
            throw e
          }
    }

    static async getCuisine(){
        let cuisine=[]
        cuisine=await restaurants.distinct("cuisine")
        return cuisine

    }

}