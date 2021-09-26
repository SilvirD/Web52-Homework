const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

const student = {
  ID: 1,
  name: "duc",
  age: 21,
  gender: "male",
  department: "History",
};

const student2 = {
  ID: 2,
  name: "trung",
  age: 21,
  gender: "male",
  department: "History",
};

const writeFile = async (content) => {
  await fs.promises
    .writeFile("info.json", JSON.stringify(content))
    .catch((error) => {
      if (error) throw error;
    });
};

const readFile = async () => {
  try {
    await createFile();
    const data = await fs.promises.readFile("./info.json", "utf8");
    return data;
  } catch (err) {
    throw err;
  }
};

const createFile = async () => {
  const exists = await fs.existsSync("./info.json");

  if (!exists) {
    writeFile([student]);
    console.log("File created");
  } else {
    console.log("File existed");
  }
};

const checkValid = async (studentId) => {
  const read = await fs.promises.readFile("./info.json", "utf8");

  let studentList = JSON.parse(read);

  for (let i = 0; i < studentList.length; i++) {
    if (studentList[i].ID === studentId) {
      return true;
    }
  }
};

const findStudentByName = async (name) => {
  try {
    const read = await fs.promises.readFile("./info.json", "utf8");

    let studentList = JSON.parse(read);

    if (studentList) {
      let result = studentList.filter((student) => student.name === name);

      return result.length > 0 ? result : false;
    }
  } catch (err) {
    throw err;
  }
};

const addStudent = async (data) => {
  try {
    const read = await fs.promises.readFile("./info.json", "utf8");

    let studentList = JSON.parse(read);

    let idList = studentList.map((e) => e.ID);

    data.ID = uuidv4();
    studentList.push(data);
    writeFile(studentList);
    return true;
  } catch (err) {
    throw err;
  }
};

const deleteStudent = async (studentId) => {
  const read = await fs.promises.readFile("./info.json", "utf8");

  if (await checkValid(studentId)) {
    let studentList = JSON.parse(read);

    for (let i = 0; i < studentList.length; i++) {
      if (studentList[i].ID === studentId) {
        studentList.splice(studentList.indexOf(studentList[i]), 1);
      }
    }

    writeFile(studentList);
  } else {
    console.log("Invalid studentId! Try another one");
  }
};

const updateStudent = async (studentId, updateData) => {
  const read = await fs.promises.readFile("./info.json", "utf8");

  if (await checkValid(studentId)) {
    let studentList = JSON.parse(read);

    for (let i = 0; i < studentList.length; i++) {
      if (studentList[i].ID === studentId) {
        studentList[i] = updateData;
      }
    }

    writeFile(studentList);
  } else {
    console.log("Invalid studentId! Try another one");
  }
};

module.exports = {
  readFile,
  findStudentByName,
  addStudent,
  deleteStudent,
  updateStudent,
};

//STRINGIFY: CONVERT OBJECT ----> JSON
//PARSE: CONVERT JSON ----> OBJECT
