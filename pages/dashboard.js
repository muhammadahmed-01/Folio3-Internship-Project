import React, {useEffect, useState} from "react";
import {Box} from "@mui/material";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Appointments from "./dashboard-content/Appointments";
import Sidebar from "../components/Sidebar/Sidebar";
import Navbar from "../components/Navbar/Navbar";
import Copyright from "../components/copyright/copyright";
import {Chart as ChartJS, ArcElement, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend} from "chart.js";
import {Pie} from "react-chartjs-2";
import {Bar} from "react-chartjs-2";
import {faker} from "@faker-js/faker";
import axios from 'axios';

ChartJS.register(ArcElement, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

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

const mdTheme = createTheme();

function DashboardContent() {
  const [pie_chart_data, setPieChartData] = useState([])
  useEffect(() => {
    (async() => {
      const response = await axios.get('/api/dashboard/month')
      let completed_count = 0
      let pending_count = 0
      let cancelled_count = 0
      // console.log("Response.data = " + JSON.stringify(response))
      for (let appt of response.data){
        // console.log("appt type = " + JSON.stringify(appt.Status))
        if (appt.Status === "Completed"){
          completed_count += 1
        }
        else if (appt.Status === "Cancelled"){
          cancelled_count += 1
        }
        else if (appt.Status === "Pending"){
          pending_count += 1
        }
      }
      // console.log("Returning " + [completed_count, pending_count, cancelled_count]);
      setPieChartData([completed_count, pending_count, cancelled_count])
    })()
  }, [])
  // console.log("data = " + pie_chart_data);

  const pie_data = {  
    labels: ["Attended", "Pending", "Cancelled"],
    datasets: [
      {
        label: "# of Appointments in Current Month",
        data: pie_chart_data,
        backgroundColor: ["rgba(255, 99, 132, 0.8)", "rgba(54, 162, 235, 0.8)", "rgba(255, 206, 86, 0.8)"],
        borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)", "rgba(255, 206, 86, 1)"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{display: "flex"}}>
        <CssBaseline />
        <Navbar>Dashboard</Navbar>
        <Sidebar />
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
          <Container maxWidth="lg" sx={{mt: 4, mb: 4}}>
            {/* {error && <Alert variant="danger">{error}</Alert>} */}
            <Grid container spacing={3}>
              {/* Chart */}
              <Grid item xs={12} md={8} lg={12}>
                <Paper
                  sx={{
                    p: 2,
                    display: "flex",
                    height: 250,
                  }}
                >
                  <div style={{display: "flex", width: "45%"}}>
                    <Pie data={pie_data} width="300px" options={{maintainAspectRatio: false}} />
                    <Bar data={data} width={"10%"} options={options} />
                  </div>
                </Paper>
              </Grid>
              {/* Recent Orders */}
              <Grid item xs={12}>
                <Paper sx={{p: 2, display: "flex", flexDirection: "column"}}>
                  <Appointments />
                </Paper>
              </Grid>
            </Grid>
            <Copyright sx={{pt: 4}} />
          </Container>
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
