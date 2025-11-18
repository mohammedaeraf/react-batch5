import { useState } from "react";

/**
 * Employee type describes the shape of an employee object.
 * id may come as string or number from some APIs, so allow both.
 */
type Employee = {
  id: number | string;
  employee_name: string;
  employee_salary: string;
  employee_age: string;
};

/**
 * Static employees shown before any fetch — keeps UI populated for demo.
 */
const employeesStatic: Employee[] = [
  {
    id: 1,
    employee_name: "Alice Johnson",
    employee_salary: "75000",
    employee_age: "29",
  },
  {
    id: 2,
    employee_name: "Bob Smith",
    employee_salary: "68000",
    employee_age: "34",
  },
  {
    id: 3,
    employee_name: "Clara Lee",
    employee_salary: "82000",
    employee_age: "27",
  },
];

function EmployeeList() {
  // employees: state that will hold employees fetched from the API.
  const [employees, setEmployees] = useState<Employee[]>([]);

  /**
   * fetchEmployees
   * - calls a demo employee API to get employee list
   * - handles different response shapes: { data: [...] } or direct array
   * - updates state so UI re-renders with fetched employees
   */

  const fetchEmployees = async () => {
    let response = await fetch(
      "https://dummy.restapiexample.com/api/v1/employees"
    );
    let data = await response.json();
    setEmployees(data.data); // JavaScript Object Notation -> converts JSON string to JS objects
  };

  return (
    <div className="container mb-4">
      <h2 className="text-danger my-4">Employee List</h2>

      {/* Button triggers the API fetch when clicked */}
      <button className="btn btn-success" onClick={fetchEmployees}>
        Fetch Employees
      </button>

      {/* Render fetched employees if available, otherwise the static demo list */}
      <ul className="list-group mt-3">
        {employees.map((emp) => (
          <li key={emp.id} className="list-group-item">
            <h5 className="text-primary mb-1">{emp.employee_name}</h5>
            <p className="mb-0">Age: {emp.employee_age}</p>
            <p className="mb-0">Salary: INR {emp.employee_salary}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default EmployeeList;
