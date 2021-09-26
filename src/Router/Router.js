const express = require("express");
const router = express.Router();

const manageStudent = require("../API/Student");

router.use("/student", manageStudent);

module.exports = router;
