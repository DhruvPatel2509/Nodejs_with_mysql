import React, { useEffect, useState, useContext } from "react";
import { AppContext } from "../../Contex/AppContex";
import "../css/Address.css";
import axios from "axios";
function Address({ fetchAddresses, setShowAddAddress, changeData }) {
  const { mainId } = useContext(AppContext);

  const [formData, setFormData] = useState({
    userId: "",
    houseNo: "",
    streetName: "",
    cityName: "",
    stateName: "",
    landmark: "",
    countryName: "",
  });

  formData.userId = mainId;
  useEffect(() => {
    if (changeData) {
      setFormData(changeData);
    }
  }, [changeData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:3001/api/addresses/",
        formData
      );
      console.log(res);
      fetchAddresses(mainId);
      setShowAddAddress(false);
    } catch (error) {
      console.error("Error creating address:", error);
      alert("Failed to create address. Please try again.");
    }
  };

  const updateAddress = async () => {
    try {
      const res = await axios.put(
        `http://localhost:3001/api/addresses/${formData.id}`,
        formData
      );
      console.log(res);
      fetchAddresses(mainId);
      setShowAddAddress(false);
    } catch (error) {
      console.error("Error updating address:", error);
      alert("Failed to update address. Please try again.");
    }
  };

  return (
    <div className="address-form-container">
      <h2>Submit Address</h2>
      <form className="address-form" onSubmit={handleSubmit}>
        <label>
          House No:
          <input
            type="text"
            name="houseNo"
            value={formData.houseNo}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Street Name:
          <input
            type="text"
            name="streetName"
            value={formData.streetName}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Landmark:
          <input
            type="text"
            name="landmark"
            value={formData.landmark}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          City Name:
          <input
            type="text"
            name="cityName"
            value={formData.cityName}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          State Name:
          <input
            type="text"
            name="stateName"
            value={formData.stateName}
            onChange={handleChange}
          />
        </label>
        <label>
          Country Name:
          <input
            type="text"
            name="countryName"
            value={formData.countryName}
            onChange={handleChange}
            required
          />
        </label>
        {changeData ? (
          <button type="button" onClick={updateAddress}>
            Update
          </button>
        ) : (
          <button type="submit">Submit</button>
        )}
      </form>
    </div>
  );
}

export default Address;
