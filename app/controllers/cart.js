var mongoose = require('mongoose');
var express = require('express');

// express router // used to define routes 
var userRouter  = express.Router();
var userModel = mongoose.model('Product')
var responseGenerator = require('./../../libs/responseGenerator');

var cart = [];




module.exports.controllerFunction = function(app) {


	userRouter.get('/All',function(req,res){

        res.send(req.session.cart);


	});


	 userRouter.get('/AddToCart/:p_id',function(req,res){
  	 userModel.findOne({'product_id':req.params.p_id},function(err,foundUser){
                
                // req.session.AddToCart=[];
                
               // req.session.AddToCart.push(foundUser);
                cart.push(foundUser.product_id);
                req.session.cart = cart;
                res.send(req.session.cart);


  	 });

  });


   userRouter.get('/RemoveFromCart/:p_id',function(req,res){



   	    var currentCart = req.session.cart;
   	    var nwCart=[];
   	    // for item in currentCart
   	    	// if(item.product_id != req.params.p_id)
   	    			// nwCart.push(item);
           
           currentCart.forEach(function (item) {
           	 if(item != req.params.p_id)
           			nwCart.push(item);
           });
   	     req.session.cart = nwCart;
   	     cart =req.session.cart
          res.send(nwCart);
     // res.send(req.session.cart);
 });

userRouter.get('/*',function(req,res){
       res.send("u have entered a wrong route");
  });



  app.use('/cart', userRouter);

	}