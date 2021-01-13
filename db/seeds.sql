INSERT INTO department (name)
VALUES
    ('Sales'),
    ('Engineering'),
    ('Finance'),
    ('Legal');

INSERT INTO role (role, salary, department_id)
VALUES
    ('Sales Lead', 100000, 1),
    ('Salesperson', 80000, 1),
    ('Lead Engineer', 150000, 2),
    ('Software Engineer', 120000, 2),
    ('Accountant', 125000, 3),
    ('Legal Team Lead', 250000, 4),
    ('Lawyer', 190000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
    ('Bill', 'Bippert', 1, null),
    ('Harry', 'Potter', 3, 1),
    ('Qui Gon', 'Jinn', 2, null),
    ('Aragorn', 'Elessar', 4, 3),
    ('Bilbo', 'Baggins', 5, null),
    ('Grima', 'Wormtongue', 7, null),
    ('Samwise', 'Gamgee', 6, 6);