import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";
import { useEffect, useState } from "react";
import api from "../services/api";

function UserDashboard() {
    const [products, setProducts] = useState([]);

    async function fetchProducts() {
        try {
            const response = await api.get("/api/products");
            setProducts(response.data);
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <div className="min-h-screen bg-gray-50">

            <Navbar />

            <div className="max-w-7xl mx-auto px-8 py-10">

                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">
                        All Products
                    </h1>
                    <p className="text-gray-500 mt-1">Browse our latest collection</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {products.map((product) => (
                        <ProductCard
                            key={product._id}
                            image={product.image}
                            name={product.name}
                            price={product.price}
                            category={product.category}
                        />
                    ))}
                </div>

            </div>

        </div>
    );
}

export default UserDashboard;
