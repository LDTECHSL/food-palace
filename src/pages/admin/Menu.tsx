import { Button, Checkbox, Dialog, Divider, FormControl, FormControlLabel, Grid, InputLabel, ListItemText, MenuItem, OutlinedInput, Radio, RadioGroup, Select, SelectChangeEvent, TextField } from "@mui/material";
import BreadCrumb from "../../components/BreadCrumb";
import "../../styles/main.css"
import { useEffect, useState } from "react";
import { showSuccess } from "../../components/Toast";
import { Delete, Edit } from "@mui/icons-material";

const categories = [
    { id: 1, name: "Breakfast" },
    { id: 2, name: "Lunch" },
    { id: 3, name: "Dinner" },
    { id: 4, name: "Dessert" },
    { id: 5, name: "Bakery" },
    { id: 6, name: "Drink" }
]

export default function Menu() {

    const [name, setName] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [smallprice, setSmallPrice] = useState<number | "">("");
    const [mediumprice, setMediumPrice] = useState<number | "">("");
    const [largeprice, setLargePrice] = useState<number | "">("");
    const [price, setPrice] = useState<number | "">("");
    const [selected, setSelected] = useState<string[]>([]);
    const [image, setImage] = useState<string>("");
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [menuItems, setMenuItems] = useState<any[]>([]);
    const [radioValue, setRadioValue] = useState<string>("price-range");

    const [openDialog, setOpenDialog] = useState<boolean>(false);
    const [selectedIndex, setSelectedIndex] = useState<number>(-1);

    const [isUpdateMode, setIsUpdateMode] = useState<boolean>(false);

    const handleChange = (event: SelectChangeEvent<string[]>) => {
        const value = event.target.value;
        setSelected(typeof value === "string" ? value.split(",") : value);
    };

    useEffect(() => {
        handleGetMenuItems();
    }, []);

    const handleGetMenuItems = () => {
        const existing = localStorage.getItem("menu");
        const menuItems = existing ? JSON.parse(existing) : [];
        setMenuItems(menuItems);
    }

    const saveForm = () => {
        const existing = localStorage.getItem("menu");
        const menuItems = existing ? JSON.parse(existing) : [];

        const newItem = {
            name,
            description,
            smallprice,
            mediumprice,
            largeprice,
            selected,
            image,
            price,
        };

        menuItems.push(newItem);

        localStorage.setItem("menu", JSON.stringify(menuItems));

        resetForm();
        showSuccess("Menu item saved successfully!");
        handleGetMenuItems();
    };

    const updateForm = () => {

        const existing = localStorage.getItem("menu");
        const menuItems = existing ? JSON.parse(existing) : [];

        const updatedItem = {
            name,
            description,
            smallprice,
            mediumprice,
            largeprice,
            selected,
            image,
            price,
        }

        if (selectedIndex > -1) {
            menuItems[selectedIndex] = updatedItem;
            localStorage.setItem("menu", JSON.stringify(menuItems));
            resetForm();
            showSuccess("Menu item updated successfully!");
            handleGetMenuItems();
        }

    }

    const resetForm = () => {
        setName("");
        setDescription("");
        setSmallPrice("");
        setMediumPrice("");
        setLargePrice("");
        setSelected([]);
        setImage("");
        setIsUpdateMode(false);
        setPrice("");
        setRadioValue("price-range");
    };

    const filteredMenuItems = menuItems.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.selected.some((cat: string) => cat.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    const deleteMenuItem = (index: number) => {
        const existing = localStorage.getItem("menu");
        const menuItems = existing ? JSON.parse(existing) : [];
        menuItems.splice(index, 1);
        localStorage.setItem("menu", JSON.stringify(menuItems));
        setOpenDialog(false);
        handleGetMenuItems();
    }

    const handleFetchForm = (index: number) => {
        const item = getItemByIndex(index);

        if (item) {
            setName(item.name);
            setDescription(item.description);

            if(item.price !== ""){
                setRadioValue("price");
            }else{
                setRadioValue("price-range");
            }

            setPrice(item.price);
            setSmallPrice(item.smallprice);
            setMediumPrice(item.mediumprice);
            setLargePrice(item.largeprice);
            setSelected(item.selected);
            setImage(item.image);
        }
    }

    const getItemByIndex = (index: number) => {
        const existing = localStorage.getItem("menu");
        const menuItems = existing ? JSON.parse(existing) : [];
        return menuItems[index];
    }

    return (
        <>
            <BreadCrumb title="Menu Maintenance" />

            <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
                <div style={{ padding: 20, minWidth: 300 }}>
                    <h3>Are you sure you want to delete this item?</h3>
                    <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 20 }}>
                        <Button onClick={() => setOpenDialog(false)} color="primary">Cancel</Button>
                        <Button onClick={() => { deleteMenuItem(selectedIndex) }} color="error" style={{ marginLeft: 10 }}>Delete</Button>
                    </div>
                </div>
            </Dialog>

            <div className="container">
                <div className="menu-inner">
                    <Grid container spacing={2}>
                        <Grid size={6}>
                            <TextField value={name} onChange={(e) => setName(e.target.value)} fullWidth size="small" label="Item Name" variant="outlined" />
                        </Grid>
                        <Grid size={6}>
                            <FormControl fullWidth size="small">
                                <InputLabel id="multi-label">Select Categories</InputLabel>
                                <Select
                                    labelId="multi-label"
                                    multiple
                                    value={selected}
                                    onChange={handleChange}
                                    input={<OutlinedInput label="Select Categories" />}
                                    renderValue={(selected) => selected.join(", ")}
                                >
                                    {categories.map((category) => (
                                        <MenuItem key={category.id} value={category.name}>
                                            <Checkbox checked={selected.indexOf(category.name) > -1} />
                                            <ListItemText primary={category.name} />
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid size={12}>
                            <TextField
                                fullWidth
                                multiline
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                rows={2}
                                size="small"
                                label="Item Description"
                                variant="outlined"
                            />
                        </Grid>

                        <Divider style={{ width: "100%", margin: "10px 0" }} />

                        <RadioGroup row aria-labelledby="demo-row-radio-buttons-group-label" name="row-radio-buttons-group" value={radioValue} onChange={(e) => {
                            setRadioValue(e.target.value)
                            setSmallPrice("");
                            setMediumPrice("");
                            setLargePrice("");
                            setPrice("");
                        }}>
                            <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 10 }}>
                                <FormControlLabel value="price" control={<Radio />} label="Price" />
                                <FormControlLabel value="price-range" control={<Radio />} label="Price Range" />
                            </div>
                        </RadioGroup>

                        <Grid size={12}>
                            <InputLabel style={{ color: "#000000ff", fontWeight: 600, fontSize: 14, marginBottom: 4 }}>
                               {radioValue === "price-range" ? "Price Range vs Portion Size" : ""}
                            </InputLabel>
                        </Grid>

                        {radioValue === "price-range" && (
                            <>
                                <Grid size={4}>
                                    <TextField
                                        value={smallprice}
                                        onChange={(e) => {
                                            const val = e.target.value;
                                            if (/^\d*$/.test(val)) {   // only digits allowed
                                                setSmallPrice(val === "" ? "" : Number(val));
                                            }
                                        }}
                                        fullWidth
                                        size="small"
                                        label="Small - Price"
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid size={4}>
                                    <TextField
                                        value={mediumprice}
                                        onChange={(e) => {
                                            const val = e.target.value;
                                            if (/^\d*$/.test(val)) {   // only digits allowed
                                                setMediumPrice(val === "" ? "" : Number(val));
                                            }
                                        }}
                                        fullWidth
                                        size="small"
                                        label="Medium - Price"
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid size={4}>
                                    <TextField
                                        value={largeprice}
                                        onChange={(e) => {
                                            const val = e.target.value;
                                            if (/^\d*$/.test(val)) {   // only digits allowed
                                                setLargePrice(val === "" ? "" : Number(val));
                                            }
                                        }}
                                        fullWidth
                                        size="small"
                                        label="Large - Price"
                                        variant="outlined"
                                    />
                                </Grid>
                            </>
                        )}

                        {radioValue === "price" && (
                            <Grid size={4}>
                                <TextField
                                    value={price}
                                    onChange={(e) => {
                                        const val = e.target.value;
                                        if (/^\d*$/.test(val)) {   // only digits allowed
                                            setPrice(val === "" ? "" : Number(val));
                                        }
                                    }}
                                    fullWidth
                                    size="small"
                                    label="Price"
                                    variant="outlined"
                                />
                            </Grid>
                        )}

                        <Grid size={radioValue === "price" ? 8 : 12}>
                            <TextField value={image} onChange={(e) => setImage(e.target.value)} fullWidth size="small" label="Item Image URL" variant="outlined" />
                        </Grid>

                        <Grid size={6}>
                            {image && <img src={image} alt="Item" style={{ width: "50%", objectFit: "contain", border: "1px solid #ccc", borderRadius: 4 }} />}
                        </Grid>

                        <Grid size={12} style={{ textAlign: "right" }}>
                            {isUpdateMode ? (
                                <div style={{ display: "flex", justifyContent: "flex-end", gap: 10 }}>
                                    <button disabled={!name || !description || !smallprice || !mediumprice || !largeprice || !image || selected.length === 0} onClick={resetForm} className="btn btn-secondary">Reset</button>

                                    <button disabled={!name || !description || !smallprice || !mediumprice || !largeprice || !image || selected.length === 0} onClick={updateForm} className="btn btn-primary">Update Item</button>
                                </div>
                            ) : (
                                <button disabled={!name || !description || !image || selected.length === 0 || radioValue === "price" ? (!price) : (!smallprice || !mediumprice || !largeprice)} onClick={saveForm} className="btn btn-primary">Save Item</button>
                            )}
                        </Grid>
                    </Grid>
                </div>
                <div className="menu-inner1">
                    <Grid sx={{ display: "flex", alignItems: "center" }} container spacing={2}>
                        <Grid size={6}>
                            <h3 style={{ marginBottom: 0 }}>Menu Items</h3>
                        </Grid>
                        <Grid size={6} style={{ textAlign: "right" }}>
                            <TextField
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                size="small"
                                placeholder="Search menu items..."
                                variant="outlined"
                                style={{ margin: "10px 0" }}
                            />
                        </Grid>
                    </Grid>

                    <Divider style={{ width: "100%", margin: "10px 0" }} />

                    <div style={{ maxHeight: "65vh", overflowY: "auto", padding: 10, borderRadius: 4 }}>
                        {filteredMenuItems.length === 0 && <p>No menu items found.</p>}
                        {filteredMenuItems.map((item, index) => (
                            <div key={index} style={{ marginBottom: 20, padding: "10px", backgroundColor: "#ebe8e8ff", borderRadius: 4, display: "flex", alignItems: "center", gap: 20, justifyContent: "space-between" }}>
                                <h4>{index + 1}. {item.name}</h4>
                                <div style={{ display: "flex", alignItems: "center", gap: 15 }}>
                                    <Edit onClick={() => {
                                        setSelectedIndex(index);
                                        handleFetchForm(index);
                                        setIsUpdateMode(true);
                                    }} style={{ cursor: "pointer", width: 20 }} color="primary" />
                                    <Delete onClick={() => {
                                        setSelectedIndex(index);
                                        setOpenDialog(true);
                                    }} style={{ cursor: "pointer", width: 20 }} color="error" />
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            </div>

        </>
    )
}