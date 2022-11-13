const Doctor = require('../../models/Doctors');
const Patient = require('../../models/Patients');
const appointment_data = require('../../models/appointment_data');
// #This fuction is to send list of all registered patients to receptionist

const patientList = async (req, res) => {
    try {
        const patientSearch = await Patient.find().exec();
        res.send(patientSearch);
    }
    catch (err) {
        res.status(500).send({
            message: 'error'
        });
    }
}

module.exports = patientList;