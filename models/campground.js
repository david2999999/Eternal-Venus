var mongoose = require("mongoose");
mongoose.Promise = global.Promise;

// Schema setup (blue print for the object)
var campgroundSchema = new mongoose.Schema({
   name: String,
   price: String,
   image: String,
   description: String,
   location: String,
   lat: Number,
   lng: Number,
   createdAt: {type: Date, default: Date.now},
   author: {
      id:{
         type: mongoose.Schema.Types.ObjectId,
         ref: "User"
      },
      username: String
   },
   comments: [
         {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
         }
      ]
});

//Creates a model of the Campground object
module.exports = mongoose.model("Campground", campgroundSchema);

