import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import api from "../services/api";
import InputField from "./InputField";
import Button from "./Button";

function AddProductForm({
    fetchProducts,
    closeForm,
    editProduct,
    setEditProduct,
}) {

    const [product, setProduct] = useState({
        name: "",
        category: "",
        price: "",
        description: "",
        image: "",
    });

    useEffect(() => {
        if (editProduct) {
            setProduct({
                name: editProduct.name,
                category: editProduct.category,
                price: editProduct.price,
                image: editProduct.image,
                description: editProduct.description,
            });
        }
    }, [editProduct]);

    function handleChange(event) {
            setProduct({
                ...product,
                [event.target.name]: event.target.value,
            });
        }

        async function handleSubmit(e) {
            e.preventDefault();

            try {

                if (editProduct) {
                    await api.patch(`/api/products/${editProduct._id}`, product);

                    toast.success("Product updated successfully");
                } else {
                    await api.post("/api/products", product);

                    toast.success("Product added successfully");
                }

                fetchProducts();
                closeForm();
                setEditProduct(null);

            } catch (error) {
                toast.error(error.response?.data?.message || "Something went wrong");
            }
        }


        return (

            <div className="bg-white p-6 rounded-lg shadow-md mb-8">

                <h2>
                    {editProduct ? "Edit Product" : "Add Product"}
                </h2>

                <form
                    onSubmit={handleSubmit}
                    className="grid grid-cols-1 md:grid-cols-2 gap-4"
                >

                    <InputField
                        label="Product Name"
                        type="text"
                        name="name"
                        value={product.name}
                        placeholder="Enter product name"
                        onChange={handleChange}
                    />

                    <InputField
                        label="Category"
                        type="text"
                        name="category"
                        value={product.category}
                        placeholder="Enter category"
                        onChange={handleChange}
                    />

                    <InputField
                        label="Price"
                        type="number"
                        name="price"
                        value={product.price}
                        placeholder="Enter price"
                        onChange={handleChange}
                    />

                    <InputField
                        label="Image URL"
                        type="text"
                        name="image"
                        value={product.image}
                        placeholder="Enter image URL"
                        onChange={handleChange}
                    />

                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Description
                        </label>

                        <textarea
                            name="description"
                            value={product.description}
                            onChange={handleChange}
                            placeholder="Enter product description"
                            rows={4}
                            className="w-full border border-gray-300 rounded-lg p-3 focus:border-blue-500 focus:outline-none resize-none"
                        />
                    </div>


                    <div className="md:col-span-2">

                        <Button
                            title={editProduct ? "Update Product" : "Add Product"}
                            type="submit"
                            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded"
                        />

                    </div>

                </form>

            </div>

        );
}

export default AddProductForm;