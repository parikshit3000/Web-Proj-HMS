const Doctor = require('../../models/Doctors');
const Patient = require('../../models/Patients');

const login = async (req, res) => {
    const body = req.body
    var msg;
    try {
        const doctorSearch = await Doctor.findOne({ username: body.username , password: body.password}).exec();
        const patientSearch = await Patient.findOne({ username: body.username , password: body.password}).exec();
        if (doctorSearch) {
            msg = "doctor"
        }
        else if(patientSearch){
			msg="patient"
        }
        else {
            msg = "invalid details"
        }
        res.send(msg);
    }
    catch (err) {
        res.status(500).send({
            message: 'error'
        });
    }
}
module.exports = login;