import { useState } from "react";
import { toast } from "react-toastify";
import InputField from "../components/InputField";
import Button from "../components/Button";
import api from "../services/api";
import { Link } from "react-router-dom";

function FormPage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
    });

    function handleChange(event) {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        });
    }

    async function handleSubmit(event) {
        event.preventDefault();

        if (
            formData.name === "" &&
            formData.email === "" &&
            formData.phone === ""
        ) {
            toast.error("Please fill all the fields.");
            return;
        }

        // if (!/^[A-Za-z\s]+$/.test(formData.name)) {
        //     toast.error("Name should contain only letters.");
        //     return;
        // }

        // if (!/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        //     .test(formData.email)) {
        //     toast.error("Please enter a valid email.");
        //     return;
        // }

        // if (!/^[0-9]{10}$/.test(formData.phone)) {
        //     toast.error("Phone number must be exactly 10 digits.");
        //     return;
        // }

        try {
            const response = await api.post("/api/users", formData);

            toast.success(response.data.message);

            console.log(response.data);

            setFormData({
                name: "",
                email: "",
                phone: ""
            });
        } catch (error) {
            console.log(error);
            console.log(error.response);

            toast.error(
                error.response?.data?.message || "Something went wrong."
            );
        }
    }

    return (
        <div className="min-h-screen flex justify-center items-center bg-gray-100">
            <div className="w-96 bg-white p-6 rounded-lg shadow-lg">
                <h1 className="text-2xl font-bold text-center mb-6">
                    User Registration
                </h1>

                <form onSubmit={handleSubmit}>
                    <InputField
                        label="Name"
                        type="text"
                        name="name"
                        value={formData.name}
                        placeholder="Enter your name"
                        onChange={handleChange}
                    />

                    <InputField
                        label="Email"
                        type="email"
                        name="email"
                        value={formData.email}
                        placeholder="Enter your email"
                        onChange={handleChange}
                    />

                    <InputField
                        label="Phone Number"
                        type="text"
                        name="phone"
                        value={formData.phone}
                        placeholder="Enter your phone number"
                        onChange={handleChange}
                    />

                    <Button
                        title="Submit"
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300"
                    />
                    <p className="text-center mt-4 text-gray-600"> Already have an account?
                        <Link
                            to="/login"
                            className="text-blue-600 hover:underline px-4 py-2 "
                        >
                            Login
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
}

export default FormPage;