const connection = require("../config/connection");

class ORM {
    constructor(connection) {
        this.connection = connection;
    };

    viewAllEmployee() {

        const queryString = `SELECT employee.id, first_name, last_name, department.name, role.title, salary, manager_id
        FROM employee 
        INNER JOIN role on employee.role_id = role.id 
        INNER JOIN department on role.department_id = department.id;`
        return this.connection.query(queryString);
    };

    viewAllDepartments() {
        const queryString = `SELECT * FROM department;`
        return this.connection.query(queryString);
    };

    viewAllRoles() {
        const queryString = `SELECT title, salary, department.name
        FROM role
        INNER JOIN department ON role.department_id = department.id;`
        return this.connection.query(queryString);
    };

    viewManagers() {
        const queryString = `SELECT first_name, last_name, role.title, department.name, salary 
        FROM employee 
        INNER JOIN role on employee.role_id = role.id 
        INNER JOIN department on role.department_id = department.id  
        WHERE is_manager = 1;`

        return this.connection.query(queryString);
    };

    viewEmployeeByManager(managerId) {
        const queryString = "SELECT first_name, last_name FROM employee WHERE manager_id = ?"
        return this.connection.query(queryString, [managerId]);
    }
    

    addEmployee(first_name, last_name, role_id, manager_id) {
        const queryString = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUE (?, ?, ?, ?);`

        return this.connection.query(queryString, [first_name, last_name, role_id, manager_id]);
    };


    addDepartment(name) {
        const queryString = `INSERT INTO department (name) VALUE (?);`

        return this.connection.query(queryString, [name]);
    };

    addRole(title, salary, departmentId) {
        const queryString = `INSERT INTO role (title, salary, department_id) VALUE (?, ?, ?);`

        return this.connection.query(queryString, [title, salary, departmentId]);
    };

    updateEmployee(first_name, last_name, role_id, is_manager, manager_id, id) {
        const queryString = "UPDATE employee SET first_name = ?, last_name = ?, role_id = ?, is_manager = ?, manager_id = ? WHERE id = ?;"
        return this.connection.query(queryString, [first_name, last_name, role_id, manager_id, is_manager, id]);
    };

    deleteEmployee(id) {
        const queryString = "DELETE FROM employee WHERE id = ?;"
        return this.connection.query(queryString, [id]);
    };

    deleteDepartment(id) {
        const queryString = "DELETE FROM department WHERE department.id = ?;"
        return this.connection.query(queryString, [id]);
    };

    deleteRole(id) {
        const queryString = "DELETE FROM role WHERE id = ?;"
        return this.connection.query(queryString, [id]);
    };

    totalUtilizedBudget(id) {
        const queryString = `SELECT department.name, SUM(salary)
        FROM department
        inner JOIN role ON role.department_id = department.id
        WHERE department.id = ?`
        return this.connection.query(queryString, [id]);
    };

    viewEmployeeINQ() {
        const queryString = 'SELECT id as value, CONCAT(first_name, " ",last_name) as name FROM employee'
        return this.connection.query(queryString);
    };

    viewDepartmentINQ() {
        const queryString = "SELECT id as value, name FROM department"
        return this.connection.query(queryString);
    };

    viewRolesINQ() {
        const queryString = "SELECT id as value, title as name FROM role;"
        return this.connection.query(queryString);
    };

    viewManagersINQ() {
        const queryString = 'SELECT id as value, CONCAT(first_name, " ",last_name) as name FROM employee WHERE is_manager = 1;'
        return this.connection.query(queryString);
    };

    employeeFirstNameINQ(id) {
        const queryString = "SELECT first_name FROM employee WHERE id = ?"
        return this.connection.query(queryString, [id]);
    };

    employeeLastNameINQ(id) {
        const queryString = "SELECT last_name FROM employee WHERE id = ?"
        return this.connection.query(queryString, [id]);
    };
};

module.exports = new ORM(connection)