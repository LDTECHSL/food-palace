import * as React from "react";
import { styled, Theme, CSSObject, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import {
    AccountCircleTwoTone,
    EmojiEventsTwoTone,
    ExpandLess,
    ExpandMore,
    NotificationsActiveTwoTone,
    PeopleTwoTone,
    PowerSettingsNewTwoTone,
    RocketLaunchTwoTone,
    StickyNote2TwoTone,
} from "@mui/icons-material";
import { ReactElement } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../styles/navbar.css";
import logo from "../assets/food_palace-transparent.png";
import {
    LeftCircleTwoTone,
    RightCircleTwoTone,
} from "@ant-design/icons";
import { IconButton, Typography, useMediaQuery } from "@mui/material";

const drawerWidth = 230;

const openedMixin = (theme: Theme): CSSObject => ({
    width: drawerWidth,
    transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
    transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up("sm")]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
    shouldForwardProp: (prop) => prop !== "open",
})(({ theme }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
    boxSizing: "border-box",
    variants: [
        {
            props: ({ open }) => open,
            style: {
                ...openedMixin(theme),
                "& .MuiDrawer-paper": openedMixin(theme),
            },
        },
        {
            props: ({ open }) => !open,
            style: {
                ...closedMixin(theme),
                "& .MuiDrawer-paper": closedMixin(theme),
            },
        },
    ],
}));

interface Props {
    children: ReactElement;
}

export interface NavChild {
    name: string;
    path: string;
}

export interface NavItem {
    name: string;
    icon: React.ReactElement;
    path?: string;
    children?: NavChild[];  // ✅ optional children
}

