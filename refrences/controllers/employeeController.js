const data = {
  employees: require("../model/dummyData.json"),
  setEmployees: (data) => {
    this.employees = data;
  },
};

const getAllEmployees = (req, res) => {
  res.json(data.employees);
};

const createEmployee = (req, res) => {
  const newEmployee = {
    id: data.employees[data.employees.length - 1].id + 1 || 1,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    gender: req.body.gender,
  };

  if (!newEmployee.first_name || !newEmployee.last_name) {
    return res.status(400).json({
      message: "First name $ Last name no really dey",
    });
  }

  data.setEmployees([...data.employees, newEmployee]);
  console.log(newEmployee);
  res.status(201).json(data.employees);
};

const updateEmployee = (req, res) => {
  const employee = data.employees.find(
    (searchedEmployee) => searchedEmployee.id === parseInt(req.body.id)
  );

  if (!employee) {
    return res.status(400).json({ message: `Employee no dey database` });
  }

  if (req.body.first_name) employee.first_name = req.body.first_name;
  if (req.body.last_name) employee.last_name = req.body.lastname;
  if (req.body.email) employee.email = req.body.email;
  if (req.body.gender) employee.gender = req.body.gender;

  const filteredArray = data.employees.filter(
    (emp) => emp.id !== parseInt(req.body.id)
  );
  const unsortesArray = [...filteredArray, employee];
  data.setEmployees(
    unsortesArray.sort((a, b) => (a.id > b.id ? 1 : a.id < b.id ? -1 : 0))
  );
  res.json(data.employees);
};

const deleteEmployee = (req, res) => {
  const employee = data.employees.find(
    (searchedEmployee) => searchedEmployee.id === parseInt(req.body.id)
  );

  if (!employee) {
    res.status(400).json({ message: "Employee no dey database ooooo" });
  }

  const deleteSelectedEmployee = data.employees.filter(
    (emp) => emp.id !== parseInt(req.body.id)
  );
  data.setEmployees([...deleteSelectedEmployee]);
  res.json(data.employees);
};

const getEmployee = (req, res) => {
  const selectedEmployee = data.employees.find(
    (searchedEmployee) => searchedEmployee.id === parseInt(req.body.id)
  );

  if (!selectedEmployee) {
    res.status(400).json({ message: "The guy no dey database" });
  }

  res.json(selectedEmployee);
};

module.exports = {
  getAllEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
  getEmployee,
};
