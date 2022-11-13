const Doctor = require('../../models/Doctors');
const Patient = require('../../models/Patients');
const appointment_data = require('../../models/appointment_data');
// #to show the appointment requests passed by RECEPTIONIST to doctor

const doctor_appointment_requests = async (req, res) => {
    const body = req.body
    const doctor_id = body.id
    try {
        const appt_request = await appointment_data.find({ doctor_id: doctor_id}, 'id patient_id patient__name date time').populate('patientd', '-password').sort([['date', 1]]).exec();
        res.send(appt_request);
    }
    catch (err) {
        res.status(500).send({
            message: 'error'
        });
    }
}

module.exports = doctor_appointment_requests;