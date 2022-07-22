import React, {useState} from "react";
import {Alert, Box, Button, Card, Divider} from "@mui/material";
import {useAuth} from "../../contexts/AuthContext";
import {useNavigate} from "react-router-dom";
import {styled, createTheme, ThemeProvider} from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import NotificationsIcon from "@mui/icons-material/Notifications";
import {mainListItems, secondaryListItems} from "./listItems";
import Copyright from "../copyright/copyright";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import {Chart as ChartJS, ArcElement, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend} from "chart.js";
import {Pie} from "react-chartjs-2";
import {Bar} from "react-chartjs-2";
import {faker} from "@faker-js/faker";
import TextField from "@mui/material/TextField";

ChartJS.register(ArcElement, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export const pie_data = {
  labels: ["Attended", "Pending", "Cancelled"],
  datasets: [
    {
      label: "# ",
      data: [12, 4, 2],
      backgroundColor: ["rgba(255, 99, 132, 0.8)", "rgba(54, 162, 235, 0.8)", "rgba(255, 206, 86, 0.8)"],
      borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)", "rgba(255, 206, 86, 1)"],
      borderWidth: 1,
    },
  ],
};

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: false,
      text: "",
    },
  },
  scales: {
    x: {
      stacked: true,
      title: {
        display: true,
        text: "Year",
      },
    },
    y: {
      stacked: true,
      title: {
        display: true,
        text: "No of Appointments",
      },
    },
  },
  maintainAspectRatio: false,
};

const labels = ["2017", "2018", "2019", "2020", "2021", "2021", "2022"];

export const data = {
  labels,
  datasets: [
    {
      label: "Attended",
      data: labels.map(() => faker.datatype.number({min: 0, max: 50})),
      backgroundColor: "rgba(255, 99, 132, 0.8)",
    },
    {
      label: "Pending",
      data: labels.map(() => faker.datatype.number({min: 0, max: 10})),
      backgroundColor: "rgba(75, 192, 192, 0.8)",
    },
    {
      label: "Cancelled",
      data: labels.map(() => faker.datatype.number({min: 0, max: 20})),
      backgroundColor: "rgba(53, 162, 235, 0.8)",
    },
  ],
};

const drawerWidth = 250;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({theme, open}) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

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

const theme = createTheme();

function DashboardContent() {
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };
  const [error, setError] = useState("");
  const {currentUser, logout} = useAuth();
  const history = useNavigate();

  async function handleLogout() {
    setError("");

    try {
      await logout();
      history("/login");
    } catch {
      setError("Failed to log out");
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{display: "flex"}}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: "24px", // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: "36px",
                ...(open && {display: "none"}),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography component="h1" variant="h6" color="inherit" noWrap sx={{flexGrow: 1}}>
              Instant Appointment
            </Typography>
            <IconButton color="inherit">
              <Badge badgeContent={4} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
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
            <Divider sx={{my: 1}} />
            {secondaryListItems}
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light" ? theme.palette.grey[100] : theme.palette.grey[900],
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
        >
          <Toolbar />
          <Container maxWidth="sm" sx={{mt: 4, mb: 2}}>
            {error && <Alert variant="danger">{error}</Alert>}
            {/* ///////////////////////////////////////////////////////////////*/}
            <Box
              component="form"
              sx={{
                flexDirection: "row",
                justifyContent: "space-between",
                "& .MuiTextField-root": {m: 1, width: "25ch"},
                spacing: 10,
                //,bgcolor: "aqua "
              }}
              noValidate
              autoComplete="off"
            >
              <div>
                <TextField required id="outlined-required" label="First Name" defaultValue="" />
                <TextField required id="outlined-required" label="Last Name" defaultValue="" />
                <TextField required id="outlined-required" label="Doctor Name" defaultValue="" />
                <TextField required id="outlined-required" label="Doctor Specialization" defaultValue="" />
                <TextField required id="outlined-required" type="date" />
                <TextField required id="outlined-required" type="time" />
                <TextField required id="outlined-required" label="Appointment Location" defaultValue="" />
                <TextField required id="outlined-required" label="Appointment Charges" defaultValue="" />
              </div>
            </Box>
            <Box
              sx={{
                "& .MuiTextField-root": {m: 1, width: "52ch"},
              }}
            >
              <TextField required id="outlined-required" label="Email" defaultValue="" fullWidth type="email" />
            </Box>
            <Box
              sx={{
                "& .MuiTextField-root": {m: 1, width: "52ch"},
              }}
            >
              <TextField
                required
                id="outlined-required"
                label="Patient Query"
                defaultValue=""
                fullWidth
                multiline
                rows="5"
              />
            </Box>
            <Box>
              <Link href="/MyAppointments">
                <Button type="submit" variant="contained" sx={{ml: 15, mt: 2, b: 2, pl: 10, pr: 10}}>
                Submit
                </Button>
              </Link>
            </Box>
          </Container>

          <Copyright sx={{pt: 4}} />
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default function Dashboard() {
  return <DashboardContent />;
}

// export default function Dashboard() {

//   return (
//     <Box>
//       <Card>
//         <Card>
//           <h2>Profile</h2>
//           {error && <Alert variant="danger">{error}</Alert>}
//           <strong>Email:</strong> {currentUser.email}
//         </Card>
//       </Card>
//       <Divider />
//       <Button variant="contained" onClick={handleLogout}>
//           Log Out
//       </Button>
//     </Box>
//   )
// }
