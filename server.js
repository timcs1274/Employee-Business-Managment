const mysql = require('mysql2');
const inquirer = require('inquirer');
const consoleTable = require('console.table');
require('dotenv').config()


const connection = msql.createConnection({
    host: 'localhost',
    user: 'root',
    password: process.env.SECRET_KEY,
    database: 'db',
});

connection.connect(err => {
    if(err) throw err;
    console.log(err)
    connectionComplete();
});

connectionComplete = () => {
    console.log('~~~~~~~ Employee Business Manager ~~~~~~~')
    promptUser();
}

const promptUser = () => {
    inquirer.prompt ([
        {
        type: 'list',
        name: 'choiceSelector',
        message: 'What would you like to do?',
        choices: ['View all employees',
                  'View all employees by Department',
                  'View all employees by manager',
                  'Add employee',
                  'Remove employee',
                  'Update employee role',
                  'Update employee manager',
                  'View all roles',
                  'Add role',
                  'View all departments',
                  'Add department',
                  'Remove department',
                  'None',]
        }
    ])
    .then((answers) => {
        const { choiceSlector } = answers;

        if (choiceSlector === 'View all employees') {
            viewEmployees();
        }

        if (choiceSlector === 'View all employees by Department') {
            employeeDepartment();
        }

        if (choiceSlector === 'View all employees by manager') {
            employeeManager();
        }

        if (choiceSlector === 'Add employee') {
            addEmployee();
        }

        if (choiceSlector === 'Remove employee') {
            removeEmployee();
        }

        if (choiceSlector === 'Update employee role') {
            updateEmployee();
        }

        if (choiceSlector === 'Update employee manager') {
            updateManager();
        }

        if (choiceSlector === 'View all roles') {
            viewRoles();
        }
        
        if (choiceSlector === 'Add role') {
            addRoles();
        }

        if (choiceSlector === 'Remove role') {
            removeRoles();
        }

        if (choiceSlector === 'View all departments') {
            viewDepartment();
        }

        if (choiceSlector === 'Add department') {
            addDepartment();
        }

        if (choiceSlector === 'Remove department') {
            removeDepartment();
        }

        
    });
};
//function to view all employees
viewEmployees = () => {
    console.log('Here are the employees: ');
    const sql = `SELECT employee.id,
                        employee.first_name,
                        employee.last_name,
                        role.title,
                        department.name AS department,
                        role.salary,
                        CONCAT (manager.first_name, '', manager.last_name) AS manager
                FROM employee
                        LEFT JOIN role ON employee.role_id = role.id
                        LEFT JOIN department ON role.department_id = department.id
                        LEFT JOIN employee manager On employee.manager_id = manager.id`;

    connection.promise().query(sql, (err, rows) => {
        if (err) throw err;
        console.table(rows);
        promptUser();
    });
};



employeeDepartment = () => {
    console.log('Here is the employee department: ');
    const sql = `SELECT employee.first_name, 
                        employee.last_name, 
                        department.name AS department
                FROM employee 
                        LEFT JOIN role ON employee.role_id = role.id 
                        LEFT JOIN department ON role.department_id = department.id`;

    connection.promise().query(sql, (err, rows) => {
        if (err) throw err; 
        console.table(rows); 
        promptUser();
    });          
};


employeeManager = () => {};

addEmployee = () => {};

removeEmployee = () => {};

updateEmployee = () => {};

updateManager = () => {};

viewRoles = () => {};

addRoles = () => {};

removeRoles =() => {};

viewDepartment = () => {};

addDepartment = () => {};

removeDepartment = () => {};
