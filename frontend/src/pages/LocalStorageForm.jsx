import { useState, useEffect } from "react";
import InputField from "../components/InputField";
import Button from "../components/Button";

function LocalStorageForm() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
    });

    const [users, setUsers] = useState([]);

    function handleChange(event) {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        });
    }

    function handleSubmit(event) {
        event.preventDefault();

        const updatedUsers = [...users, formData];

        setUsers(updatedUsers);

        localStorage.setItem("localStorageUsers", JSON.stringify(updatedUsers));

        console.log(localStorage.getItem("users"));

        setFormData({
            name: "",
            email: "",
            phone: "",
        });
    }

    useEffect(() => {
        const storedUsers =
            JSON.parse(localStorage.getItem("localStorageUsers")) || [];

        setUsers(storedUsers);
    }, []);

    return (
        <div className="min-h-screen bg-gray-100 py-10">
            <div className="max-w-3xl mx-auto">

                <div className="bg-white p-8 rounded-lg shadow-md">

                    <h1 className="text-2xl font-bold text-center mb-6">
                        Local Storage Form
                    </h1>

                    <form
                        onSubmit={handleSubmit}
                        className="space-y-4"
                    >
                        <InputField
                            label="Name"
                            type="text"
                            name="name"
                            value={formData.name}
                            placeholder="Enter name"
                            onChange={handleChange}
                        />

                        <InputField
                            label="Email"
                            type="email"
                            name="email"
                            value={formData.email}
                            placeholder="Enter email"
                            onChange={handleChange}
                        />

                        <InputField
                            label="Phone"
                            type="text"
                            name="phone"
                            value={formData.phone}
                            placeholder="Enter phone number"
                            onChange={handleChange}
                        />

                        <Button
                            title="Save"
                            type="submit"
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
                        />
                    </form>
                </div>

                {/* Stored Users */}

                <div className="bg-white mt-8 p-6 rounded-lg shadow-md">

                    <h2 className="text-xl font-bold mb-4">
                        Stored Users
                    </h2>

                    {users.length === 0 ? (
                        <p className="text-gray-500">
                            No users found.
                        </p>
                    ) : (
                        <table className="w-full border border-gray-300">
                            <thead className="bg-gray-200">
                                <tr>
                                    <th className="border p-2">Name</th>
                                    <th className="border p-2">Email</th>
                                    <th className="border p-2">Phone</th>
                                </tr>
                            </thead>

                            <tbody>
                                {users.map((user, index) => (
                                    <tr key={index}>
                                        <td className="border p-2">
                                            {user.name}
                                        </td>

                                        <td className="border p-2">
                                            {user.email}
                                        </td>

                                        <td className="border p-2">
                                            {user.phone}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>

            </div>
        </div>
    );
}

export default LocalStorageForm;