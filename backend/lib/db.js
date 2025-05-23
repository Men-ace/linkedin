import mongoose from 'mongoose'

export const connectDB = async() => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log(`database connected: ${conn.connection.host}`)
    } catch (error) {
        console.log(`errro conneting to database: ${error.messsage}`)
        process.exit(2)
    }
}