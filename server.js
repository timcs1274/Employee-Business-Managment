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

//function to add employees
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
        .then(answer => {
            const params = [answer.firstName, answer.lastName]
            const roleSeeds = `SELECT role.id, role.title FROM role`;
            
            connection.promise().query(roleSeeds, (err, data) => {
                if (err) throw err;
                const roles = data.map(({ id, title }) => ({name: title, value:id}));
                inquirer.prompt([
                    {
                        type: 'list',
                        name: 'role',
                        message: "What is the role of the employee?",
                        choices: roles
                    }
                ])
                .then(roleChoice => {
                    const role = roleChoice.role;
                    params.push(role);

                    const managerSql = `SELECT * FROM employee`;
                    connection.promise().query(managerSql, (err, data) => {
                        if (err) throw err;
                        const managers = data.map(({ id, first_name, last_name }) => ({name: first_name + ' ' + last_name, value: id }));
                        
                        inquirer.prompt([
                            {
                                type: 'list',
                                name: 'manager',
                                message: "Who is the manager of the employee?",
                                choices: managers 
                            }
                        ])
                        .then(managerChoice => {
                            const manager = managerChoice.manager;
                            params.push(manager);

                            const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id)
                            VALUES (?, ?, ?, ?)`;

                            connection.query(sql, params, (err, result) => {
                                if (err) throw err;
                                console.log('Employee has been added.')

                                viewEmployees();
                        });
                    });
                });
            });
        });
    });
};

updateEmployee = () => {}; //------------------------------

viewRoles = () => {
    console.log('Here are the roles: ');

    const sql = `SELECT role.id, role.title, department.name AS department
                 FROM role
                 INNER JOIN department ON role.department_id = department.id`;
    connection.promise().query(sql, (err, rows) => {
        if (err) throw err;
        console.table(rows);
        promptUser();
    });
};





addRoles = () => {};

addDepartment = () => {};
