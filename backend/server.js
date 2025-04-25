import express from "express"
import dotenv from "dotenv"
import authRoutes from "./routes/auth.route.js"
import userRoutes from "./routes/user.route.js"
import { connectDB } from "./lib/db.js"
import cookieParser from "cookie-parser"
import postRoutes from "./routes/post.route.js"
import notificationRoutes from "./routes/notification.route.js"
import connectionRoute from "./routes/connection.route.js"
 
dotenv.config()
const app = express()

app.use(express.json({limit:"5mb"}))
app.use(cookieParser)
const PORT = process.env.PORT ||  5000

app.use("/api/v1/auth", authRoutes)
app.use("/api/v1/users", userRoutes)
app.use("/api/v1/posts", postRoutes)
app.use("/api/v1/notifications", notificationRoutes)
app.use("/api/v1/connections", connectionRoute)

//
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
    connectDB()
})