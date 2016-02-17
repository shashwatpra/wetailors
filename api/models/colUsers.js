var mongoose = require('mongoose');

//var Schema = mongoose.Schema;
//var bcrypt = require('bcrypt-nodejs');

//var UserSchema = new Schema({
//    UserName: {type: String},
//    Password: {type: String},
//    FirstName: {type:String},
//	LastName: {type:String},
//    Gender: {type:String},
//    MobileNo: {type:String },	
//	EmailAddress: {type:String},
//    Address1: {type:String },
//    Address2: {type:String },
//    Address3: {type:String }
//});

module.exports = mongoose.model('colUsers', {
    UserName: {type: String},
    Password: {type: String},
    FirstName: {type:String},
	LastName: {type:String},
    Gender: {type:String},
    MobileNo: {type:String },	
	EmailAddress: {type:String},
    Address1: {type:String },
    Address2: {type:String },
    Address3: {type:String }
});

//module.exports = colUsers;