const Doctor = require('../models/Doctors');
const Patient = require('../models/Patients');
const appointment_data = require('../models/appointment_data');

const patient_appointment = async (req, res) => {
    const body = req.body
    appointment_id = body.id;
    console.log(body)
    try {
        const appointment_update = await appointment_data.findOneAndUpdate({ _id: appointment_id }, {
            ...body,
        }).exec();
        res.status(200).send("medical report generated");
    }
    catch (err) {
        res.status(500).send("Error");
    }
}

module.exports = patient_appointment;