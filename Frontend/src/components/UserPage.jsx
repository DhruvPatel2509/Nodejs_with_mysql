import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import "../css/UserPage.css";
import UpdateUserCom from "./UpdateUser";
import AddressContainer from "./AddressContainer";
import { AppContext } from "../../Contex/AppContex";
import { useContext } from "react";

function UserPage() {
  // State variables
  const [updateUserUi, setUpdateUserUi] = useState(false); // Flag to control whether to show update user UI
  const { mainId, setMainId } = useContext(AppContext);

  const [userAddressData, setUserAddressData] = useState(null);
  const [userData, setuserData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch user data
  useEffect(() => {
    fetchUserData();
  }, [updateUserUi]);

  const fetchUserData = async () => {
    try {
      const res = await axios.get(`http://localhost:3001/api/users/`);
      setuserData(res.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  // Fetch addresses of a user
  const fetchAddresses = async (userId) => {
    setMainId(userId);

    try {
      const response = await axios.get(
        `http://localhost:3001/api/addresses/${userId}`
      );
      if (response.data.success) {
        setUserAddressData(response.data.results);
      } else {
        setUserAddressData(null);
      }
    } catch (error) {
      console.error("Error fetching addresses:", error);
    } finally {
      setLoading(false);
    }
  };

  // Set update mode for a user
  const updateUser = (userId) => {
    setUpdateUserUi(true);
    setMainId(userId);
  };

  // Delete a user
  const deleteUser = async (userId) => {
    try {
      await axios.delete(`http://localhost:3001/api/users/${userId}`);
      fetchUserData();
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("First Delete Address of this user");
    }
  };

  return (
    <div className="main_container">
      {updateUserUi ? (
        <UpdateUserCom
          updateUserId={mainId}
          setUpdateUserUi={setUpdateUserUi}
        />
      ) : (
        <div className="user-page-container">
          {/* Button to add a new user */}
          <Link to="/">
            <button className="addnew">Add New</button>
          </Link>
          {/* Display user details */}
          {userData.map((user) => (
            <div className="user-details" key={user.id}>
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Image</th>
                    <th>Username</th>
                    <th>Firstname</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{user.id}</td>
                    <td>
                      <img
                        src={`http://localhost:3001/uploads/${user.image}`}
                        alt=""
                        height={"100px"}
                        width={"100px"}
                      />
                    </td>
                    <td>{user.username}</td>
                    <td>{user.firstname}</td>
                  </tr>
                </tbody>
              </table>
              {/* Buttons for actions */}
              <button
                className="button"
                onClick={() => fetchAddresses(user.id)}
              >
                Address
              </button>
              <button className="button" onClick={() => updateUser(user.id)}>
                Update
              </button>
              <button className="button" onClick={() => deleteUser(user.id)}>
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
      {/* Component to display user addresses */}
      <AddressContainer
        userAddressData={userAddressData}
        fetchAddresses={fetchAddresses}
      />
    </div>
  );
}

export default UserPage;
