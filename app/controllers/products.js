var mongoose = require('mongoose');
var express = require('express');

// express router // used to define routes 
var userRouter  = express.Router();
var userModel = mongoose.model('Product')
var responseGenerator = require('./../../libs/responseGenerator');

var cart = [];



module.exports.controllerFunction = function(app) {

    userRouter.get('/all',function(req,res){

      userModel.find({},function(err,allUsers){
            if(err){                
                res.send(err);
            }
            else{
            	 

               res.render('showAllProducts', { user:allUsers });
                // res.send(allUsers);

            }

        });//end user model find all
   });



      userRouter.post('/createP',function(req,res){

              if(req.body.p_company_name != undefined && req.body.product_name != undefined && req.body.p_cost != undefined && req.body.p_tot_qty != undefined & req.body.p_avail_qty != undefined){


              				var product1 = new userModel({

                               	product_name        :  req.body.product_name,
						        product_id			:  req.body.product_name+''+req.body.p_company_name+'123',
								p_company_name		:  req.body.p_company_name,
								p_category 			:  req.body.p_category ,
								p_description		:  req.body.p_description,
								p_cost				: req.body.p_cost, 
								p_avail_qty			: req.body.p_avail_qty,
								p_tot_qty			: req.body.p_tot_qty,
								p_seller			:  req.body.p_seller,
								
              				});
              			}

              	product1.save(function(err){
                     if(err){

                     	var ret = responseGenerator.generate(true,"error occured"+err,500,null);
                     	res.send(ret);

                     }else{
               //farzi jugaad
                     	

                     	res.send(product1);
                     }


              	});
              
      });


      userRouter.get('/:p_id/info',function(req,res){

      		 userModel.findOne({'product_id':req.params.p_id},function(err,foundUser){

      		 		if(err){
                    	var ret = responseGenerator.generate(true,"error occured"+err,"error in finding",null);
                    	res.send(ret);

      		 		}else if(foundUser == undefined || foundUser == null){
      		 			 var ret = responseGenerator.generate(false,null,"user data not found",null);
                    	res.send(ret);
                      
      		 		}else{
      		 			res.send(foundUser);
   		      		 	}

		});

      });


	userRouter.post('/update/:p_id',function(req,res){

		     var update = req.body;

			userModel.findOneAndUpdate({'product_id':req.params.p_id},update,function(err,foundUser){

				if(err)
				{ 		var ret = responseGenerator.generate(true,"error occured"+err,"error in finding",null);
                    	res.send(ret);
				}else if(foundUser == undefined || foundUser == null){
                      var ret = responseGenerator.generate(false,null,"user data not found could not update",null);
                    	res.send(ret);
				}else{
					res.send(update);


				}
				
                 });

	});



 userRouter.delete('/delete/:p_id',function(req,res){

	// userModel.find({product_id: req.params.p_id }, function(err, foundUser) {
 //  				if (err){

 //  					var ret = responseGenerator.generate(true,"error occured"+err,"error in finding",null);
 //                    	res.send(ret);

 //  				}

 //  					foundUser.remove(function(err) {
  				
 //    					if (err) 
 //    					{
 //    						var ret = responseGenerator.generate(true,"error occured"+err,"error in delete",null);
 //                    	     res.send(ret);
 //    					}else{
 //    						res.send("successfully delete"+ foundUser);
 //    					}

             				
 // 				 });
	// });
	userModel.remove({product_id: req.params.p_id },function(err,result){
          if(err){
          	var ret = responseGenerator.generate(true,"error occured"+err,"error in finding",null);
                     	res.send(ret);
          }else{
          	res.send(result);
          }


	});

});

// userRouter.get('/AddToCartUtil/:p_id',function(req,res){


 
    


    app.use('/products', userRouter);


}