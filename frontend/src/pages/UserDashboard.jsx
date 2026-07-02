import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";

function UserDashboard() {

    const products = [
        {
            id: 1,
            name: "Laptop",
            price: 55000,
            category: "Electronics",
            image: "https://m.media-amazon.com/images/I/510uTHyDqGL.jpg",
        },
        {
            id: 2,
            name: "Smartphone",
            price: 25000,
            category: "Electronics",
            image: "https://images.jdmagicbox.com/quickquotes/images_main/-c3qcsbfo.jpg",
        },
        {
            id: 3,
            name: "Keyboard",
            price: 1500,
            category: "Accessories",
            image: "https://www.portronics.com/cdn/shop/files/Image1_22bc2b03-ea4b-4bd3-a84c-512cefb508fc.png?v=1718792091",
        },
        {
            id: 4,
            name: "Mouse",
            price: 800,
            category: "Accessories",
            image: "https://m.media-amazon.com/images/I/61hzuoXwjqL.jpg",
        },
        {
            id: 5,
            name: "Monitor",
            price: 12000,
            category: "Electronics",
            image: "https://images.philips.com/is/image/philipsconsumer/6525ccfcda3d4ca5bd7cb10e00e6923c?wid=700&hei=700&$pnglarge$",
        },
        {
            id: 6,
            name: "Printer",
            price: 9000,
            category: "Office",
            image: "https://media-ik.croma.com/Croma%20Assets/Computers%20Peripherals/Printers%20and%20Scanners/Images/247639_0_-i1rI8Yrw.png?updatedAt=1760546635931",
        },
    ];

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
                            key={product.id}
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
