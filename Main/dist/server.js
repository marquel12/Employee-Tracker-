import inquirer from 'inquirer'; // Import the inquirer library for prompting the user
// import { QueryResult } from 'pg';  // Import the QueryResult type from 'pg' for type-checking the result of a query
import { pool, connectToDb } from './connection.js'; // Import the pool and connectToDb functions from the connection module
await connectToDb();
const questions = () => {
    inquirer
        .prompt([
        {
            type: "list",
            name: "menu",
            message: "What would you like to do?",
            choices: [
                "View all departments",
                "View all roles",
                "View all employees",
                "Add a department",
                "Add a role",
                "Add an employee",
                "Update an employee role",
                "Exit",
            ],
        },
    ])
        .then((answers) => {
        if (answers.menu === "View all departments") {
            viewAllDepartments();
        }
        else if (answers.menu === "View all roles") {
            viewAllRoles();
        }
        else if (answers.menu === "View all employees") {
            viewAllEmployees();
        }
        else if (answers.menu === "Add a department") {
            addDepartment();
        }
        else if (answers.menu === 'Add a role') {
            addRole();
        }
        else if (answers.menu === 'Add an employee') {
            addEmployee();
        }
        else if (answers.menu === 'Update an employee role') {
            updateEmployeeRole();
        }
        else {
            console.log("Goodbye!");
            return;
        }
    });
    const viewAllDepartments = () => {
        const sql = "SELECT department.id AS id, department.name AS name  FROM department";
        pool.query(sql, (err, result) => {
            if (err) {
                console.log("Did not select departments");
                return;
            }
            console.table(result.rows);
            questions();
        });
    };
    const viewAllRoles = () => {
        const sql = "SELECT role.id AS id,role.title AS title,role.salary AS salary, department.name AS departments FROM role INNER JOIN department ON role.department_id=department.id"; // Select all columns from the role table 
        pool.query(sql, (err, result) => {
            if (err) {
                console.log("Did not select roles");
                return;
            }
            console.table(result.rows);
            questions();
        });
    };
    const viewAllEmployees = () => {
        const sql = `SELECT e.first_name,e.last_name, role.title, role.salary,department.name AS department, CONCAT(m.first_name, ' ', m.last_name) AS manager  FROM employee e INNER JOIN role ON e.role_id=role.id INNER JOIN department ON role.department_id=department.id LEFT JOIN employee m ON e.manager_id=m.id`; // Select all columns from the employee table
        pool.query(sql, (err, result) => {
            if (err) {
                console.log("Did not select employees");
                questions();
            }
            console.table(result.rows);
            questions();
        });
    };
    const addDepartment = () => {
        inquirer
            .prompt({
            type: "input",
            name: "newDepartment",
            message: "Enter the department name:",
        })
            .then((answers) => {
            const sql = "INSERT INTO department (name) VALUES ($1)";
            const params = [answers.newDepartment];
            pool.query(sql, params, (err, _result) => {
                if (err) {
                    console.log("Did not add department");
                    return questions();
                }
                console.log("Department added successfully");
                questions();
            });
        });
    };
    const addRole = () => {
        let departmentList = [];
        pool.query('SELECT * FROM department', (err, result) => {
            if (err) {
                console.log('Did not select departments');
                return;
            }
            departmentList = result.rows.map(row => ({
                name: row.name,
                value: row.id
            }));
            inquirer.prompt([{
                    type: 'input',
                    name: 'title',
                    message: 'Enter the name of the role',
                },
                {
                    type: 'input',
                    name: 'salary',
                    message: 'Enter the salary of the role',
                },
                {
                    type: 'list',
                    name: 'department',
                    message: 'Which department does this role belong to?',
                    choices: departmentList,
                },
            ])
                .then((answers) => {
                const sql = 'INSERT INTO role (title, salary,department_id) VALUES ($1, $2,$3)'; // Insert the role into the role table with the title and salary this will be the values of the role
                const params = [answers.title, answers.salary, answers.department];
                pool.query(sql, params, (err, _result) => {
                    if (err) {
                        console.log('Did not add role');
                        return questions();
                    }
                    console.log('Role added successfully');
                    questions();
                });
            });
        });
    };
    const addEmployee = () => {
        let managerList = [];
        let roleList = [];
        pool.query('SELECT * FROM role', (err, result) => {
            if (err) {
                console.log('Did not select departments');
                questions();
            }
            roleList = result.rows.map(row => ({
                name: row.title,
                value: row.id
            }));
            pool.query('SELECT first_name, last_name, id FROM employee', (err, result) => {
                if (err) {
                    console.log('Did not select managers');
                    questions();
                }
                managerList = result.rows.map(row => ({
                    name: row.first_name + ' ' + row.last_name,
                    value: row.id
                }));
                inquirer.prompt([
                    {
                        type: 'input',
                        name: 'first_name',
                        message: 'Enter the first name of the employee',
                    },
                    {
                        type: 'input',
                        name: 'last_name',
                        message: 'Enter the last name of the employee',
                    }, {
                        type: 'list',
                        name: 'role',
                        message: 'Select the role',
                        choices: roleList,
                    }, {
                        type: 'list',
                        name: 'manager',
                        message: 'Select the manager of the employee',
                        choices: managerList,
                    }
                ])
                    .then((answers) => {
                    const sql = 'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)';
                    const params = [answers.first_name, answers.last_name, answers.role, answers.manager];
                    pool.query(sql, params, (err, _result) => {
                        if (err) {
                            console.log('Did not add employee');
                            return questions();
                        }
                        console.log('Employee added successfully');
                        questions();
                    });
                });
            });
        });
    };
};
const updateEmployeeRole = () => {
    let employeeList = [];
    let roleList = [];
    pool.query('SELECT * FROM role', (err, result) => {
        if (err) {
            console.log('Did not select departments');
            questions();
        }
        roleList = result.rows.map(row => ({
            name: row.title,
            value: row.id
        }));
        pool.query('SELECT first_name, last_name, id FROM employee', (err, result) => {
            if (err) {
                console.log('Did not select employees');
                questions();
            }
            employeeList = result.rows.map(row => ({
                name: row.first_name + ' ' + row.last_name,
                value: row.id
            }));
            inquirer.prompt([{
                    type: 'list',
                    name: 'employee',
                    message: 'Select the employee whose role you want to update',
                    choices: employeeList,
                },
                {
                    type: 'list',
                    name: 'role',
                    message: 'Select the new role',
                    choices: roleList,
                },
            ])
                .then((answers) => {
                const sql = 'UPDATE employee SET role_id = $1 WHERE id = $2'; // Update the employee role in the employee table where the id is the id of the employee 
                const params = [answers.role, answers.employee];
                pool.query(sql, params, (err, _result) => {
                    if (err) {
                        console.log(answers);
                        console.log('Did not update employee role');
                        return questions();
                    }
                    console.log('Employee role updated successfully');
                    questions();
                });
            });
        });
    });
};
questions();
