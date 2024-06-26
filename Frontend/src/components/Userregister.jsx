import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../Contex/AppContex";

function Userregister() {
  // State variables for form data and image
  const [image, setImage] = useState(null);
  const [formData, setFormData] = useState({
    username: "",
    firstname: "",
  });

  // React Router hook for navigation
  const navigate = useNavigate();

  // Function to handle input change for text fields
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Update the corresponding form data field
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Function to handle image file selection
  const handleImageChange = (e) => {
    // Retrieve the selected image file
    const selectedImage = e.target.files[0];
    // Update the image state
    setImage(selectedImage);
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Create FormData object to send form data
    const formDataToSend = new FormData();
    formDataToSend.append("username", formData.username);
    formDataToSend.append("firstname", formData.firstname);
    formDataToSend.append("image", image);
    try {
      // Send form data to server using Axios
      const response = await axios.post(
        "http://localhost:3001/api/users/upload",
        formDataToSend
      );
      // Log the response data and navigate to user page
      console.log(response.data.userId);
      navigate(`/`);
    } catch (error) {
      // Handle errors if any
      console.error("Error submitting form:", error);
    }
  };

  return (
    <>
      <div className="userregister">
        <div className="form-container">
          {/* User registration form */}
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            {/* Username input field */}
            <label htmlFor="username">Username</label>
            <input
              type="text"
              name="username"
              onChange={handleChange}
              value={formData.username}
            />
            <br />
            {/* First name input field */}
            <label htmlFor="firstname">First Name</label>
            <input
              type="text"
              name="firstname"
              onChange={handleChange}
              value={formData.firstname}
            />
            <br />
            {/* Image upload input field */}
            <label htmlFor="image">Image</label>
            <input type="file" name="image" onChange={handleImageChange} />
            {/* Display selected image if available */}
            {image && (
              <img
                src={URL.createObjectURL(image)}
                alt="Selected"
                style={{ maxWidth: "100px" }}
              />
            )}
            <br />
            {/* Submit button */}
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Userregister;
