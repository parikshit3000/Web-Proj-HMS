const Doctor = require('../../models/Doctors');
const Patient = require('../../models/Patients');
const appointment_data = require('../../models/appointment_data');

//to create new appointment by the patient

const patient_appointment = async (req, res) => {
    const body = req.body
    try {
        var appointment = new appointment_data({
            ...body,
        });
        await appointment.save();
        res.status(200).send("Appointment is registered. You will be notified soon.");
    }
    catch (err) {
        console.log(err);
        res.status(500).send("Error");
    }
}
module.exports = patient_appointment;