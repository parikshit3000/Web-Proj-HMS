
	const mongoose = require('mongoose');

	const patientSchema = new mongoose.Schema({
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
		height:{
			type:String			
		},
		weight:{
			type:String			
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
		blood:{
			type:String,
		},
		address:{
			type:String,	
		}
	});

	//module.exports = mongoose.model('Doctor', doctorSchema);

	patientSchema.set('toJSON', {
		virtuals: true
	});
	module.exports = new mongoose.model('Patients', patientSchema);;