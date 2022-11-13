const mongoose = require('mongoose');

const appointment_dataSchema = new mongoose.Schema({
	patient_id: {
		type: String,
		required: true,
	},

	doctor_id: {
		type: String,
		required: true
	},

	problem: {
		type: String,
	},

	payment_status: {
		type: String,
		default: "Pending",
	},

	amount: {
		type: String,
		default: '500',
	},

	before_disease: {
		type: String,
	},
	after_disease: {
		type: String,
	},

	report: {
		type: String,
	},

	date: {
		type: String,
	},

	time: {
		type: String,
	},

	time_of_registering_appointment: {
		type: Date, default: Date.now
	},
	prescription: {
		type: String,
	},
	status: {
		type: String,
		default: "Confirmed"
	},

	receptionist_response: {
		type: String,
		default: "approved"
	},


	receptionist_reason: {
		type: String,
	},

	doctor_response: {
		type: String,
		default: "Confirmed"
	},


	doctor_reason: {
		type: String,
	},

	is_modify_by_doc: {
		type: String,
		default: "none"
	},
	// patientd: {
	// 	type: mongoose.Schema.Types.ObjectId,
	// 	ref: Patients,
	// 	localField: 'patient',
	// 	foreignField: 'username',
	// 	justOne: true,
	// 	// The below option tells this plugin to always call `populate()` on
	// 	// `populatedField`
	// 	autopopulate: true
	// }

});
appointment_dataSchema.virtual('patientd', {
	ref: 'Patients',
	localField: 'patient_id',
	foreignField: 'username',
	justOne: true
  });
  appointment_dataSchema.virtual('doctord', {
	ref: 'Doctor',
	localField: 'doctor_id',
	foreignField: 'username',
	justOne: true
  });
//module.exports = mongoose.model('Doctor', doctorSchema);
// appointment_dataSchema.plugin(require('mongoose-autopopulate'));
appointment_dataSchema.set('toJSON', {
	virtuals: true
});
module.exports = new mongoose.model('appointment_data', appointment_dataSchema);;