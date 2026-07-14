import { useState } from "react";
import Button from "./Button";

function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <nav className="bg-gray-700 text-white shadow-lg">
            <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

                <h1 className="text-2xl font-bold">Product Store</h1>

                {/* Hamburger - mobile only */}
                <button
                    className="sm:hidden text-white focus:outline-none"
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        {menuOpen
                            ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        }
                    </svg>
                </button>

                {/* Desktop menu */}
                <div className="hidden sm:flex items-center gap-5">
                    <span className="text-sm font-medium bg-white/20 px-3 py-1 rounded-full">
                        Welcome, 
                    </span>
                    <Button
                        title="Logout"
                        type="button"
                        className="bg-red-500 hover:bg-red-600 text-white text-sm font-semibold px-4 py-2 rounded-full transition duration-200"
                    />
                </div>

            </div>

            {/* Mobile menu */}
            {menuOpen && (
                <div className="sm:hidden flex flex-col items-start gap-3 px-6 pb-4">
                    <span className="text-sm font-medium bg-white/20 px-3 py-1 rounded-full">
                        Welcome, User
                    </span>
                    <Button
                        title="Logout"
                        type="button"
                        className="bg-red-500 hover:bg-red-600 text-white text-sm font-semibold px-4 py-2 rounded-full transition duration-200"
                    />
                </div>
            )}
        </nav>
    );
}

export default Navbar;
