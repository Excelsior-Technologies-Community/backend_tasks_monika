function ProductCard({ image, name, price, category }) {
    return (
        <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition flex flex-col items-center ">

            <img
                src={image}
                alt={name}
                className="w-60 max-h-full object-cover rounded-md"
            />

            <h2 className="text-xl font-semibold mt-4">
                {name}
            </h2>

            <p className="text-gray-600 mt-2">
                Category: {category}
            </p>

            <p className="text-lg font-bold text-green-600 mt-2">
                ₹{price}
            </p>

        </div>
    );
}

export default ProductCard;