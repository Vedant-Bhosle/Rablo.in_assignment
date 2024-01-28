// UpdateModal.js
import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UpdateModal = ({
  isOpen,
  onClose,
  updateProduct,
  updateForm,
  setUpdateForm,
}) => {
  const navigate = useNavigate();
  const handleUpdateProduct = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.put(
        `http://localhost:5001/products/${updateForm.productId}`,
        updateForm,
        {
          withCredentials: true,
        }
      );

      // After successful update, close the modal and refresh the products list
      onClose();

      updateProduct(); // This calls the function to update the list of products
    } catch (error) {
      console.error("Error updating product", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdateForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  return (
    <div style={{ display: isOpen ? "block" : "none" }}>
      <hr className="my-10" />
      <h1 className="text-2xl font-bold flex justify-center ">Update Form</h1>
      <form onSubmit={handleUpdateProduct}>
        <label
          htmlFor="productName"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Product Name:
        </label>
        <input
          type="text"
          id="productName"
          name="name"
          className=" appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
          value={updateForm.name}
          onChange={handleInputChange}
          required
        />

        <label
          htmlFor="productPrice"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Product Price:
        </label>
        <input
          type="number"
          id="productPrice"
          name="price"
          className=" appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
          value={updateForm.price}
          onChange={handleInputChange}
          required
        />

        <label
          htmlFor="productFeatured"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Featured:
        </label>
        <input
          type="checkbox"
          id="productFeatured"
          name="featured"
          checked={updateForm.featured}
          onChange={() =>
            setUpdateForm((prevForm) => ({
              ...prevForm,
              featured: !prevForm.featured,
            }))
          }
        />

        <label
          htmlFor="productRating"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Product Rating:
        </label>
        <input
          type="number"
          id="productRating"
          name="rating"
          className=" appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
          value={updateForm.rating}
          onChange={handleInputChange}
          required
        />

        <label
          htmlFor="productCompany"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Product Company:
        </label>
        <input
          type="text"
          id="productCompany"
          name="company"
          className=" appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
          value={updateForm.company}
          onChange={handleInputChange}
          required
        />

        {/* Add more fields as needed */}

        <button
          className="bg-green-500 my-5 ml-2 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Update Product
        </button>
      </form>
    </div>
  );
};

export default UpdateModal;
