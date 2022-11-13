
	const mongoose = require('mongoose');

	const doctorSchema = new mongoose.Schema({
		name:{
			type:String,
			required: true,
			maxlength: 200
		},

		username:{
			type:String,
			required: true
		},

		dob:{
			type:String,
			required: true
		},

		email:{
			type:String,
			required: true
		},

		password:{
			type:String,
			default: '1234',
			required: true
		},

		status:{
			type:String,
			default: 'Active'
		},

		phone_no:{
			type:String,
			default: ' ',
			required: true
		},

		gender:{
			type:String,
			default:' ',
			required: true
		},

		photo:{
			type:String,
		},

		department:{
			type:String,
			default: 'doctor',
			required: true
		}
	});
	doctorSchema.set('toJSON', {
		virtuals: true
	});
	//module.exports = mongoose.model('Doctor', doctorSchema);


	module.exports = new mongoose.model('Doctor', doctorSchema);;