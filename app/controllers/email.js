var mongoose = require('mongoose');
var express = require('express');

// express router // used to define routes 
var userRouter  = express.Router();
var userModel = mongoose.model('User')
var responseGenerator = require('./../../libs/responseGenerator');
var auth = require("./../../middlewares/auth");
var otp;
var checkEmailIdExists = require("./../../middlewares/checkEmailIdExists");




module.exports.controllerFunction = function(app){




var prt1;
var prt2;
var prt;

var tmp_email;


userRouter.post('/generate',checkEmailIdExists.checkEmailIdExists,function(req,res){
     
     console.log("inside /otp/generate");
     prt1 = Math.floor(Math.random()*1000);
     prt2 = Math.floor(Math.random()*1000);

     prt = String(prt1)+String(prt2);
     console.log("prt1"+" "+prt1+" "+"prt2"+" "+prt2+ " "+prt);


    const nodemailer = require('nodemailer');

// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'abhishekkumar13395@gmail.com',
        pass: '8756673935'
    }
});


    req.session.tmp_email = req.body.email;

// setup email data with unicode symbols
let mailOptions = {
    from: 'abhishekkumar13395@gmail.com', // sender address
    to: req.body.email, // list of receivers
    subject: 'Hello ✔ OTP generated ' , // Subject line
   // plain text body

    

     
    html: prt
    
   

};

// send mail with defined transport object
transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        return console.log(error);
    }
    console.log('Message %s sent: %s', info.messageId, info.response);
});




 res.render('otpenter');

});

userRouter.get('/otpEnter',function(req,res){

  


});




userRouter.post('/checkOTP',function(req,res){
           

           if(req.body.otp != undefined){

              if(req.body.otp == prt){
                var email_id =req.session.tmp_email;
                console.log("email_id");
                var resp = responseGenerator.generate("false","successful match",null,null);
                res.redirect('/users/updatePassword/screen')
                // res.send(resp);
               }
              else
                res.send("unsuccessfull match of otp");
           }

    });



userRouter.get('/*',function(req,res){
       res.send("u have entered a wrong route");
  });

app.use('/email_reset',userRouter);
}

