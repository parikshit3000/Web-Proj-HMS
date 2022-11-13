const Doctor = require('../../models/Doctors');
const Patient = require('../../models/Patients');
const appointment_data = require('../../models/appointment_data');
// #to show payment history of the all the appointments requested by the patient (sin)

const showPaymentHistory = async (req, res) => {
    const body = req.body
    const id = body.id
    try {
        const patient_data = await appointment_data.find({ patient_id: id,}, 'patient__name doctor__name doctor_id after_disease amount date time time_of_registering_appointment').populate('patientd', '-password').populate('doctord', '-password').sort([['time_of_registering_appointment', -1]]).exec();
        res.send(patient_data);
    }
    catch (err) {
        res.status(500).send({
            message: 'error'
        });
    }
}

module.exports = showPaymentHistory;