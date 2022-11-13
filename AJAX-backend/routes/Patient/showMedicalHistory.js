const Doctor = require('../../models/Doctors');
const Patient = require('../../models/Patients');
const appointment_data = require('../../models/appointment_data');
// #to show medical history of patient .medical history contains the details of all appointments done by the patient.

const showMedicalHistory = async (req, res) => {
    const body = req.body
    const id = body.id
    try {
        const patient_data = await appointment_data.find({ patient_id: id}, 'id patient__name doctor__name doctor_id problem report prescription date time before_disease after_disease').populate('patientd', '-password').populate('doctord', '-password').sort([['date', -1]]).exec();
        res.send(patient_data);
    }
    catch (err) {
        res.status(500).send({
            message: 'error'
        });
    }
}

module.exports = showMedicalHistory;