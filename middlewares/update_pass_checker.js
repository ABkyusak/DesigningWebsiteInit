var mongoose = require('mongoose');
var userModel = mongoose.model('User')


// app level middleware to set request user 

exports.checkCorrectPassword = function(req,res,next){

	


	if(req.body.password != req.body.password2)
	{

		
		res.redirect('/users/updatePassword/screen')


	}
	else
		next();
}

// end checkLogin