import { Divider, IconButton, TextField } from "@mui/material"
import "../styles/home.css"
import { Search } from "@mui/icons-material"
import React from "react";

export default function Orders() {

    const [searchTerm, setSearchTerm] = React.useState("");
    const [order, setOrder] = React.useState<any>(null);

    const handleSearch = () => {
        const existing = localStorage.getItem("order");
        const orders = existing ? JSON.parse(existing) : [];

        const foundOrder = orders.find((order: any) => order.id.toString() === searchTerm);
        setOrder(foundOrder || null);
    }

    return (
        <div>
            <div className="order-search-outer">
                <TextField value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="order-search-input" size="small" placeholder="Enter your Order ID" variant="outlined" />
                <IconButton className="order-search-button" onClick={handleSearch}>
                    <Search />
                </IconButton>
            </div>

            <Divider style={{ marginTop: "20px", marginBottom: "20px" }} />

            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
                {order ? (
                    <div className="order-details-outer">
                        <h2>Order ID: {order.id}</h2>
                        <h3>Items: {order.items.map((item: any) => (
                            <div key={item.id}>
                                <p>{item.name}</p>
                            </div>
                        ))}</h3>
                    </div>) : (
                    <div className="no-order-found">
                        <h3>No order found. Please check your Order ID and try again.</h3>
                    </div>
                )}
            </div>


        </div>
    )
}