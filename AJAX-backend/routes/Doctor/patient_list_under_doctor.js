const Doctor = require('../../models/Doctors');
const Patient = require('../../models/Patients');
const appointment_data = require('../../models/appointment_data');

const patient_list_under_doctor = async (req, res) => {

    try {
        const body = req.body
        const doctor_id = body.id
        console.log(body);
        const patientSearch = await appointment_data.find({doctor_id: doctor_id}).populate('patientd', '-password').populate('doctord', '-password').exec();
        res.send(patientSearch);
    }
    catch (err) {
        res.status(500).send({
            message: 'error'
        });
    }
}

module.exports = patient_list_under_doctor;