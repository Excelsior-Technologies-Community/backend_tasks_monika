import api from "../services/api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useState } from "react";
import InputField from "../components/InputField";
import Button from "../components/Button";

function Login() {

    const [role, setRole] = useState("user");

    const [userData, setUserData] = useState({
        email: "",
        password: "",
    });

    const [adminData, setAdminData] = useState({
        username: "",
        password: "",
    });

    const navigate = useNavigate();

    function handleUserChange(event) {
        setUserData({
            ...userData,
            [event.target.name]: event.target.value,
        });
    }

    function handleAdminChange(event) {
        setAdminData({
            ...adminData,
            [event.target.name]: event.target.value,
        });
    }

    async function handleSubmit(event) {
        event.preventDefault();

        try {
            let response;

            if (role === "user") {
                if (userData.email === "" || userData.password === "") {
                    toast.error("Please fill all the fields.");
                    return;
                }

                response = await api.post("/api/auth/login", {
                    role: "user",
                    email: userData.email,
                    password: userData.password,
                });
            } else {
                if (adminData.username === "" || adminData.password === "") {
                    toast.error("Please fill all the fields.");
                    return;
                }

                response = await api.post("/api/auth/login", {
                    role: "admin",
                    username: adminData.username,
                    password: adminData.password,
                });


            }

            console.log(response.data);
            console.log("Role:", response.data.role);

            toast.success(response.data.message);

            // if (response.data.role === "user") {
            //     navigate("/user-dashboard");
            // } else if (response.data.role === "admin") {
            //     navigate("/admin-dashboard");
            // }

            if (response.data.role === "user") {
                navigate("/user-dashboard");
            } else if (response.data.role === "admin") {
                navigate("/admin-dashboard");
            }

        } catch (error) {
            toast.error(error.response?.data?.message || "Login failed");
        }
    }

    return (
        <div className="min-h-screen flex justify-center items-center bg-gray-100">
            <div className="w-96 bg-white p-6 rounded-lg shadow-lg">

                <h1 className="text-2xl font-bold text-center mb-6">
                    Login
                </h1>

                <form onSubmit={handleSubmit}>

                    <div className="mb-4">
                        <label className="block mb-2 font-medium">
                            Role
                        </label>

                        <select
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            className="w-full border rounded-md p-2"
                        >
                            <option value="user">User</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>

                    {role === "user" ? (
                        <>
                            <InputField
                                label="Email"
                                type="email"
                                name="email"
                                value={userData.email}
                                placeholder="Enter email"
                                onChange={handleUserChange}
                            />

                            <InputField
                                label="Password"
                                type="password"
                                name="password"
                                value={userData.password}
                                placeholder="Enter mobile number"
                                onChange={handleUserChange}
                            />
                        </>
                    ) : (
                        <>
                            <InputField
                                label="Username"
                                type="text"
                                name="username"
                                value={adminData.username}
                                placeholder="Enter username"
                                onChange={handleAdminChange}
                            />

                            <InputField
                                label="Password"
                                type="password"
                                name="password"
                                value={adminData.password}
                                placeholder="Enter password"
                                onChange={handleAdminChange}
                            />
                        </>
                    )}

                    <Button
                        title="Login"
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300"
                    />

                </form>

            </div>
        </div>
    );
}

export default Login;