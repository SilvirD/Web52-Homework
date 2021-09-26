const express = require("express");
const router = express.Router();
const Controller = require("../Controller/CRUD");

router.get("/get", async (req, res) => {
  const result = await Controller.readFile();

  if (result) {
    res.send(result);
  } else {
    res.send({
      status: 400,
      message: "Not found",
    });
  }
});

router.get("/find/:name", async (req, res) => {
  const { name } = req.params;

  let result = await Controller.findStudentByName(name);

  result
    ? res.send(result)
    : res.send({ status: "404", message: `Can't found student info` });
});

router.post("/add", async (req, res) => {
  const newStudent = req.body;

  console.log(newStudent);

  const result = await Controller.addStudent(newStudent);

  if (result) {
    res.json({
      message: "Thêm thành công",
    });
  } else {
    return false;
  }
});

module.exports = router;
