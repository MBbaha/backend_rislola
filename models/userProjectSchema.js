const { Schema, model } = require("mongoose");

const userProjectSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
      },
      password: {
        type: String,
        required: true,
      },
      firstname: {
        type: String,
        default: "",
      },
      lastname: {
        type: String,
        default: "",
      },
      birthday: {
        type: String, 
      },
      gender: {
        type: String,
        
      },
      address: {
        type: String,
        default: "",
      },
      phone: {
        type: Number,
        default: "",
      
      },
})


  const UserProject = model("UserProject", userProjectSchema);
  
  
  module.exports = { UserProject };