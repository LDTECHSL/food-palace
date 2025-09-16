import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {

    const navigate = useNavigate();

    const username = sessionStorage.getItem("username");

    useEffect(() => {
        if (!username) {
            navigate("/admin/login");
        }
    }, [username, navigate]);

    return (
        <div>
            <h1>Admin Dashboard </h1>
        </div>
    )
}