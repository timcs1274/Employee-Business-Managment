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

        if (choiceSlector === 'Add employee') {
            addEmployee();
        }

        if (choiceSlector === 'Update employee role') {
            updateEmployee();
        }

        if (choiceSlector === 'View all roles') {
            viewRoles();
        }
        
        if (choiceSlector === 'Add role') {
            addRoles();
        }

        if (choiceSlector === 'Add department') {
            addDepartment();
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



// employeeDepartment = () => {
//     console.log('Here is the employee department: ');
//     const sql = `SELECT employee.first_name, 
//                         employee.last_name, 
//                         department.name AS department
//                 FROM employee 
//                         LEFT JOIN role ON employee.role_id = role.id 
//                         LEFT JOIN department ON role.department_id = department.id`;

//     connection.promise().query(sql, (err, rows) => {
//         if (err) throw err; 
//         console.table(rows); 
//         promptUser();
//     });          
// };




addEmployee = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'firstName',
            message: 'What is first name of the employee?',
            validate: addFirst => {
                if (addFirst) {
                    return true;
                } else {
                    console.log('Please enter the employee first name.');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'lastName',
            message: 'What is last name of the employee?',
            validate: addLast => {
                if (addLast) {
                    return true;
                } else {
                    console.log('Please enter the employee last name.');
                    return false;
                }
            }
        }
    ])
};

updateEmployee = () => {};

viewRoles = () => {};

addRoles = () => {};

addDepartment = () => {};
