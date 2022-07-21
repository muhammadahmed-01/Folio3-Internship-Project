import React from "react";
import {Divider} from "@mui/material";
import {useAuth} from "../../contexts/AuthContext";
import {useNavigate} from "react-router-dom";
import {styled} from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import {mainListItems, secondaryListItems} from "../../pages/dashboard/listItems";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import {useSelector, useDispatch} from "react-redux";
import {actionCreators} from "../../state/index";
import {bindActionCreators} from "redux";

const drawerWidth = 250;

const Drawer = styled(MuiDrawer, {shouldForwardProp: (prop) => prop !== "open"})(({theme, open}) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

export default function Sidebar() {
  const open = useSelector((state) => state.state);
  const {logout} = useAuth();
  const history = useNavigate();
  const dispatch = useDispatch();
  const {toggleDrawer} = bindActionCreators(actionCreators, dispatch);

  async function handleLogout() {
    try {
      await logout();
      history("/login");
    } catch {
      console.error("Failed to log out");
    }
  }

  return (
    <Drawer variant="permanent" open={open}>
      <Toolbar
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          px: [1],
        }}
      >
        <IconButton
          onClick={() => {
            toggleDrawer(open);
          }}
        >
          <ChevronLeftIcon />
        </IconButton>
      </Toolbar>
      <Divider />
      <List component="nav">
        {mainListItems}
        <ListItemButton onClick={handleLogout}>
          <ListItemIcon>
            <ExitToAppIcon />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItemButton>
        {/* <Divider sx={{my: 1}} /> */}
        {/* {secondaryListItems} */}
      </List>
    </Drawer>
  );
}