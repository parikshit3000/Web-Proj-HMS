const Doctor = require('../../models/Doctors');
const Patient = require('../../models/Patients');
const appointment_data = require('../../models/appointment_data');
// #to show status/response of appointment request to patient

const showMedicalHistory = async (req, res) => {
    const body = req.body
    const id = body.id
    try {
        const patient_data = await appointment_data.find({ patient_id: id}, 'id status patient__name receptionist_response receptionist_reason doctor_response doctor_reason doctor__name doctor_id problem date time before_disease is_modify_by_doc').populate('patientd', '-password').populate('doctord', '-password').sort([['date', -1]]).exec();
        res.send(patient_data);
    }
    catch (err) {
        res.status(500).send({
            message: 'error'
        });
    }
}

module.exports = showMedicalHistory;