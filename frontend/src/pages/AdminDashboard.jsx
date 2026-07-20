import { useEffect, useState } from "react";
import api from "../services/api";
import { toast } from "react-toastify";
import AddProductForm from "../components/AddProductForm";
import Button from "../components/Button";

function AdminDashboard() {
    const [products, setProducts] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [editProduct, setEditProduct] = useState(null);

    async function fetchProducts() {
        try {
            const response = await api.get("/api/products");
            setProducts(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    async function handleDelete(id) {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this product?"
        );

        if (!confirmDelete) return;

        try {
            const response = await api.delete(`/api/products/${id}`);

            toast.success(response.data.message);

            fetchProducts();
        } catch (error) {
            toast.error(
                error.response?.data?.message || "Failed to delete product"
            );
        }
    }

    function handleEdit(product) {
        console.log(product);
        setEditProduct(product);
        setShowForm(true);
    }

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <div className="min-h-screen bg-gray-100">

            {/* Header */}
            <div className="bg-gray-700 text-white px-4 sm:px-8 py-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-0 shadow-md">
                <h1 className="text-2xl font-bold">
                    Admin Dashboard
                </h1>

                <Button
                    title="Add Product"
                    className="bg-white text-gray-700 px-5 py-2 rounded-md hover:bg-gray-100 w-full sm:w-auto text-center"
                    onClick={() => {
                        setEditProduct(null);
                        setShowForm(true);
                    }}
                />
            </div>

            {/* Product Table */}
            <div className="px-4 sm:px-6 mt-8">
                <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-md p-4 sm:p-6">

                    {/* Add Product Popup */}
                    {showForm && (
                        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
                            <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl mx-4 relative">

                                <div className="flex justify-between items-center border-b p-5">
                                    <h2 className="text-2xl font-bold">
                                        {editProduct ? "Edit Product" : "Add Product"}
                                    </h2>

                                    <button
                                        onClick={() => {
                                            setShowForm(false);
                                            setEditProduct(null);
                                        }}
                                        className="text-2xl font-bold text-gray-500 hover:text-red-600"
                                    >
                                        ×
                                    </button>
                                </div>

                                <div className="p-6">
                                    <AddProductForm
                                        fetchProducts={fetchProducts}
                                        closeForm={() => {
                                            setShowForm(false);
                                            setEditProduct(null);
                                        }}
                                        editProduct={editProduct}
                                        setEditProduct={setEditProduct}
                                    />
                                </div>

                            </div>
                        </div>
                    )}

                    <h2 className="text-2xl font-semibold mb-6">
                        Product List
                    </h2>

                    {/* Mobile View */}
                    <div className="flex flex-col gap-4 sm:hidden">
                        {products.length > 0 ? (
                            products.map((product) => (
                                <div
                                    key={product._id}
                                    className="border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 p-4 flex gap-4 items-center"
                                >
                                    <img
                                        src={
                                            product.image.startsWith("http")
                                                ? product.image
                                                : `http://localhost:3000/${product.image}`
                                        }
                                        alt={product.name}
                                        className="w-16 h-16 object-cover rounded-lg flex-shrink-0 shadow-sm"
                                    />

                                    <div className="flex-1 min-w-0">
                                        <span className="inline-block text-xs font-medium text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
                                            {product.category}
                                        </span>

                                        <p className="font-bold text-gray-800 text-sm truncate mt-1">
                                            {product.name}
                                        </p>

                                        <p className="text-green-600 font-bold text-sm mt-1">
                                            ₹{product.price}
                                        </p>
                                    </div>

                                    <div className="flex gap-1.5 flex-shrink-0">
                                        <Button
                                            title="Edit"
                                            className="bg-yellow-500 hover:bg-yellow-600 text-white px-2.5 py-1 rounded-md text-xs font-semibold transition duration-200"
                                            onClick={() => handleEdit(product)}
                                        />

                                        <Button
                                            title="Delete"
                                            onClick={() => handleDelete(product._id)}
                                            className="bg-red-600 hover:bg-red-700 text-white px-2.5 py-1 rounded-md text-xs font-semibold transition duration-200"
                                        />
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-center py-6 text-gray-500">
                                No Products Found
                            </p>
                        )}
                    </div>

                    {/* Desktop View */}
                    <div className="hidden sm:block overflow-x-auto">
                        <table className="w-full border border-gray-300">
                            <thead className="bg-gray-200">
                                <tr>
                                    <th className="border p-3">Image</th>
                                    <th className="border p-3">Product Name</th>
                                    <th className="border p-3">Category</th>
                                    <th className="border p-3">Price</th>
                                    <th className="border p-3">Actions</th>
                                </tr>
                            </thead>

                            <tbody>
                                {products.length > 0 ? (
                                    products.map((product) => (
                                        <tr
                                            key={product._id}
                                            className="text-center"
                                        >
                                            <td className="border p-3">
                                                <img
                                                    src={
                                                        product.image.startsWith("http")
                                                            ? product.image
                                                            : `http://localhost:3000/${product.image}`
                                                    }
                                                    alt={product.name}
                                                    className="w-16 h-16 object-cover mx-auto rounded"
                                                />
                                            </td>

                                            <td className="border p-3">
                                                {product.name}
                                            </td>

                                            <td className="border p-3">
                                                {product.category}
                                            </td>

                                            <td className="border p-3">
                                                ₹{product.price}
                                            </td>

                                            <td className="border p-3">
                                                <div className="flex justify-center gap-2">
                                                    <Button
                                                        title="Edit"
                                                        onClick={() => handleEdit(product)}
                                                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded text-sm"
                                                    />

                                                    <Button
                                                        title="Delete"
                                                        onClick={() => handleDelete(product._id)}
                                                        className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm"
                                                    />
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td
                                            colSpan="5"
                                            className="text-center py-6 text-gray-500"
                                        >
                                            No Products Found
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default AdminDashboard;