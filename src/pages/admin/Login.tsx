import React, { useEffect } from "react";
import "../../styles/main.css"
import admin from "../../json/admin.json";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/food_palace-transparent.png"
import { showError, showSuccess } from "../../components/Toast";

export default function Login() {

    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");

    const navigate = useNavigate()

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const adminUser = admin.find(user => user.username === username && user.password === password);

        if (adminUser) {
            showSuccess("Login Successfull")
            sessionStorage.setItem("username", username);
            navigate("/admin/dashboard");
        } else {
            showError("Invalid credentials. Please try again.")
            sessionStorage.removeItem("username");
        }

    };

    return (
        <div>
            <div className="login-outer">
                <div className="login-inner">
                    {/* <h3>Login Page</h3> */}
                    <img style={{ width: "50%" }} src={logo} alt="" />
                    <div className="text-field">
                        <label style={{ fontSize: "13px", color: "gray" }}>Username:</label>
                        <input
                            className="input-field"
                            placeholder="Enter user name"
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="text-field">
                        <label style={{ fontSize: "13px", color: "gray" }}>Password:</label>
                        <input
                            className="input-field"
                            placeholder="Enter password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button onClick={handleSubmit} className="login-btn" type="submit">Login</button>
                </div>
            </div>
            {/* <h1>Admin Login Page</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Username:</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type="submit">Login</button>
            </form> */}
        </div>
    )
}