
// defining a mongoose schema 
// including the module
var mongoose = require('mongoose');
// declare schema object.
var Schema = mongoose.Schema;

var userSchema = new Schema({




	product_name        :{type:String,default:'',required:true},
	product_id			:{type:String,default:'', required:true},
	p_company_name		:{type:String,default:''},
	p_category 			:{type:String,default:''},
	p_description		:[],
	p_date_added		:{type:String,default:''},
	p_date_modified     :{type:String,default:''},
	p_cost				:{type:String,default:''},
	p_avail_qty			:{type:Number,default:0},
	p_tot_qty			:{type:Number,default:'0'},
	p_seller			:{type:String,default:''},
	p_avail_region		:[],
    reviews				:[],
    p_cust_rating       :{type:Number,default:0},
    offers_avail		:[]


	

});


mongoose.model('Product',userSchema);