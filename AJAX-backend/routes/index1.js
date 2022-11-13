const express = require("express");
const basicDetails = require("./Patient/basicDetails");
const showMedicalHistory = require("./Patient/showMedicalHistory");
const patientList = require("./Patient/patientList");
const showCurrentPrescription = require("./Patient/showCurrentPrescription");
const showPaymentHistory = require("./Patient/showPaymentHistory");
const appointmentRequest = require("./Patient/appointmentRequest")
const router = express.Router();


//Patient Routes
router.post("/patient/basic_details/", basicDetails);
router.post("/patient/medical_history/", showMedicalHistory);
router.post("/patient/prescription/", showCurrentPrescription);
router.post("/patient/appointment_request/", appointmentRequest);
router.post("/patient/payment_history/", showPaymentHistory);
router.get("/patient/list/", patientList);

module.exports = router;