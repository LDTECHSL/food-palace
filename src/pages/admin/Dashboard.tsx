import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BreadCrumb from "../../components/BreadCrumb";

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
            <BreadCrumb title="Dashboard" />
        </div>
    )
}