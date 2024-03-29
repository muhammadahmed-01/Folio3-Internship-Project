import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Title from "../../components/Title";
import {useEffect, useState} from "react";
import axios from "axios";

function convertDate(original_date) {
  let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  let year = original_date.getFullYear();
  let month = months[original_date.getMonth()];
  let date = original_date.getDate();
  return date + " " + month + " " + year;
}

// Generate Order Data
function createData(id, doctor, appointment_date, booking_date, amount, status) {
  let appt_date = new Date(appointment_date);
  let book_date = new Date(booking_date);
  appt_date = convertDate(appt_date);
  book_date = convertDate(book_date);
  // console.log("Appointment date = " + appt_date + ", Booking Date = " + book_date);
  return {id, doctor, appt_date, book_date, amount, status};
}

export default function Appointments() {
  const [rows, setRows] = useState([])

  useEffect(() => {
    // Get 5 most recent appointments
    (async() => {
      // API Call
      const response = await axios.get("/api/appointment/recentAppointments", {
        headers: {
          "Content-Type": "application/json",
        },
      });
      let counter = 0;
      let data = [];
      for (let obj of response.data) {
        const docName = obj.Doctor_ID.Person_ID.First_Name + " " + obj.Doctor_ID.Person_ID.Last_Name
        let row = createData(counter, docName, obj.Date, obj.Booking_Date, obj.Fee, obj.Status);
        // console.log(row);
        data.push(row);
        counter += 1;
      }
      setRows(data)
    })()
  }, [])
  return (
    <React.Fragment>
      <Title>Recent Appointments</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Doctor</TableCell>
            <TableCell>Appointment Date</TableCell>
            <TableCell>Booking Date</TableCell>
            <TableCell>Amount</TableCell>
            <TableCell align="right">Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.doctor}</TableCell>
              <TableCell>{row.appt_date}</TableCell>
              <TableCell>{row.book_date}</TableCell>
              <TableCell>{row.amount}</TableCell>
              <TableCell align="right">{row.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}
