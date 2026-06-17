import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const today = new Date().toISOString().split("T")[0];
  const [ticket, setTicket] = useState({
    serialNumber: "",
    travelsName: "",
    from: "",
    to: "",
    date: today,
    ticketNo: "",
    seatNo: "",
    fare: "",
  });

  const [tickets, setTickets] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [travels, setTravels] = useState([]);
  const [filteredTravels, setFilteredTravels] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [routes, setRoutes] = useState([]);

  // Handle all input changes and filter travel names dynamically
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTicket({
      ...ticket,
      [name]: value,
    });

    if (name === "travelsName") {
      const filtered = travels.filter((travel) =>
        travel.name.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredTravels(filtered);
    }
  };

  // Fetch all tickets from the backend API
  const fetchTickets = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/tickets");
      setTickets(response.data);
    } catch (error) {
      console.error("Error fetching tickets:", error);
    }
  };

  // Fetch the master list of travels for auto-suggestion
  const fetchTravels = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/travels");
      setTravels(response.data);
    } catch (error) {
      console.error("Error fetching travels:", error);
    }
  };

  // Fetch available routes for a specific travel agency
  const fetchRoutes = async (travelName) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/routes/${travelName}`
      );
      setRoutes(response.data);
    } catch (error) {
      console.error("Error fetching routes:", error);
    }
  };

  // Save a new ticket or Update an existing one based on editingId
  const saveTicket = async () => {
    try {
      if (editingId) {
        await axios.put(
          `http://localhost:5000/api/tickets/${editingId}`,
          ticket
        );
        alert("Ticket Updated Successfully!");
        setEditingId(null);
      } else {
        await axios.post("http://localhost:5000/api/tickets", ticket);
        alert("Ticket Saved Successfully!");
      }

      // Reset form state to initial values
      setTicket({
        serialNumber: "",
        travelsName: "",
        from: "",
        to: "",
        date: today,
        ticketNo: "",
        seatNo: "",
        fare: "",
      });
      setRoutes([]); // Clear routes after save
      fetchTickets();
    } catch (error) {
      console.error(error);
      alert("Operation Failed");
    }
  };

  // Populate the form fields with the selected ticket details for editing
  const editTicket = (ticketData) => {
    setTicket({
      serialNumber: ticketData.serialNumber,
      travelsName: ticketData.travelsName,
      from: ticketData.from,
      to: ticketData.to,
      date: ticketData.date ? ticketData.date.split("T")[0] : "",
      ticketNo: ticketData.ticketNo,
      seatNo: ticketData.seatNo,
      fare: ticketData.fare,
    });

    setEditingId(ticketData._id);
    fetchRoutes(ticketData.travelsName); // Fetch routes for editing ticket
  };

  // Delete a ticket by its ID
  const deleteTicket = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/tickets/${id}`);
      fetchTickets();
    } catch (error) {
      console.error(error);
      alert("Failed to delete ticket");
    }
  };

  // Load backend data on component mount
  useEffect(() => {
    fetchTickets();
    fetchTravels();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>TravelLog</h1>

      <h2>Ticket Entry</h2>

      <input
        name="serialNumber"
        placeholder="Serial Number"
        value={ticket.serialNumber}
        onChange={handleChange}
      />
      <br />
      <br />

      <div style={{ position: "relative" }}>
        <input
          name="travelsName"
          placeholder="Travels Name"
          value={ticket.travelsName}
          onChange={handleChange}
          onFocus={() => setShowSuggestions(true)}
        />

        {/* Suggestion dropdown list */}
        {showSuggestions && filteredTravels.length > 0 && (
          <div
            style={{
              border: "1px solid gray",
              width: "200px",
              background: "white",
              position: "absolute",
              zIndex: 1,
            }}
          >
            {filteredTravels.map((travel) => (
              <div
                key={travel._id}
                style={{
                  padding: "5px",
                  cursor: "pointer",
                }}
                onClick={() => {
                  setTicket({
                    ...ticket,
                    travelsName: travel.name,
                  });
                  fetchRoutes(travel.name);
                  setShowSuggestions(false);
                  setFilteredTravels([]);
                }}
              >
                {travel.name}
              </div>
            ))}
          </div>
        )}
      </div>
      <br />
      <br />

      {/* Suggested Routes Section */}
      {routes.length > 0 && (
        <div
          style={{
            border: "1px solid #ccc",
            padding: "10px",
            marginTop: "10px",
            marginBottom: "15px",
          }}
        >
          <h4>Suggested Routes</h4>

          {routes.map((route) => (
            <button
              key={route._id}
              style={{
                margin: "5px",
                cursor: "pointer",
              }}
              onClick={() => {
                setTicket({
                  ...ticket,
                  travelsName: route.travelsName,
                  from: route.from,
                  to: route.to,
                  fare: route.defaultFare,
                });
                setRoutes([]);
              }}
            >
              {route.from} → {route.to}
            </button>
          ))}
        </div>
      )}

      <input
        name="from"
        placeholder="From"
        value={ticket.from}
        onChange={handleChange}
        onFocus={() => setShowSuggestions(false)}
      />
      <br />
      <br />

      <input
        name="to"
        placeholder="To"
        value={ticket.to}
        onChange={handleChange}
      />
      <br />
      <br />

      <input
        type="date"
        name="date"
        value={ticket.date}
        onChange={handleChange}
        onFocus={() => setShowSuggestions(false)}
      />
      <br />
      <br />

      <input
        name="ticketNo"
        placeholder="Ticket Number"
        value={ticket.ticketNo}
        onChange={handleChange}
        onFocus={() => setShowSuggestions(false)}
      />
      <br />
      <br />

      <input
        name="seatNo"
        placeholder="Seat Number"
        value={ticket.seatNo}
        onChange={handleChange}
        onFocus={() => setShowSuggestions(false)}
      />
      <br />
      <br />

      <input
        name="fare"
        placeholder="Fare"
        value={ticket.fare}
        onChange={handleChange}
        onFocus={() => setShowSuggestions(false)}
      />
      <br />
      <br />

      <button onClick={saveTicket}>
        {editingId ? "Update Ticket" : "Save Ticket"}
      </button>

      <hr />

      <h2>Register</h2>

      <table border="1" cellPadding="10" style={{ borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>S.No</th>
            <th>Date</th>
            <th>Travels</th>
            <th>From</th>
            <th>To</th>
            <th>Ticket No</th>
            <th>Seat No</th>
            <th>Fare</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {tickets.length > 0 ? (
            tickets.map((ticket) => (
              <tr key={ticket._id}>
                <td>{ticket.serialNumber}</td>
                <td>{new Date(ticket.date).toLocaleDateString()}</td>
                <td>{ticket.travelsName}</td>
                <td>{ticket.from}</td>
                <td>{ticket.to}</td>
                <td>{ticket.ticketNo}</td>
                <td>{ticket.seatNo}</td>
                <td>{ticket.fare}</td>
                <td>
                  <button onClick={() => editTicket(ticket)}>Edit</button>
                  <button
                    onClick={() => deleteTicket(ticket._id)}
                    style={{ marginLeft: "5px" }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="9" style={{ textAlign: "center" }}>
                No tickets found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default App;