var mongoose = require('mongoose');

var Schema = mongoose.Schema;
//var bcrypt = require('bcrypt-nodejs');

var UserSchema = new Schema({
	
	name: String,
	lastname: String,
	username: { type: String, required: true, index: { unique: true }},
	password: { type: String, required: true, select: false},
	email: {type:String, required:true, select:false}

});

module.exports = mongoose.model('colState', UserSchema);