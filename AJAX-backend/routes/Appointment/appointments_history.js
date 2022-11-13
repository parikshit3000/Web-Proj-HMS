const Doctor = require('../../models/Doctors');
const Patient = require('../../models/Patients');
const appointment_data = require('../../models/appointment_data');
// #to show all the appointments request to receptionist excluding those which have been passed by the doctor
const appointment_history = async (req, res) => {
    try {

        const appt_request = await appointment_data.find({}, 'id doctor__name patient__name status payment_status date time time_of_registering_appointment receptionist_response receptionist_reason doctor_response').populate('patientd', '-password').populate('doctord', '-password').sort([['date', 1]]).exec();
        res.status(200).send(appt_request);
    }
    catch (err) {
        res.status(500).send({
            message: 'error'
        });
    }
}

module.exports = appointment_history;