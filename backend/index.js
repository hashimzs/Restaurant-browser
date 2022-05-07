import app from "./server.js";
import mongodb from "mongodb"
import dotenv from "dotenv"
import restaurantsDAO from "./DAO/restaurantsDAO.js"
import reviewsDAO from "./DAO/reviewsDAO.js"

dotenv.config()
const MongoClient = mongodb.MongoClient

const port= process.env.PORT || 8000

MongoClient.connect(
    process.env.RESTREVIEWS_DB_URI, 
    {
        maxPoolSize: 50,
        wTimeoutMS:2500,
        useNewUrlParser: true
    })
    .catch(err => {
        console.log(err.stack)
        process.exit(1)
    })
    .then(async client =>{
        await restaurantsDAO.injectDB(client)
        await reviewsDAO.injectDB(client)
        app.listen(port, () => {
            console.log("server is listening on port ",{port})
        })
    
    })



