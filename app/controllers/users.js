var mongoose = require('mongoose');
var express = require('express');

// express router // used to define routes 
var userRouter  = express.Router();
var userModel = mongoose.model('User')
var responseGenerator = require('./../../libs/responseGenerator');
var auth = require("./../../middlewares/auth");
var update_pass_checker = require("./../../middlewares/update_pass_checker");
var checkEmailIdExists = require("./../../middlewares/checkEmailIdExists");
var otp;

module.exports.controllerFunction = function(app) {

    userRouter.get('/login/screen',function(req,res){
                                                    
        res.render('login');

    });//end get login screen

     userRouter.get('/signup/screen',function(req,res){
            
        res.render('signup');

    });//end get signup screen

     userRouter.get('/dashboard',auth.checkLogin,function(req,res){
        
            res.render('dashboard',{user:req.session.user});
       

    });//end get dashboard

    userRouter.get('/logout',function(req,res){
      
      req.session.destroy(function(err) {

        res.redirect('/users/login/screen');

      })  

    });//end logout
    

    userRouter.get('/all',function(req,res){
        userModel.find({},function(err,allUsers){
            if(err){                
                res.send(err);
            }
            else{

                res.send(allUsers);

            }

        });//end user model find 

    });//end get all users

    userRouter.get('/:userName/info',function(req,res){

        userModel.findOne({'userName':req.params.userName},function(err,foundUser){
            if(err){
                var myResponse = responseGenerator.generate(true,"some error"+err,500,null);
                res.send(myResponse);
            }
            else if(foundUser==null || foundUser==undefined || foundUser.userName==undefined){

                var myResponse = responseGenerator.generate(true,"user not found",404,null);
                //res.send(myResponse);
                res.render('error', {
                  message: myResponse.message,
                  error: myResponse.data
                });

            }
            else{

                  res.render('dashboard', { user:foundUser  });

            }

        });// end find
      

    });//end get all users

    userRouter.get('/forgetScreen',function(req,res){

      res.render('forgetPassScreen');
    });



     // userRouter.post('/forgetPass',function(req,res){
                
     //            if(req.body.email != undefined){

     //               userModel.findOne({'email':req.body.email},function(err,foundUser){

     //                if(err){
     //                  var myResponse = responseGenerator.generate(true,"some error"+err,500,null);
     //               //res.send(myResponse);
     //                    res.render('error', {
     //                        message: myResponse.message,
     //                        error: myResponse.data
     //                     });
                         

     //                }else{
                         
     //                     var otp1 = Math.random()*1000;
     //                     var otp2 =Math.random()*1000;
     //                     otp = otp1+otp2;

     //                     //send otp to user email address via nodemailer

     //                     res.render('enterOtp',{email:req.body.email});
     //                }

                            

     //              });

     //            }

     // });


      // userRouter.post('/forgetPass/util/:otp/:email',function(req,res){


      //      if(otp N== req.params.otp){
      //          res.redirect('/updatePassword/req.params.email');

      //      }else{
      //         res.send("enter correct otp");
      //      }



      // });
      userRouter.get('/updatePassword/screen',function(req,res){


        res.render('updatePass');
      });

       userRouter.post('/updatePassword',update_pass_checker.checkCorrectPassword,function(req,res){
              var update = req.body;
              console.log(update);

         
          userModel.findOneAndUpdate({'email':req.session.tmp_email},update,function(err,foundUser){

               if(err){
                  var responce ={
                    error:true,
                    message:"user not found,please enter correct email_id"
                  }
                  res.send("1111");
               }else{
                res.send(foundUser);

               }
          });     





       });

    userRouter.post('/signup',function(req,res){

        if(req.body.firstName!=undefined && req.body.lastName!=undefined && req.body.email!=undefined && req.body.password!=undefined){

            var newUser = new userModel({
                userName            : req.body.firstName+''+req.body.lastName,
                firstName           : req.body.firstName,
                lastName            : req.body.lastName,
                email               : req.body.email,
                mobileNumber        : req.body.mobileNumber,
                password            : req.body.password


            });// end new user 

            newUser.save(function(err){
                if(err){

                    var myResponse = responseGenerator.generate(true,"some error"+err,500,null);
                   //res.send(myResponse);
                   res.render('error', {
                     message: myResponse.message,
                     error: myResponse.data
                   });

                }
                else{

                    //var myResponse = responseGenerator.generate(false,"successfully signup user",200,newUser);
                   // res.send(myResponse);
                   req.session.addToCart = {
                    product_id : "122",
                    product_name : "abc"
                   }

                   req.session.user = newUser;
                   delete req.session.user.password;
                    res.redirect('/users/dashboard');
                   // res.send(req.session.addToCart);
                }

            });//end new user save


        }
        else{

            var myResponse = {
                error: true,
                message: "Some body parameter is missing",
                status: 403,
                data: null
            };

            //res.send(myResponse);

             res.render('error', {
                     message: myResponse.message,
                     error: myResponse.data
              });

        }
        

    });//end get all users


    userRouter.post('/login',function(req,res){

        userModel.findOne({$and:[{'email':req.body.email},{'password':req.body.password}]},function(err,foundUser){
            if(err){
                var myResponse = responseGenerator.generate(true,"some error"+err,500,null);
                res.send(myResponse);
            }
            else if(foundUser==null || foundUser==undefined || foundUser.userName==undefined){

                var myResponse = responseGenerator.generate(true,"user not found. Check your email and password",404,null);
                //res.send(myResponse);
                res.render('error', {
                  message: myResponse.message,
                  error: myResponse.data
                });

            }
            else{

                  req.session.user = newUser;
                   delete req.session.user.password;
                  // res.redirect('/users/dashboard')

            }

        });// end find


    });//end get signup screen

   userRouter.get('/*',function(req,res){
       res.send("u have entered a wrong route");
  });


    // this should be the last line
    // now making it global to app using a middleware
    // think of this as naming your api 
    app.use('/users', userRouter);



 
} //end contoller code
