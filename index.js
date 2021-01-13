const inquirer = require("inquirer");
const Database = require("./db.js");
const consoleTable = require("console.table");

   
function mainPrompt() {  
    inquirer.prompt([{
        type: 'list',
        name: 'action',
        message: 'What would you like to do?',
        choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update employee role']
    }])
    .then(answers => {
        if (answers.action === 'View all departments') {
            Database.query("SELECT * FROM department", function (err, result, fields) {
                if (err) throw err;
                console.table(result);
                mainPrompt();
            })
        } else if (answers.action === 'View all roles') {
            Database.query("SELECT * FROM role", function (err, result, fields) {
                if (err) throw err;
                console.table(result);
                mainPrompt();
            })
        } else if (answers.action === 'View all employees') {
            Database.query("SELECT * FROM employee", function (err, result, fields) {
                if (err) throw err;
                console.table(result);
                mainPrompt();
            })
        } else if (answers.action === 'Add a department') {
            inquirer.prompt([{
                type: 'input',
                name: 'department',
                message: 'Enter a department title'
            }]).then(answers => {
                Database.query(`INSERT INTO department (name) VALUES ('${answers.department}')`, function (err, result) {
                    if (err) throw err;
                    console.log("Added a department");
                })
                mainPrompt();
            })
        } else if (answers.action === 'Add a role') {
            inquirer.prompt([{
                type: 'input',
                name: 'title',
                message: 'Enter a new role title'
            },
            {
                type: 'input',
                name: 'salary',
                message: 'Enter a salary for the new role'
            },
            {
                type: 'input',
                name: 'department',
                message: 'Enter the department ID of the new role'
            }]).then(answers => {
                Database.query(`INSERT INTO role (role, salary, department_id) VALUES ('${answers.title}', '${answers.salary}', '${answers.department}')`, function (err, result) {
                    if (err) throw err;
                    console.log("Added a role");
                })
                mainPrompt();
            })
        } else if (answers.action === 'Add an employee') {
            inquirer.prompt([{
                type: 'input',
                name: 'firstName',
                message: "Enter your new employee's first name"
            },
            {
                type: 'input',
                name: 'lastName',
                message: "Enter your new employee's last name"
            },
            {
                type: 'input',
                name: 'roleId',
                message: "Enter your new employee's role ID"
            },
            {
                type: 'input',
                name: 'managerId',
                message: "Enter your new employee's manager ID"
            }]).then(answers => {
                Database.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('${answers.firstName}', '${answers.lastName}', '${answers.roleId}', '${answers.managerId}')`, function (err, manager) {
                    if (err) throw err;
                    console.log("Added an employee");
                })
                mainPrompt();
            })
        } else if (answers.action === 'Update employee role') {
            const names = "SELECT first_name, last_name FROM employee"
            const nameArray = []
            Database.query(names, function (err, result) {
                if (err) throw err;
                for (let i = 0; i < result.length; i++) {
                    const element = result[i];
                    const nameString = element.first_name + " " + element.last_name
                    nameArray.push(nameString)
                    console.log(nameArray)
                }
            })
            console.log(nameArray)
            inquirer.prompt([{
                type: 'list',
                name: 'employees',
                message: 'Select an employee to update',
                choices: nameArray
            },
            {
                type: 'input',
                name: 'newRole',
                message: 'Enter new role ID'
            }])
            .then(answers => {
                Database.query(`UPDATE employee SET role_id = ${answers.newRole}`, function (err, result) {
                    if (err) throw err;
                    // console.log("Updated employee role");
                })
            })
            
            mainPrompt();
        }
    });
}

mainPrompt();