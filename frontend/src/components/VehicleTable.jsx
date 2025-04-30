import React, { useEffect, useState } from "react";
import axios from "axios";

const VehicleTable = () => {
  const [vehicles, setVehicles] = useState([]);
  const [error, setError] = useState("");

  // Fetch all vehicles on component mount
  useEffect(() => {
    fetchVehicles();
  }, []);

  const fetchVehicles = async () => {
    try {
      const response = await axios.get("http://localhost:5000/vehicles");
      setVehicles(response.data);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch vehicles.");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Vehicle Records</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ backgroundColor: "#f0f0f0" }}>
            <th style={thStyle}>VIN</th>
            <th style={thStyle}>Make</th>
            <th style={thStyle}>Model</th>
            <th style={thStyle}>Status</th>
          </tr>
        </thead>
        <tbody>
          {vehicles.length === 0 ? (
            <tr>
              <td colSpan="4" style={{ textAlign: "center", padding: "20px" }}>
                No vehicle records found.
              </td>
            </tr>
          ) : (
            vehicles.map((vehicle) => (
              <tr key={vehicle._id}>
                <td style={tdStyle}>{vehicle.vin}</td>
                <td style={tdStyle}>{vehicle.make}</td>
                <td style={tdStyle}>{vehicle.model}</td>
                <td style={tdStyle}>{vehicle.status}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

const thStyle = {
  border: "1px solid #ddd",
  padding: "10px",
  textAlign: "left",
  fontWeight: "bold",
};

const tdStyle = {
  border: "1px solid #ddd",
  padding: "10px",
};

export default VehicleTable;
