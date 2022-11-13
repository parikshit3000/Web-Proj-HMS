const Doctor = require('../../models/Doctors');
const Patient = require('../../models/Patients');
const appointment_data = require('../../models/appointment_data');
// #to show the basic details of the doctor (registration details)

const doctor_dashboard = async (req, res) => {
    const body = req.body
    const username = body.username
    console.log(body);
    try {
        var doctorSearch = await Doctor.find({ username: username}).exec();
        res.send(doctorSearch);
    }
    catch (err) {
        console.log(err)
        res.status(500).send({
            message: 'error'
        });
    }
}

module.exports = doctor_dashboard;