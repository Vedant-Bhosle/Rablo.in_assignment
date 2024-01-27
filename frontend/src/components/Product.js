import React, { useState, useEffect } from "react";
import axios from "axios";
import UpdateModal from "./UpdateModal";
function Product() {
  const [products, setProducts] = useState([]);
  const [productId, setproductId] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [featured, setfeatured] = useState(false);
  const [rating, setrating] = useState(0);
  const [company, setcompany] = useState("");
  const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);
  const [updateForm, setUpdateForm] = useState({
    productId: "",
    name: "",
    price: 0,
    featured: false,
    rating: 0,
    company: "",
  });

  const getproducts = async () => {
    // await axios
    //   .get("http://localhost:5001/getproducts", { withCredentials: true })
    //   .then((response) => setProducts(response.data))
    //   .catch((error) => console.error(error));

    const res = await fetch("http://localhost:5001/getproducts", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    // setProducts(res)
    const data = await res.json();
    setProducts(data);
  };
  useEffect(() => {
    getproducts();
  }, [products]);

  const addProduct = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:5001/createproduct", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        productId,
        name,
        price,
        featured,
        rating,
        company,
      }),
      credentials: "include",
    });
    const data = await res.json();

    setProducts([...products, data]);

    if (!data) {
      console.log("Error while adding product");
    } else {
      console.log("product added succesfully");
    }
  };
  const handleCheckboxChange = (e) => {
    setfeatured(e.target.checked);
  };

  const handleDelete = async (id) => {
    const res = await fetch(`http://localhost:5001/products/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },

      credentials: "include",
    });
  };

  const handleUpdateModalOpen = (product) => {
    setUpdateForm({
      productId: product.productId,
      name: product.name,
      price: product.price,
      featured: product.featured,
      rating: product.rating,
      company: product.company,
    });
    setUpdateModalOpen(true);
  };

  return (
    <div className="flex flex-col items-center justify-center min-w-full ">
      <h2 className="text-2xl font-semibold mt-8 mb-4">Add Product</h2>
      <form onSubmit={addProduct} className="max-w-md">
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="proid"
          >
            ProductId:
          </label>
          <input
            type="text"
            id="proid"
            className="appearance-none border rounded w-80 py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
            value={productId}
            onChange={(e) => setproductId(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="name"
          >
            Name:
          </label>
          <input
            type="text"
            id="name"
            className="appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="price"
          >
            Price:
          </label>
          <input
            type="number"
            id="price"
            className="appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="price"
          >
            Featured:
          </label>
          <input
            type="checkbox"
            onChange={(e) => handleCheckboxChange(e)}
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="rating"
          >
            Rating:
          </label>
          <input
            type="number"
            id="rating"
            className="appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
            value={rating}
            onChange={(e) => setrating(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="company"
          >
            Company:
          </label>
          <input
            type="text"
            id="company"
            className="appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
            value={company}
            onChange={(e) => setcompany(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Add Product
        </button>
      </form>

      <h1 className="text-3xl font-semibold mb-4 mt-10">Products</h1>
      <div className="grid grid-cols-3 gap-4">
        {products.map((product) => (
          <div key={product.productId} className="bg-white rounded p-4 shadow">
            <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
            <p className="text-gray-600">${product.price}</p>
            <p className="text-gray-600">{product.company}</p>
            <p className="text-gray-600">rating: {product.rating}</p>
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 mt-3 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={() => handleDelete(product.productId)}
            >
              Delete
            </button>
            <button
              className="bg-green-500 ml-2 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={() => handleUpdateModalOpen(product)}
            >
              Update
            </button>
          </div>
        ))}
      </div>
      {isUpdateModalOpen && (
        <UpdateModal
          isOpen={isUpdateModalOpen}
          onClose={() => setUpdateModalOpen(false)}
          // updateProduct={updateProduct}
        />
      )}
    </div>
  );
}

export default Product;
