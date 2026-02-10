import { useEffect, useState } from "react";

// Type definition for customer objects returned from the API
type Customer = {
  _id: string;
  name: string;
};

// Type definition for item objects with pricing information
type Item = {
  _id: string;
  name: string;
  rate: number;
};

// Type definition for invoice line items (selected items with quantities)
type InvoiceItem = {
  item: string; // ID of the selected item
  quantity: number; // Quantity ordered for this item
};

function CreateInvoice() {
  // State to store the list of available customers fetched from the API
  const [customers, setCustomers] = useState<Customer[]>([]);

  // State to store the list of available items (products) that can be added to an invoice
  const [items, setItems] = useState<Item[]>([]);

  // State to track which customer was selected for the invoice
  const [selectedCustomer, setSelectedCustomer] = useState<string>("");

  // State to manage the line items added to the invoice (starts with one empty row)
  const [invoiceItems, setInvoiceItems] = useState<InvoiceItem[]>([
    { item: "", quantity: 1 },
  ]);

  // Retrieve authentication token from local storage (for potential future use)
  const token = localStorage.getItem("token");

  // ===========================
  // Fetch Customers & Items
  // ===========================
  // Run once when component mounts to load customers and items
  useEffect(() => {
    fetchCustomers();
    fetchItems();
  }, []);

  // Fetch the list of customers from the backend API
  const fetchCustomers = async () => {
    const res = await fetch("http://localhost:3000/customers");
    const responseData = await res.json();
    // Update state with the customer data (assuming API returns { data: [...] })
    setCustomers(responseData.data);
  };

  // Fetch the list of items (products) from the backend API
  const fetchItems = async () => {
    const res = await fetch("http://localhost:3000/items");
    const data = await res.json();
    // Update state with the items list
    setItems(data);
  };

  // ===========================
  // Handle Item Row Changes
  // ===========================
  // Update a specific field (item or quantity) in a specific invoice item row
  const handleItemChange = (index: number, field: string, value: unknown) => {
    const updatedItems = [...invoiceItems];
    // Modify the specified field in the specified row
    updatedItems[index][field as keyof InvoiceItem] = value as never;
    setInvoiceItems(updatedItems);
  };

  // Add a new empty row to the invoice items table
  const addNewItemRow = () => {
    setInvoiceItems([...invoiceItems, { item: "", quantity: 1 }]);
  };

  // Remove a row from the invoice items table by index
  const removeItemRow = (index: number) => {
    const updatedItems = invoiceItems.filter((item, i) => {
      return i !== index;
    });
    setInvoiceItems(updatedItems);
  };

  // ===========================
  // Submit Invoice
  // ===========================
  // Handle form submission to create a new invoice
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Prepare the invoice data with selected customer and items
    const payload = {
      customer: selectedCustomer,
      items: invoiceItems,
    };

    // Send the invoice data to the backend API
    const res = await fetch("http://localhost:3000/invoices", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    // Handle the response - show success or error message
    if (res.ok) {
      alert("Invoice created successfully!");
      console.log(data);
    } else {
      alert(data.message || "Error creating invoice");
    }
  };

  return (
    <div className="container py-4">
      <div className="card shadow-sm">
        <div className="card-header bg-primary text-white">
          <h4 className="mb-0">Create Invoice</h4>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            {/* Customer Selection - dropdown to select the customer for the invoice */}
            <div className="form-group mb-4">
              <label className="form-label fw-semibold">Customer:</label>
              <select
                className="form-select"
                value={selectedCustomer}
                onChange={(e) => setSelectedCustomer(e.target.value)}
                required
              >
                <option value="">Select Customer</option>
                {customers.map((customer) => (
                  <option key={customer._id} value={customer._id}>
                    {customer.name}
                  </option>
                ))}
              </select>
            </div>

            <hr />

            {/* Invoice Items Section - displays a table of items to be added to the invoice */}
            <h5 className="mt-4 mb-3">Invoice Items</h5>

            <div className="table-responsive">
              <table className="table table-bordered table-hover">
                <thead className="table-light">
                  <tr>
                    <th>Item</th>
                    <th className="text-center" style={{ width: "120px" }}>
                      Quantity
                    </th>
                    <th className="text-center" style={{ width: "100px" }}>
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {/* Render a table row for each invoice item */}
                  {invoiceItems.map((line, index) => (
                    <tr key={index}>
                      {/* Item selection dropdown - shows all available items with their rates */}
                      <td>
                        <select
                          className="form-select form-select-sm"
                          value={line.item}
                          onChange={(e) =>
                            handleItemChange(index, "item", e.target.value)
                          }
                          required
                        >
                          <option value="">Select Item</option>
                          {items.map((item) => (
                            <option key={item._id} value={item._id}>
                              {item.name} (₹{item.rate})
                            </option>
                          ))}
                        </select>
                      </td>
                      {/* Quantity input - allow user to specify how many units of this item */}
                      <td>
                        <input
                          type="number"
                          className="form-control form-control-sm"
                          min="1"
                          value={line.quantity}
                          onChange={(e) =>
                            handleItemChange(
                              index,
                              "quantity",
                              Number(e.target.value),
                            )
                          }
                          required
                        />
                      </td>
                      {/* Remove button - deletes this row from the invoice */}
                      <td className="text-center">
                        <button
                          type="button"
                          className="btn btn-danger btn-sm"
                          onClick={() => removeItemRow(index)}
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Add Item button - adds a new empty row to the invoice items table */}
            <button
              type="button"
              className="btn btn-secondary btn-sm mb-4"
              onClick={addNewItemRow}
            >
              + Add Item
            </button>

            <hr />

            {/* Form action buttons - submit the invoice or reset the form */}
            <div className="d-flex gap-2">
              <button type="submit" className="btn btn-primary">
                Create Invoice
              </button>
              <button type="reset" className="btn btn-outline-secondary">
                Reset
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateInvoice;
