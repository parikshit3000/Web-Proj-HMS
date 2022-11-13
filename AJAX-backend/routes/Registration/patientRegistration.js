const Patient = require('../../models/Patients');
const Doctor = require('../../models/Doctors');
// # to register the patient

const patientRegistration = async (req, res) => {
    const body = req.body
    try {
        const doctorSearch = await Doctor.findOne({ username: body.username }).exec();
        const patientSearch = await Patient.findOne({ username: body.username }).exec();
        if (patientSearch) {
            return res.send('This username is already taken'
            )
        }
        var patient = new Patient({
            ...body,
        });
        await patient.save();
        res.status(200).send({
            message: 'success'
        })
    }
    catch (err) {
        res.status(500).send({
            message: 'error'
        })
    }
}
module.exports = patientRegistration;