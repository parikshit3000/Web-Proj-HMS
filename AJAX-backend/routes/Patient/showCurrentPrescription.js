const Doctor = require('../../models/Doctors');
const Patient = require('../../models/Patients');
const appointment_data = require('../../models/appointment_data');
// #to show the prescription given by the doctor of the recent appointment		

const showCurrentPrescription = async (req, res) => {
    const body = req.body
    const id = body.id
    try {
        const patient_data = await appointment_data.find({ patient_id: id,}, 'id patient__name doctor__name doctor__id prescription date time after_disease').populate('patientd', '-password').populate('doctord', '-password').sort([['date', 1]]).exec();
        res.send(patient_data);
    }
    catch (err) {
        res.status(500).send({
            message: 'error'
        });
    }
}

module.exports = showCurrentPrescription;