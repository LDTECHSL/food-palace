import { Search } from "@mui/icons-material"
import "../styles/home.css"
import { Button, Divider, FormControlLabel, Radio, RadioGroup } from "@mui/material"
import { useEffect } from "react";
import React from "react";

export default function Breakfast() {
    const [items, setItems] = React.useState<any[]>([]);
    const [radioValues, setRadioValues] = React.useState<{ [key: number]: string }>({});
    const [searchTerm, setSearchTerm] = React.useState("");

    const handleGetItems = () => {
        const existing = localStorage.getItem("menu");
        const menuItems = existing ? JSON.parse(existing) : [];
        const breakfastItems = menuItems.filter((item: any) =>
            item.selected.includes("Breakfast")
        );
        return breakfastItems;
    };

    useEffect(() => {
        const items = handleGetItems();
        setItems(items);

        // initialize radio values for items without fixed price
        const initialValues: { [key: number]: string } = {};
        items.forEach((_:any, idx:any) => {
            initialValues[idx] = "smallprice"; // default
        });
        setRadioValues(initialValues);
    }, []);

    const handleRadioChange = (index: number, value: string) => {
        setRadioValues(prev => ({
            ...prev,
            [index]: value
        }));
    };

    const filteredItems = items.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleAddToPlate = (item: any, selectedSize: string) => {
        const plate = sessionStorage.getItem("plate");
        const updatedPlate = plate ? JSON.parse(plate) : [];
        updatedPlate.push({ ...item, selectedSize });
        sessionStorage.setItem("plate", JSON.stringify(updatedPlate));
    }

    return (
        <div className="user-outer">
            <div className="search-bar-outer">
                <input value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="search-input" type="text" placeholder="Search" />
                <button className="search-button">
                    <Search />
                </button>
            </div>

            <Divider style={{ width: "100%", margin: "10px 0" }} />

            <div className="items-outer">
                {filteredItems.map((item, index) => {
                    const selectedSize = radioValues[index] || "smallprice";
                    const price = item.price === ""
                        ? item[selectedSize]
                        : item.price;

                    return (
                        <div key={index} className="item-card">
                            <img src={item.image} alt={item.name} className="item-image" />
                            <h3 className="item-name">{item.name}</h3>
                            <p className="item-description">{item.description}</p>
                            <p className="item-price">Price: LKR.{price}</p>

                            <Divider style={{ width: "100%", margin: "10px 0" }} />
                            {item.price === "" && (
                                <RadioGroup
                                    row
                                    value={selectedSize}
                                    onChange={(e) => handleRadioChange(index, e.target.value)}
                                    className="size-options"
                                >
                                    <FormControlLabel
                                        value="smallprice"
                                        control={<Radio sx={{
                                            color: "#888",
                                            '&.Mui-checked': {
                                                color: "var(--primary-color)", // 🔵 custom active color
                                            },
                                        }} />}
                                        label="Small"
                                    />
                                    <FormControlLabel
                                        value="mediumprice"
                                        control={<Radio sx={{
                                            color: "#888",
                                            '&.Mui-checked': {
                                                color: "var(--primary-color)",
                                            },
                                        }} />}
                                        label="Medium"
                                    />
                                    <FormControlLabel
                                        value="largeprice"
                                        control={<Radio sx={{
                                            color: "#888",
                                            '&.Mui-checked': {
                                                color: "var(--primary-color)",
                                            },
                                        }} />}
                                        label="Large"
                                    />
                                </RadioGroup>
                            )}

                            <Button variant="contained" onClick={() => handleAddToPlate(item, selectedSize)} className="add-to-cart-button">Add to Plate</Button>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
