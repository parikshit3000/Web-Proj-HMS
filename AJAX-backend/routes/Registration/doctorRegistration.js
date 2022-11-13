const Doctor = require('../../models/Doctors');
const Patient = require('../../models/Patients');
// # to register the doctor account

const doctorRegistration = async (req, res) => {
    const body = req.body

    try {
        const doctorSearch = await Doctor.findOne({ username: body.username }).exec();
        const patientSearch = await Patient.findOne({ username: body.username }).exec();
        if (doctorSearch || patientSearch) {
            return res.send(
                'This username is already taken'
            );
        }
        var doctor = new Doctor({
            ...body,
        });
        await doctor.save();
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
module.exports = doctorRegistration;