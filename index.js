const inquirer = require("inquirer");
const Database = require("./db.js");
const consoleTable = require("console.table");
const connection = require("./db.js");

function mainPrompt() {  
    inquirer.prompt([{
        type: 'list',
        name: 'action',
        message: 'What would you like to do?',
        choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update employee role', 'Close application']
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
            Database.query("SELECT * FROM employee JOIN role ON employee.role_id=role.id", function (err, result, fields) {
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
            Database.query(names, function (err, result) {
                if (err) throw err;
                inquirer.prompt([{
                    type: 'input',
                    name: 'employeeId',
                    message: 'Enter the ID of the employee you would like to update',
                },
                {
                    type: 'input',
                    name: 'newRole',
                    message: 'Enter new role ID'
                }])
                .then(answers => {
                    Database.query(`UPDATE employee SET role_id = ${answers.newRole} WHERE id = ${answers.employeeId}`, function (err, result) {
                        if (err) console.log(err);
                        mainPrompt();
                    })
                })  
            })
        } else if (answers.action === 'Close application') {
            connection.end(function(err) {
                if (err) {
                    return console.log('error:' + err.message);
                }
                console.log('Goodbye!');
            });
        }
    });
}

mainPrompt();