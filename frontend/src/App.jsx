function App() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>TravelLog</h1>

      <h2>Ticket Entry</h2>

      <input placeholder="Travels Name" />
      <br /><br />

      <input placeholder="From" />
      <br /><br />

      <input placeholder="To" />
      <br /><br />

      <input type="date" />
      <br /><br />

      <input placeholder="Ticket No" />
      <br /><br />

      <input placeholder="Seat No" />
      <br /><br />

      <input placeholder="Fare" />
      <br /><br />

      <button>Save Ticket</button>

      <hr />

      <h2>Register</h2>

      <table border="1" cellPadding="10">
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
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>1</td>
            <td>17-06-2026</td>
            <td>PSR Travels</td>
            <td>Toranagallu</td>
            <td>Hyderabad</td>
            <td>PNR12345</td>
            <td>A1</td>
            <td>750</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default App;