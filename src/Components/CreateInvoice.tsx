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
    const res = await fetch("http://localhost:3000/customers", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    setCustomers(data);
  };

  const fetchItems = async () => {
    const res = await fetch("http://localhost:3000/items", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
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
    const updatedItems = invoiceItems.filter((_, i) => i !== index);
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
    <div style={{ padding: "20px" }}>
      <h2>Create Invoice</h2>

      <form onSubmit={handleSubmit}>
        {/* Customer Selection */}
        <div>
          <label>Customer:</label>
          <select
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
        <h3>Items</h3>

        {invoiceItems.map((line, index) => (
          <div key={index} style={{ marginBottom: "10px" }}>
            <select
              value={line.item}
              onChange={(e) => handleItemChange(index, "item", e.target.value)}
              required
            >
              <option value="">Select Item</option>
              {items.map((item) => (
                <option key={item._id} value={item._id}>
                  {item.name} (₹{item.rate})
                </option>
              ))}
            </select>

            <input
              type="number"
              min="1"
              value={line.quantity}
              onChange={(e) =>
                handleItemChange(index, "quantity", Number(e.target.value))
              }
              placeholder="Quantity"
              required
            />

            <button type="button" onClick={() => removeItemRow(index)}>
              Remove
            </button>
          </div>
        ))}

        <button type="button" onClick={addNewItemRow}>
          + Add Item
        </button>

        <hr />

        <button type="submit">Create Invoice</button>
      </form>
    </div>
  );
}

export default CreateInvoice;
