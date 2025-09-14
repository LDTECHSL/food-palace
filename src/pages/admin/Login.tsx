import React from "react";
import "../../styles/main.css"
import admin from "../../json/admin.json";
import { useNavigate } from "react-router-dom";

export default function Login() {

    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");

    const navigate = useNavigate()

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        const adminUser = admin.find(user => user.username === username && user.password === password);

        if (adminUser) {
            alert("Login successful!");
            sessionStorage.setItem("username", username);
            navigate("/admin/dashboard");
        } else {
            alert("Invalid credentials. Please try again.");
            sessionStorage.removeItem("username");
        }       

    };

    return (
        <div>
            <h1>Admin Login Page</h1>
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
            </form>
        </div>
    )
}