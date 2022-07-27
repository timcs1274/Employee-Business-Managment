const mysql = require('mysql');
const inquirer = require('inquirer');
const consoleTable = require('console.table');

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
    
}