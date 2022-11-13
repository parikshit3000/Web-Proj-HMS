const Doctor = require('../../models/Doctors');
const Patient = require('../../models/Patients');

const checkUsername = async (req, res) => {
    const body = req.body

    try {
        const doctorSearch = await Doctor.findOne({ username: body.username }).exec();
        const patientSearch = await Patient.findOne({ username: body.username }).exec();
        if (doctorSearch || patientSearch) {
            return res.send('This username is already taken')
        }
        else {
            res.send({
                message: 'unique'
            });
        }
    }
    catch (err) {
        res.status(500).send({
            message: 'error'
        });
    }
}
module.exports = checkUsername;