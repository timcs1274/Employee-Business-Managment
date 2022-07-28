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

viewEmployees = () => {};

employeeDepartment = () => {};

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
