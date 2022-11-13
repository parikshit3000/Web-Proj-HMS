const Doctor = require('../../models/Doctors');
const Patient = require('../../models/Patients');
const appointment_data = require('../../models/appointment_data');
// #function to show show current/live appointments of patient which are approved by the doctor and which are going to take place in future 

const showCurrentAppointments = async (req, res) => {
    const body = req.body
    const id = body.id
    try {
        const patient_data = await appointment_data.find({ patient_id: id}, 'id patient__name receptionist_response receptionist_reason doctor_response status doctor_reason doctor__name doctor_id problem report prescription date time before_disease after_disease is_modify_by_doc').populate('patientd', '-password').populate('doctord', '-password').sort([['date', 1]]).exec();
        res.send(patient_data);
    }
    catch (err) {
        res.status(500).send({
            message: 'error'
        });
    }
}

module.exports = showCurrentAppointments;