export default function AdminNavbar({ children }: Readonly<Props>) {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md")); // mobile detection

    const [logoutOpen, setLogoutOpen] = React.useState(false);
    const [open] = React.useState(true);
    const [mobileOpen, setMobileOpen] = React.useState(false); // mobile drawer state
    const [expanded, setExpanded] = React.useState<number | null>(null);

    const navigate = useNavigate();
    const location = useLocation();

    const handleOpen = () => setMobileOpen(true);
    const handleClose = () => setMobileOpen(false);

    const handleLogout = () => {
        // Perform logout logic here
        sessionStorage.removeItem("username");
        navigate("/admin/login");
    };

    const drawerItems : NavItem[] = [
        {
            name: "Dashboard",
            icon: <RocketLaunchTwoTone style={{ fontSize: "18px" }} />,
            path: "/admin/dashboard",
        },
        {
            name: "Menu",
            icon: <AccountCircleTwoTone style={{ fontSize: "18px" }} />,
            path: "/admin/menu",
        },
        {
            name: "Orders",
            icon: <EmojiEventsTwoTone style={{ fontSize: "18px" }} />,
            path: "/admin/orders",
        },
    ];

    const renderDrawerContent = (
        <div>
            <div className="drawer-header">
                {/* <img className="drawer-logo" src={logo} alt="" /> */}
                <Typography style={{ marginLeft: "25px" }} className="drawer-logo-txt">Food Palace</Typography>

                {isMobile && (
                    <IconButton
                        sx={{ ml: "auto" }}
                        onClick={isMobile ? handleClose : undefined}
                    >
                        <LeftCircleTwoTone style={{ color: "var(--text-color-white)" }} />
                    </IconButton>
                )}
            </div>
            <Divider sx={{ borderColor: "var(--text-color)" }} />
            <List>
                {drawerItems.map((item, index) => {
                    const isParentActive =
                        item.path === location.pathname ||
                        item.children?.some((c) => c.path === location.pathname);

                    return (
                        <React.Fragment key={index}>
                            <ListItem disablePadding sx={{ display: "block" }}>
                                <ListItemButton
                                    onClick={() =>
                                        item.children
                                            ? setExpanded(expanded === index ? null : index)
                                            : item.path && navigate(item.path)
                                    }
                                    sx={{
                                        minHeight: 48,
                                        px: 2.5,
                                        backgroundColor: isParentActive
                                            ? "rgba(110, 109, 109, 0.29)"
                                            : "transparent",
                                        borderRight: isParentActive ? "4px solid #7d7d7dff" : "none",
                                        color: isParentActive ? "#7d7d7dff" : "white",
                                        "&:hover": {
                                            backgroundColor: isParentActive
                                                ? "rgba(110, 109, 109, 0.29)"
                                                : "rgba(57, 56, 56, 0.08)",
                                        },
                                    }}
                                >
                                    <ListItemIcon
                                        sx={{
                                            minWidth: 0,
                                            justifyContent: "center",
                                            mr: open ? 2 : "auto",
                                            color: isParentActive ? "#7d7d7dff" : "white",
                                        }}
                                    >
                                        {item.icon}
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={item.name}
                                        primaryTypographyProps={{ fontSize: "13px" }}
                                        sx={{
                                            opacity: open ? 1 : 0,
                                            color: isParentActive ? "#7d7d7dff" : "white",
                                        }}
                                    />
                                    {item.children &&
                                        (expanded === index ? <ExpandLess /> : <ExpandMore />)}
                                </ListItemButton>
                            </ListItem>

                            {item.children && (
                                <Collapse in={expanded === index} timeout="auto" unmountOnExit>
                                    <List component="div" disablePadding>
                                        {item.children.map((child, cIdx) => {
                                            const isChildActive = child.path === location.pathname;
                                            return (
                                                <ListItem key={cIdx} disablePadding sx={{ pl: open ? 4 : 2 }}>
                                                    <ListItemButton
                                                        onClick={() => child.path && navigate(child.path)}
                                                        sx={{
                                                            m: "2px 8px",
                                                            borderRadius: "6px",
                                                            color: isChildActive ? "#7d7d7dff" : "white",
                                                            backgroundColor: isChildActive
                                                                ? "rgba(110, 109, 109, 0.29)"
                                                                : "transparent",
                                                            "&:hover": {
                                                                backgroundColor: isChildActive
                                                                    ? "rgba(110, 109, 109, 0.29)"
                                                                    : "rgba(57, 56, 56, 0.08)",
                                                            },
                                                        }}
                                                    >
                                                        <ListItemText
                                                            primary={child.name}
                                                            primaryTypographyProps={{ fontSize: "12px" }}
                                                            sx={{
                                                                opacity: open ? 1 : 0,
                                                                color: isChildActive ? "#7d7d7dff" : "white",
                                                            }}
                                                        />
                                                    </ListItemButton>
                                                </ListItem>
                                            );
                                        })}
                                    </List>
                                </Collapse>
                            )}
                        </React.Fragment>
                    );
                })}
            </List>

            <Divider sx={{ borderColor: "var(--text-color)" }} />
            <List>
                <ListItem disablePadding sx={{ display: "block" }}>
                    <ListItemButton onClick={() => handleLogout()} sx={{ minHeight: 48, px: 2.5 }}>
                        <ListItemIcon
                            sx={{
                                minWidth: 0,
                                justifyContent: "center",
                                mr: open ? 2 : "auto",
                            }}
                        >
                            <PowerSettingsNewTwoTone style={{ fontSize: "18px", color: "white" }} />
                        </ListItemIcon>
                        <ListItemText
                            primary="Logout"
                            primaryTypographyProps={{ fontSize: "13px", color: "white" }}
                            sx={{ opacity: open ? 1 : 0 }}
                        />
                    </ListItemButton>
                </ListItem>
            </List>
        </div>
    );

    return (
        <Box sx={{ display: "flex", minHeight: "100vh", backgroundColor: "#f5f6fa" }}>
            {/* <Dialogbox
        open={logoutOpen}
        title="Confirm Logout"
        content="Are you sure you want to logout?"
        agreeButtonText="Logout"
        disagreeButtonText="Cancel"
        onAgree={handleLogout}
        onDisagree={() => setLogoutOpen(false)}
        onClose={() => setLogoutOpen(false)}
      /> */}
            <CssBaseline />

            {/* Desktop Drawer */}
            {!isMobile && (
                <Drawer
                    variant="permanent"
                    open={open}
                    sx={{
                        "& .MuiDrawer-paper": {
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-between",
                            backgroundColor: "#242424",
                        },
                    }}
                >
                    {renderDrawerContent}
                </Drawer>
            )}

            {/* Mobile Drawer */}
            {isMobile && (
                <>
                    <MuiDrawer
                        variant="temporary"
                        open={mobileOpen}
                        onClose={handleClose}
                        ModalProps={{
                            keepMounted: true, // Better open performance on mobile.
                        }}
                        sx={{
                            "& .MuiDrawer-paper": {
                                width: drawerWidth,
                                backgroundColor: "#242424",
                            },
                        }}
                    >
                        {renderDrawerContent}
                    </MuiDrawer>

                    {!mobileOpen && (
                        <IconButton
                            onClick={handleOpen}
                            sx={{
                                position: "fixed",
                                top: 16,
                                left: 16,
                                zIndex: 1300,
                                backgroundColor: "#242424",
                                color: "white",
                                "&:hover": { backgroundColor: "#3a3a3a" },
                            }}
                        >
                            <RightCircleTwoTone />
                        </IconButton>
                    )}
                </>
            )}

            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: 4,
                    transition: (theme) =>
                        theme.transitions.create(["margin", "width"], {
                            easing: theme.transitions.easing.sharp,
                            duration: theme.transitions.duration.leavingScreen,
                        }),
                    width: !isMobile ? (open ? `calc(100% - ${drawerWidth}px)` : "100%") : "100%",
                }}
            >
                {children}
            </Box>
        </Box>
    );
}
