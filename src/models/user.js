import bcrypt from "bcrypt";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
   email:{type:String, required:true},
   avatarUrl: String,
   socialOnly:{type: Boolean, default:false},
   username:{type:String, required:true, unique:true},
   password:{type:String},
   name:{type:String, required:true},
   comments: [
    {type: mongoose.Schema.Types.ObjectId, ref:"Comment"}
    ],
   videos: [
    {type: mongoose.Schema.Types.ObjectId, ref:"Video"}
    ],
});



/**Encrypt the password before every 'save' event.*/
const encryptPassword = async function() {  
    if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
}};

userSchema.pre("save", encryptPassword);

const User = mongoose.model("User", userSchema);
export default User;