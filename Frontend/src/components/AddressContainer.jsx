import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import Address from "./Address";
import { AppContext } from "../../Contex/AppContex";

function AddressContainer({ userAddressData, fetchAddresses }) {
  const { mainId } = useContext(AppContext);

  // State variables
  const [showAddAddress, setShowAddAddress] = useState(false); // Flag to control the display of the add address form
  const [changeData, setChangeData] = useState(null); // Data for updating an existing address

  // Function to handle updating an address
  const updateAddress = async (address) => {
    setShowAddAddress(true);
    setChangeData(address);
  };

  // Function to handle deleting an address
  const deleteAddress = async (addressId) => {
    console.log(addressId);
    try {
      const res = await axios.delete(
        `http://localhost:3001/api/addresses/${addressId}`
      );
      console.log(res.error);
      fetchAddresses(mainId);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="address_container">
      {/* Render address table if userData is available */}
      {userAddressData && userAddressData.length > 0 ? (
        <table className="address-table" border={1}>
          <thead>
            <tr>
              <th>Id</th>
              <th>House No</th>
              <th>Street Name</th>
              <th>Landmark</th>
              <th>City</th>
              <th>State</th>
              <th>Country</th>
              <th colSpan="2">Action</th>
            </tr>
          </thead>
          <tbody>
            {userAddressData.map((user) => (
              <React.Fragment key={user.id}>
                <tr>
                  <td>{user.userId}</td>
                  <td>{user.houseNo}</td>
                  <td>{user.streetName}</td>
                  <td>{user.landmark}</td>
                  <td>{user.cityName}</td>
                  <td>{user.stateName}</td>
                  <td>{user.countryName}</td>
                  <td>
                    <button className="btn" onClick={() => updateAddress(user.addressId)}>
                      Update
                    </button>
                  </td>
                  <td>
                    <button
                      className="btn"
                      onClick={() => deleteAddress(user.addressId)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              </React.Fragment>
            ))}
          </tbody>
        </table>
      ) : (
        // Display message if no address found
        <p>No address found</p>
      )}
      {/* Render Add new button if updateUserId is available */}
      {mainId && (
        <button
          className="btn"
          onClick={() => {
            setShowAddAddress(true);
          }}
        >
          Add new
        </button>
      )}
      {/* Render Address component if showAddAddress is true */}
      {showAddAddress && (
        <Address
          fetchAddresses={fetchAddresses}
          setShowAddAddress={setShowAddAddress}
          changeData={changeData}
        />
      )}
    </div>
  );
}

export default AddressContainer;
