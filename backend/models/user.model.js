import mongoose, { MongooseError } from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    username: {
         type: String,
         required: true,
         unique: true
    },
    email: {
        type:String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true,
    },
    profilePictures:{
        type: String,
        default: "",
    },
    bannerImg: {
        type: String,
        default: "",
    },
    headline: {
        type: String,
        default: "Linkedin User"
    },
        location:{
            type: String,
            default: "earth",
    },
    about: {
        type: String,
        default: "",
    },
    skills: [String], 
    experience: [
        {
            title: String,
            company: String,
            startDate: Date,
            endDate: Date,
            description: String
        },
    ],
    education: [
        {
            school: String,
            fieldOfStudy: String,
            startDate: Date,
            endDate: Date, 
        },
    ],
    connections: [{
        type: mongoose.Schema.Types.ObjectId, ref:"User"  // this means each connections with different user id is related to user. 
    }]
}, 
{
    timestamps: true
})

const  User = mongoose.model("User", userSchema)

export default User