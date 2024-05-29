import React, { useState } from "react";
import axios from "axios";

function UpdateUserCom({ updateUserId, setUpdateUserUi }) {
  // State variables
  const [image, setImage] = useState(null);
  const [formData, setFormData] = useState({
    username: "",
    firstname: "",
  });

  // Handle form input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle image file change
  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setImage(selectedImage);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append("username", formData.username);
    formDataToSend.append("firstname", formData.firstname);
    formDataToSend.append("image", image);
    try {
      const response = await axios.put(
        `http://localhost:3001/api/users/upload/${updateUserId}`,
        formDataToSend
      );
      setUpdateUserUi(false);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="form-container">
      {/* User update form */}
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <label htmlFor="username">Username</label>
        <input
          type="text"
          name="username"
          onChange={handleChange}
          value={formData.username}
        />
        <br />
        <label htmlFor="firstname">First Name</label>
        <input
          type="text"
          name="firstname"
          onChange={handleChange}
          value={formData.firstname}
        />
        <br />
        <label htmlFor="image">Image</label>
        <input type="file" name="image" onChange={handleImageChange} />
        {/* Preview selected image */}
        {image && (
          <img
            src={URL.createObjectURL(image)}
            alt="Selected"
            style={{ maxWidth: "100px" }}
          />
        )}
        <br />
        <button type="submit">Submit</button>
      </form>
      {/* Back button */}
      <button onClick={() => setUpdateUserUi(false)}>Back</button>
    </div>
  );
}

export default UpdateUserCom;
