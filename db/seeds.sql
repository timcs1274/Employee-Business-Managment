INSERT INTO department (name)
VALUES
('IT'),
('Accounting'),
('Sales'),
('Legal');

INSERT INTO role (title, salary, department_id)
VALUES
('Junior Software Engineer', 70000, 1),
('Senior Software Engineer', 100000, 1),
('Accountant', 80000, 2),
('Accountant Intern', 45000, 2),
('Sales Development Rep', 60000, 3),
('Account Development Rep', 80000, 3),
('Corporate Paralegal', 60000, 4),
('Corporate Lawyer', 120000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
('Greg', 'Gregerson', 1, NULL),
('Mark', 'Markerson', 2, 1),
('Tim', 'Timerson', 3, NULL),
('Daniel', 'Danielson', 4, 2),
('Jerry', 'Jerrison', 5, NULL),
('Bob', 'Boberson', 6, 3),
('Christy', 'Christison', 7, NULL),
('Megan', 'Meganson', 8, 4);
