const Doctor = require('../../models/Doctors');
const Patient = require('../../models/Patients');
const appointment_data = require('../../models/appointment_data');
// #to show the basic details of patient which were recorded at the time of registration

const basicDetails = async (req, res) => {
    const body = req.body
    const username = body.username
    try {
        const patientSearch = await Patient.find({ username: body.username}).exec();
        res.send(patientSearch);
    }
    catch (err) {
        res.status(500).send({
            message: 'error'
        });
    }
}

module.exports = basicDetails;