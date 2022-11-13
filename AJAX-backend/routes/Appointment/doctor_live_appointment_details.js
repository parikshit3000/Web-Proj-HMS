const Doctor = require('../../models/Doctors');
const Patient = require('../../models/Patients');
const appointment_data = require('../../models/appointment_data');
// #to show the current/live appointment details of a patient under a specific doctor 
// #this appointment is approved by the docter and it is going to happen in future
const doctor_live_appointment_details = async (req, res) => {
    const body = req.body
    const appointment_id = body.id
    try {
        const appt_request = await appointment_data.find({ _id: appointment_id}, 'id doctor__name patient_id patient__name status patient__gender patient__dob patient__email patient__address problem patient__height patient__weight patient__blood before_disease after_disease date time').populate('patientd', '-password').populate('doctord', '-password').sort([['date', 1]]).exec();
        res.send(appt_request);
    }
    catch (err) {
        res.status(500).send({
            message: 'error'
        });
    }
}

module.exports = doctor_live_appointment_details;