import { useEffect, useState } from "react";

type Customer = {
  _id: string;
  name: string;
};

type Item = {
  _id: string;
  name: string;
  rate: number;
};

type InvoiceItem = {
  item: string;
  quantity: number;
};

function CreateInvoice() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [items, setItems] = useState<Item[]>([]);

  const [selectedCustomer, setSelectedCustomer] = useState<string>("");
  const [invoiceItems, setInvoiceItems] = useState<InvoiceItem[]>([
    { item: "", quantity: 1 },
  ]);

  const token = localStorage.getItem("token");

  // ===========================
  // Fetch Customers & Items
  // ===========================
  useEffect(() => {
    fetchCustomers();
    fetchItems();
  }, []);

  const fetchCustomers = async () => {
    const res = await fetch("http://localhost:3000/customers");
    const responseData = await res.json();
    setCustomers(responseData.data);
  };

  const fetchItems = async () => {
    const res = await fetch("http://localhost:3000/items");
    const data = await res.json();
    setItems(data);
  };

  // ===========================
  // Handle Item Row Changes
  // ===========================
  const handleItemChange = (index: number, field: string, value: unknown) => {
    const updatedItems = [...invoiceItems];
    updatedItems[index][field as keyof InvoiceItem] = value as never;
    setInvoiceItems(updatedItems);
  };

  const addNewItemRow = () => {
    setInvoiceItems([...invoiceItems, { item: "", quantity: 1 }]);
  };

  const removeItemRow = (index: number) => {
    const updatedItems = invoiceItems.filter((item, i) => {
      return i !== index;
    });
    setInvoiceItems(updatedItems);
  };

  // ===========================
  // Submit Invoice
  // ===========================
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const payload = {
      customer: selectedCustomer,
      items: invoiceItems,
    };

    const res = await fetch("http://localhost:3000/invoices", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

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
            {/* Customer Selection */}
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

            {/* Invoice Items */}
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
                  {invoiceItems.map((line, index) => (
                    <tr key={index}>
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

            <button
              type="button"
              className="btn btn-secondary btn-sm mb-4"
              onClick={addNewItemRow}
            >
              + Add Item
            </button>

            <hr />

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
