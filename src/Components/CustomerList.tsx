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
  const LOGIN_URL: string = "http://localhost:3000/auth/login";

  // `customers` state: holds the list of customers fetched from the API.
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [token, setToken] = useState<string | null>(null);

  /**
   * login:
   * - Calls the login API to get JWT token
   * - Stores the token in state and returns it
   */
  const login = async (): Promise<string> => {
    const response = await fetch(LOGIN_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: "nadeem@outlook.com",
        password: "mydiffpassworddd",
      }),
    });
    const loginData = await response.json();
    setToken(loginData.token);
    console.log("Obtained new token:", loginData.token);
    // Persist the token so it survives page reloads
    try {
      localStorage.setItem("token", loginData.token);
    } catch (e) {
      // ignore localStorage errors (e.g., storage disabled)
    }
    return loginData.token;
  };

  /**
   * fetchCustomers:
   * - Calls the API to get all customers with JWT token in Authorization header
   * - Parses the JSON response and stores it in state with `setCustomers`
   * - Called initially in useEffect and also after delete to refresh the list
   */
  const fetchCustomers = async (jwtToken: string) => {
    const response = await fetch(API_URL, {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    });
    const responseData = await response.json();
    setCustomers(responseData.data);
  };

  // Load customers once when the component mounts.
  useEffect(() => {
    const initializeData = async () => {
      // Try to reuse token from localStorage to avoid re-login on refresh
      let jwtToken = null as string | null;
      try {
        jwtToken = localStorage.getItem("token");
        console.log("Retrieved token from localStorage:", jwtToken);
      } catch (e) {
        jwtToken = null;
      }

      if (!jwtToken) {
        jwtToken = await login();
      } else {
        setToken(jwtToken);
      }

      await fetchCustomers(jwtToken);
    };

    initializeData();
  }, []);

  return (
    <div id="container">
      {/* Page title */}
      <h1 className="text-danger">Customer List</h1>

      {/* Link to Add Customer page */}
      <Link to={`/add-customer`} className="btn btn-primary my-3">
        <i className="bi-plus-circle me-2"></i>
        Add Customer``
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
