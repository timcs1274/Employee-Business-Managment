const mysql = require('mysql');
const inquirer = require('inquirer');
const consoleTable = require('console.table');
require('dotenv').config();


const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: process.env.SECRET_KEY,
    database: 'employee_db',
});

connection.connect(err => {
    if(err) throw err;
    connectionComplete()
});

connectionComplete = () => {
    console.log('~~~~~~~~~ Employee Business Manager ~~~~~~~~~')
    promptUser();
};

const promptUser = () => {
    inquirer.prompt ([
        {
        type: 'list',
        name: 'choiceSelector',
        message: 'What would you like to do?',
        choices: ['View all employees',
                  'Add employee',
                  'Update employee role',
                  'View all roles',
                  'Add role',
                  'View all departments',
                  'Add department',]
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
            viewDepartments();
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



//function to update employee
updateEmployee = () => {
    const employeeSeeds = `SELECT * FROM employee`;

    connection.promise().query(employeeSeeds, (err, data) => {
        if (err) throw err;

        const employees = data.map (({ id, first_name, last_name }) => ({name: first_name + ' ' + last_name, value: id }));

        inquierer.prompt([
            {
                type: 'list',
                name: 'manager',
                message: "Which employee do you want to update?",
                choices: employees  
            }
        ])
        .then(employeeChoice => {
            const employee = employeeChoice.name;
            const params = [];
            params.push(employee);

            const roleSeeds = `SELECT * FROM role`;

            connection.promise().query(employeeSeeds, (err, data) => {
                if (err) throw err;

                const roles = data.map(({ id, title }) => ({ name: title, value: id }));

                inquirer.prompt([
                    {
                        type: 'list',
                        name: 'role',
                        message: "What would you like to update the employee role to?",
                        choices: roles   
                    }
                ])
                .then(roleChoice => {
                    const role = roleChoice.role;
                    paramas.push(role);

                    let employee = params[0]
                    params[0] = role
                    params[1] = employee

                    const sql = `UPDATE employee SET role_id = ? WHERE id = ?`;

                    connection.promise().query(employeeSeeds, (err, data) => {
                        if (err) throw err;
                        console.log('Employee role has been updated.');

                        viewEmployees();
                    });
                });
            });
        });
    });
};





//function to view all roles
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




//function to add roles
addRoles = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'role',
            message: "Which role would you like to add?",
            validate: addRole => {
                if (addRole) {
                    return true;
                } else {
                    console.log('Please enter the role you would like to add');
                    return false;
                }
            } 
        }
    ])
    .then(answer => {
        const params = [answer.role];
        const roleSeeds = `SELECT name, id FROM department`;
    
        connection.promise().query(roleSeeds, (err, rows) => {
            if (err) throw err;
    
            const department = data.map(({ name, id }) => ({ name: name, value: id }));
    
            inquirer.prompt([
                {
                    type: 'list',
                    name: 'dept',
                    message: "What department is this role in?",
                    choices: dept
                }
            ])
            .then(departmentChoice => {
                const department = departmentChoice.department;
                params.push(dept);

                const sql =`INSERT INTO role (title, department_id)
                            VALUES (?, ?, ?)`;
                
                connection.query(sql, params, (err, result) => {
                    if (err) throw err;
                    console.log('Successfully added ' + answer.role);

                    viewRoles();
                });
            });
        });
    });
};




//function to add department
addDepartment = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'addDepartment',
            message: 'Which department would you like to add?',
            validate: addDepartment => {
                if (addDepartment) {
                    return true;
                } else {
                    console.log('Please enter the department you wish to add');
                    return false;
                }
            }
        }
    ])
        .then(answer => {
            const sql = `INSERT INTO department (name)
                        VALUES (?)`;
        connection.query(sql, answer.addDepartment, (err, result) => {
            if (err) throw err;
            console.log('Sucessfully added ' + answer.addDepartment);
            viewDepartments();
        });
    });
};
