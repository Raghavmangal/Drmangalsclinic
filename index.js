

const express = require("express");
const { google } = require("googleapis");
const fs = require("fs");
const cors = require("cors");
const dotenv = require("dotenv")
dotenv.config();
const app = express();

// Option 1: Allow all origins (development only)
app.use(cors());



app.use(express.json());


const auth = new google.auth.GoogleAuth({
  credentials: {
    type: "service_account",
    project_id: "dr-mangals-clinic",
    private_key_id: "301b46a8230e15322b1a2e153448ccd72ea7fe2b",
    private_key: process.env.GOOGLE_PRIVATE_KEY,
    client_email: "dr-mangals-clinic@dr-mangals-clinic.iam.gserviceaccount.com",
    client_id: "116322377828871966806",
  },
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});
// console.log(process.env.GOOGLE_PRIVATE_KEY)

//comment test
app.get("/", (req,res)=>{
  res.status(200).send("Server is Running");
})


const sheets = google.sheets({ version: "v4", auth });
// Replace this with your sheet ID
const SHEET_ID = "1hQUb0R_bPvzyyI7jDiceSVVTyLGqovLcJgNHS5QiJFI";
app.post("/add-entry", async (req, res) => {
  try {
    const { name, email, phone, department, message } = req.body;
    if (!name || !email || !message)
      return res.status(400).json({ error: "Missing fields" });
    await sheets.spreadsheets.values.append({
      spreadsheetId: SHEET_ID,
      range: "Sheet1!A:E", // target columns
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [[name, email, phone,department, message]],
      },
    });
    res.status(200).json({ success: true, message: "Row added to Google Sheet" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to add entry" });
  }
});
// app.listen(3000, () => console.log("Server running on port 3000"));
module.exports = app;









