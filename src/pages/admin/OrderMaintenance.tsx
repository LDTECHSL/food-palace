import React from "react";
import BreadCrumb from "../../components/BreadCrumb";
import "../../styles/home.css"
import { Button } from "@mui/material";

export default function OrderMaintenance() {
    const [orders, setOrders] = React.useState<any[]>([]);

    const fetchOrders = () => {
        const existing = localStorage.getItem("order");
        const parsed = existing ? JSON.parse(existing) : [];
        setOrders(parsed);
    };

    React.useEffect(() => {
        fetchOrders();
    }, []);

    const handleUpdateOrderStatus = (orderId: number, newStatus: string) => {
        const updatedOrders = orders.map(order => {
            if (order.id === orderId) {
                return { ...order, status: newStatus };
            }
            return order;
        });
        setOrders(updatedOrders);
        localStorage.setItem("order", JSON.stringify(updatedOrders));
    };

    return (
        <div>
            <BreadCrumb title="Order Maintenance" />
            <div style={{ margin: "20px 0", fontSize: 18, fontWeight: "bold" }}>
                {orders.map((order: any, index: number) => (
                    <div key={index} style={{ marginBottom: 20, padding: 10, border: "1px solid #ccc", borderRadius: 5, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
                            <div className="order-id-tag">Order #{order.id}</div>
                            <div style={{ marginTop: 10 }}>
                                {order.items.map((item: any, i: number) => (
                                    <div key={i}>{i + 1}. {item.name}</div>
                                ))}
                            </div>
                        </div>

                        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", marginLeft: 20 }}>
                            <div style={{ marginTop: 10, fontWeight: "bold" }}>Status: {order.status}</div>
                            <div style={{ fontSize: 12, color: "#666" }}>Placed on: {new Date(order.timestamp).toLocaleString()}</div>
                            {order.status === "Pending" && (
                                <Button onClick={() => handleUpdateOrderStatus(order.id, "Cooking")} variant="contained" className="primary-button" style={{ marginTop: 10 }}>
                                    Cooking
                                </Button>
                            )}

                            {order.status === "Cooking" && (
                                <Button onClick={() => handleUpdateOrderStatus(order.id, "Cooked")} variant="contained" className="primary-button" style={{ marginTop: 10 }}>
                                    Cooked
                                </Button>
                            )}
                        </div>

                    </div>
                ))}
            </div>
        </div>
    );
}
