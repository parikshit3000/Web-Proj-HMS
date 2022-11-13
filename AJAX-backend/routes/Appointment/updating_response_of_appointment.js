const Doctor = require('../../models/Doctors');
const Patient = require('../../models/Patients');
const appointment_data = require('../../models/appointment_data');
// #to update the response given by the receptionist and the doctor

const updating_response_of_appointment = async (req, res) => {
    const body = req.body
    const appointment_id = body.id

    try {
        const appointment_update = await appointment_data.findOneAndUpdate({ _id: appointment_id }, {
            ...body,
        }).exec();
        console.log(appointment_update);
        res.send("Your response is recieved");
    }
    catch (err) {
        console.log(err)
        res.status(500).send(
            'error'
        );
    }
}

module.exports = updating_response_of_appointment;