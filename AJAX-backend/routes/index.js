const express = require("express");
const router = express.Router();
// const Diagnosis = require("../models/Diagnosis");
// const Appointment_req = require("../models/appointment_req");
const doctorRegistration = require("./Registration/doctorRegistration");
const patientRegistration = require("./Registration/patientRegistration");
const checkUsername = require("./Registration/checkUsername");
const login = require("./Login/login")


// Angular SPA ROUTE
router.get("/", (req, res) => res.redirect("/LandingPage"));


// Registration routes
router.post("/registration/doctor/", doctorRegistration);
router.post("/registration/patient/", patientRegistration);
router.post("/registration/check_username/", checkUsername);

// Login routes
router.post("/login/", login);

const patient_appointment = require("./Appointment/patient_appointment")
const appointments_history = require("./Appointment/appointments_history")
const doctor_appointment_requests = require("./Appointment/doctor_appointment_requests")
const updating_response_of_appointment = require("./Appointment/doctor_appointment_requests")
const show_appointment_request_details = require("./Appointment/show_appointment_request_details")
const doctor_live_appointments_list = require("./Appointment/doctor_live_appointments_list")
const doctor_live_appointment_details = require("./Appointment/doctor_live_appointment_details");
const doctor_dashboard = require("./Doctor/doctor_dashboard");
const doctor_list = require("./Doctor/doctor_list");
const patient_list_under_doctor = require("./Doctor/patient_list_under_doctor");
const doctor_list_by_department = require("./Doctor/doctor_list_by_department");
const medicalReportAdd = require("./medicalReportAdd");
const contact_info = require("./contactus");


// Appointment Routes
router.post("/appointment/patient/", patient_appointment);
router.get("/appointment/history/", appointments_history);
router.post("/appointment/doctor/requests/",doctor_appointment_requests);
router.post("/appointment/update_response/", updating_response_of_appointment);
router.post("/appointment/doctor/appointment_details/", show_appointment_request_details);
router.post("/appointment/doctor/live_appointments_list/", doctor_live_appointments_list);
router.post("/appointment/doctor/live_appointment_details/", doctor_live_appointment_details);
router.post('/medical_report/add/', medicalReportAdd)
//Doctor Routes
router.post("/doctor/dashboard/", doctor_dashboard);
router.get("/doctor/list/", doctor_list);
router.post("/doctor/patient_list/", patient_list_under_doctor);
router.post("/doctor/list_by_department/", doctor_list_by_department);

router.post("/contactus/", contact_info);   

module.exports = router;