const Doctor = require('../../models/Doctors');
const Patient = require('../../models/Patients');
const appointment_data = require('../../models/appointment_data');
// #to show the current/live appointments list of a specific doctor 
// #these appointments are approved by the docter and they are going to happen in future
const doctor_live_appointments_list = async (obj, res) => {
    const body = obj.body
    const id = body.id
    try {
        const appt_request = await appointment_data.find({ doctor_id: id}, 'id patient_id problem date time').populate('patientd', '-password').sort([['date', 1]]).exec();
        res.send(appt_request);
    }
    catch (err) {
        res.status(500).send({
            message: 'error'
        });
    }
}

module.exports = doctor_live_appointments_list;