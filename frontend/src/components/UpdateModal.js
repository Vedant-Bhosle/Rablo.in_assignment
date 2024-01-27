// UpdateModal.js
import React from "react";
// import axios from "axios";

const UpdateModal = ({ isOpen, onClose, updateProduct }) => {
  const handleUpdateProduct = async (e) => {
    e.preventDefault();

    try {
      //   await axios.put(
      //     `http://localhost:5001/updateproduct/${updateForm.productId}`,
      //     // updateForm,
      //     {
      //       withCredentials: true,
      //     }
      //   );

      // After successful update, close the modal and refresh the products list
      onClose();
      //   updateProduct();
    } catch (error) {
      console.error("Error updating product", error);
    }
  };

  return (
    // Modal UI with update form
    <div>
      {/* ... your modal UI ... */}
      <form onSubmit={handleUpdateProduct}>
        {/* ... your update form fields ... */}
        <button type="submit">Update Product</button>
      </form>
    </div>
  );
};

export default UpdateModal;
