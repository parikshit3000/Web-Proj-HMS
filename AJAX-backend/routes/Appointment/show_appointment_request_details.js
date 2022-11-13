const Doctor = require('../../models/Doctors');
const Patient = require('../../models/Patients');
const appointment_data = require('../../models/appointment_data');
//to show status/response of appointment request to doctor of specific patient with specific appointment id 
//THis is used when doctor sees appointment request in detail ( in view details function at frontend) 
const show_appointment_request_details = async (req, res) => {
    const body = req.body
    const id = body.id
    try {
        const patient_data = await appointment_data.find({ _id: id}, 'id status patient__name patient_id patient__phone_no problem date time before_disease').populate('patientd', '-password').sort([['date', 1]]).exec();
        res.send(patient_data);
    }
    catch (err) {
        res.status(500).send({
            message: 'error'
        });
    }
}

module.exports = show_appointment_request_details;