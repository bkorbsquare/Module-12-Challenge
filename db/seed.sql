INSERT INTO department (name)
VALUES
("Management"),
("Employees"),
("Contractors");

INSERT INTO role (title, salary, department_id)
VALUES
("Owner", 75000, 1),
("Manager", 65000, 1),
("Employee", 25000, 2),
("Contractor", 35000, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id, is_manager)
VALUES
("Numero", "Uno", 1, null, 0),
("Big", "Bossman", 2, 1, 1),
("Your", "Coworker", 3, null, 0),
("General", "Contractor", 4, null, 0);