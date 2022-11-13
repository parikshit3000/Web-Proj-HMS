const Doctor = require('../../models/Doctors');
const Patient = require('../../models/Patients');
const appointment_data = require('../../models/appointment_data');
// #to show the list of doctors filtered

const doctor_list_by_department = async (req, res) => {
    const body = req.body
    const department = body.department
    console.log(body);
    try {
        const doctorSearch = await Doctor.find({ department: department},'id name username').exec();
        doctorSearch.id = doctorSearch._id
        res.send(doctorSearch);
    }
    catch (err) {
        res.status(500).send({
            message: 'error'
        });
    }
}

module.exports = doctor_list_by_department;