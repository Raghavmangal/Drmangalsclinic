

const express = require("express");
const { google } = require("googleapis");
const fs = require("fs");
const cors = require("cors");
const app = express();

// Option 1: Allow all origins (development only)
app.use(cors());



app.use(express.json());
// Load credentials
// const credentials = JSON.parse(fs.readFileSync("credentials.json"));

const SCOPES = ["https://www.googleapis.com/auth/spreadsheets"];
// const auth = new google.auth.JWT(
//   credentials.client_email,
//   null,
//   credentials.private_key,
//   SCOPES
// );

// Build credentials object from environment variables
const credentials = {
  type: "service_account",
  project_id: process.env.GOOGLE_PROJECT_ID,
  private_key_id: process.env.GOOGLE_PRIVATE_KEY_ID,
  private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  client_email: process.env.GOOGLE_CLIENT_EMAIL,
  client_id: process.env.GOOGLE_CLIENT_ID,
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url: process.env.GOOGLE_CLIENT_CERT_URL,
  universe_domain: "googleapis.com"
};

const auth = new google.auth.GoogleAuth({
  // keyFile: "credentials.json",
  credentials,
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});
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
app.listen(3000, () => console.log("Server running on port 3000"));
module.exports = app;






