var Campground = require("../models/campground");
var Comment = require("../models/comment");

// ALL THE MIDDLEWARE GOES HERE
var middlewareObject={};

middlewareObject.checkCampgroundOwnership = function(req, res, next){
     // is user logged in?
    if(req.isAuthenticated()){
        Campground.findById(req.params.id, function(err, foundCampground){
            if(err){
                req.flash("error", "Campground not found");
                res.redirect("/campgrounds");
            } else{
                // does user own the campground
                if(foundCampground.author.id.equals(req.user._id) || req.user.isAdmin){
                    next();
                }else{
                     req.flash("error", "You don't have permission to do that");
                    res.redirect("back");
                }
            }
        });        
        }else{
            req.flash("error", "You need to be logged in to do that");
           res.redirect("back");
        }   
}


middlewareObject.checkCommentOwnership = function(req, res, next){
     // is user logged in?
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, function(err, foundComment){
            if(err){
                req.flash("error", "Comment not found");
                res.redirect("/campgrounds");
            } else{
                // does user own the campground
                if(foundComment.author.id.equals(req.user._id) || req.user.isAdmin){
                    next();
                }else{
                    req.flash("error", "You don't have permission to do that");
                    res.redirect("back");
                }
            }
        });        
        }else{
            req.flash("error", "You need to be logged in to do that");
           res.redirect("back");
        }   
}


// MIDDLEWARE
middlewareObject.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "You need to be logged in to do that");
    res.redirect("/login");
}


module.exports = middlewareObject;