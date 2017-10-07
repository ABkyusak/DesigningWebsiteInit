var mongoose = require('mongoose');
var userModel = mongoose.model('User')


// app level middleware to set request user 

exports.checkEmailIdExists = function(req,res,next){

	 userModel.findOne({'email':req.body.email},function(err,foundUser){
        if(err){
           console.log("user with this username doesnt exist");
           res.redirect('/users/forgetScreen');
        }else if(foundUser == null || foundUser == undefined)
              res.redirect('/users/forgetScreen');
          else

        	next();
        

      });

}

// end checkLogin