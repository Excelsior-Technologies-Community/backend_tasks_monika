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

    const [imageType, setImageType] = useState("url");
    const [imageFile, setImageFile] = useState(null);

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

            const formData = new FormData();

            formData.append("name", product.name);
            formData.append("category", product.category);
            formData.append("price", product.price);
            formData.append("description", product.description);

            if (imageType === "url") {
                formData.append("image", product.image);
            }

            if (imageType === "file" && imageFile) {
                formData.append("imageFile", imageFile);
            }

            if (editProduct) {
                await api.patch(`/api/products/${editProduct._id}`, formData);

                toast.success("Product updated successfully");
            } else {
                await api.post("/api/products", formData);

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

        <div className="bg-white rounded-xl shadow-md border border-gray-100 p-4 mb-4">

            <div className="flex items-center gap-2 mb-4">
                <div className="w-1 h-5 bg-blue-600 rounded-full"></div>
                <h2 className="text-base font-bold text-gray-800">
                    {editProduct ? "Edit Product" : "Add New Product"}
                </h2>
            </div>

            <form
                onSubmit={handleSubmit}
                className="grid grid-cols-2 md:grid-cols-3 gap-3"
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

                <div className="col-span-2 md:col-span-3 mb-0">
                    <label className="block mb-1.5 text-sm font-medium text-gray-700">
                        Image Source
                    </label>

                    <div className="flex gap-4">
                        <label className={`flex items-center gap-2 px-4 py-2 rounded-lg border cursor-pointer text-sm font-medium transition duration-200 ${imageType === "url" ? "border-blue-500 bg-blue-50 text-blue-600" : "border-gray-200 text-gray-600 hover:bg-gray-50"}`}>
                            <input
                                type="radio"
                                value="url"
                                checked={imageType === "url"}
                                onChange={() => { setImageType("url"); setImageFile(null); }}
                                className="hidden"
                            />
                            🔗 Image URL
                        </label>

                        <label className={`flex items-center gap-2 px-4 py-2 rounded-lg border cursor-pointer text-sm font-medium transition duration-200 ${imageType === "file" ? "border-blue-500 bg-blue-50 text-blue-600" : "border-gray-200 text-gray-600 hover:bg-gray-50"}`}>
                            <input
                                type="radio"
                                value="file"
                                checked={imageType === "file"}
                                onChange={() => { setImageType("file"); setProduct({ ...product, image: "" }); }}
                                className="hidden"
                            />
                            📁 Upload Image
                        </label>
                    </div>
                </div>

                {imageType === "url" && (
                    <InputField
                        label="Image URL"
                        type="text"
                        name="image"
                        value={product.image}
                        placeholder="Enter image URL"
                        onChange={handleChange}
                    />
                )}
                {imageType === "file" && (
                    <div className="col-span-2 md:col-span-3 mb-2">
                        <label className="block mb-1.5 text-sm font-medium text-gray-700">Upload Image</label>
                        {!imageFile ? (
                            <label className="flex flex-col items-center justify-center w-full h-24 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition duration-200">
                                <span className="text-2xl">📁</span>
                                <span className="text-sm text-gray-500 mt-1">Click to choose a file</span>
                                <input
                                    type="file"
                                    name="imageFile"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={(e) => setImageFile(e.target.files[0])}
                                />
                            </label>
                        ) : (
                            <div className="flex items-center justify-between border border-green-300 bg-green-50 rounded-lg px-4 py-2">
                                <div className="flex items-center gap-2">
                                    <span className="text-green-600 text-lg">✅</span>
                                    <span className="text-sm text-green-700 font-medium truncate max-w-xs">{imageFile.name}</span>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => setImageFile(null)}
                                    className="text-red-400 hover:text-red-600 text-lg font-bold ml-2"
                                >
                                    ✕
                                </button>
                            </div>
                        )}
                    </div>
                )}

                <div className="col-span-2 md:col-span-3">
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Description
                    </label>

                    <textarea
                        name="description"
                        value={product.description}
                        onChange={handleChange}
                        placeholder="Enter product description"
                        rows={2}
                        className="w-full border border-gray-300 rounded-lg p-2 focus:border-blue-500 focus:outline-none resize-none text-sm text-gray-700 placeholder-gray-400"
                    />
                </div>

                <div className="col-span-2 md:col-span-3 flex gap-3">
                    <Button
                        title={editProduct ? "Update Product" : "Add Product"}
                        type="submit"
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition duration-200"
                    />
                    <Button
                        title="Cancel"
                        type="button"
                        onClick={closeForm}
                        className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-2 rounded-lg font-semibold transition duration-200"
                    />
                </div>

            </form>

        </div>

    );
}

export default AddProductForm;
