const Doctor = require('../../models/Doctors');
const Patient = require('../../models/Patients');
const appointment_data = require('../../models/appointment_data');

const doctor_list = async (req, res) => {

    try {
        const doctorSearch = await Doctor.find().exec();
        res.send(doctorSearch);
    }
    catch (err) {
        res.status(500).send({
            message: 'error'
        });
    }
}

module.exports = doctor_list;