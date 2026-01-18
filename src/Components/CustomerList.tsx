import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

/**
 * Course: describes the shape of each course item we expect from the API.
 * Keeping an interface helps TypeScript catch incorrect property usage.
 */
type Customer = {
  _id: string;
  name: string;
  email: string;
  phone: string;
  creditLimit: number;
};

const CustomerList = () => {
  // API base URL for customers (replace with your own endpoint if needed)
  const API_URL: string = "http://localhost:3000/customers";

  // `customers` state: holds the list of customers fetched from the API.
  const [customers, setCustomers] = useState<Customer[]>([]);

  /**
   * fetchCustomers:
   * - Calls the API to get all customers
   * - Parses the JSON response and stores it in state with `setCustomers`
   * - Called initially in useEffect and also after delete to refresh the list
   */
  const fetchCustomers = async () => {
    const response = await fetch(API_URL);
    const responseData = await response.json();
    setCustomers(responseData.data);
  };

  // Load customers once when the component mounts.
  useEffect(() => {
    fetchCustomers();
  }, []);

  return (
    <div id="container">
      {/* Page title */}
      <h1 className="text-danger">Customer List</h1>

      {/* Link to Add Customer page */}
      <Link to={`/add-customer`} className="btn btn-primary my-3">
        <i className="bi-plus-circle me-2"></i>
        Add Customer
      </Link>

      {/* Customers table */}
      <table className="table table-striped table-hover">
        <thead>
          <tr className="table-dark">
            {/* <th scope="col">Id</th> */}
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Phone</th>
            <th scope="col">Credit Limit</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => (
            // Each table row must have a unique `key` for React reconciliation
            <tr key={customer._id}>
              {/* <th scope="row">{customer._id}</th> */}
              <td>{customer.name}</td>
              <td>{customer.email}</td>
              <td>{customer.phone}</td>
              <td>{customer.creditLimit}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomerList;
