

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
// const credentials = {
//   type: "service_account",
//   project_id: process.env.GOOGLE_PROJECT_ID,
//   private_key_id: process.env.GOOGLE_PRIVATE_KEY_ID,
//   private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
//   client_email: process.env.GOOGLE_CLIENT_EMAIL,
//   client_id: process.env.GOOGLE_CLIENT_ID,
//   auth_uri: "https://accounts.google.com/o/oauth2/auth",
//   token_uri: "https://oauth2.googleapis.com/token",
//   auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
//   client_x509_cert_url: process.env.GOOGLE_CLIENT_CERT_URL,
//   universe_domain: "googleapis.com"
// };

// const auth = new google.auth.GoogleAuth({
//   keyFile: "credentials.json",
//   // credentials,
//   scopes: ['https://www.googleapis.com/auth/spreadsheets'],
// });

// {
//   "type": "service_account",
//   "project_id": "dr-mangals-clinic",
//   "private_key_id": "301b46a8230e15322b1a2e153448ccd72ea7fe2b",
//   "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQC01MX9zl+egc9I\nI5155DH+8Rn66yS0dxgUe8MeVFZg3Knktwf7YDqPMJEyNvl1FcWoCfBW58dXSyKk\nqjrWPTrA8KSZptj+XJQlcH+f+iV58EGKMcHxYfYpA4WdRbEvVSfynDJmks0WlJV+\n1Z79BHyH8Gu1GFr5C03IFm3WX5+0ml85TX9TsmhE+/SNrw2lwr2SruKMKh0/UJgq\nBZOmmODZM3p0/JRa62228nHCM5ZSeYsW5CMkrKyARuR6aDAS3M2FlyeLZCofpAFU\nDnlP6rt5+APEnff/OXL/OmzWaB025MYsiaIywl1OAk0BTc7llVoeCgfT87gk5MHt\nNFMu0oltAgMBAAECggEATPGUZZCgoyN8/acZ5LmyhFY2xcu0TI24U07uEUO1lXWP\nXOB8pvulLzRtM76smqNu/Tdtaq0o5v3zebltW6emDl7WywJxppnh96RMydd4htAy\nMwlFCt6yDXWQLwFuiUNkwhiwYXDpj0gd7GAdTG/SRU2Jpv78BqhGqnLQvbzmicPE\n7/mp1FwPalbDqyC/ha5KG7Ja+6WBKQ6T/S+HV53UMT1pXAWEdI4Gt75XDnxdWFeY\nLvZ2AWxqalMTmnQNx6iLkeV/1Y7tUJRrsPZHdqyN4wG+19iEx4XIfLUOkVmd7w8a\n+FPQmQqZg6cQDK0qa/2iwUabOaf9jh/Hg6f9L1oHiQKBgQD4Vh506FrFFXcYVnh4\nwRApwIWPS5xlrKTLnPoI3c3ZaIjqU+nzzGRiPfP9E0y7OopGRkRbZCc1NPUNWRdp\nvjqPGDSaY3gEQPNHzYG8J73e1u+crvDNuLlzt9Ye/e1iEw7/TItoDHyTWdisB6Y9\n86ZpqZpbefFAK1FK8arD+HnOXwKBgQC6aVtF2hf72DtO4LaVtzO6FZOprMQFGqH8\nJLmvsl08N3VsHHTL1OrJGgYfhRBHUmwm4dvUF2F/0zXN+PsQ4HIcG4YxCCIsvcEL\nb/LDnG79uffqlgpSBoIzSiG3oojgCc8JzdiBmb+759sV4PLVgsKcOhxitJIXaokm\nRm8q7vfjswKBgEUGauDD1LcDCF9TaZjm0L9KK9VwhsAcBJIzx6u/OwA69hNrz5Nc\nNGq6HZ8yRhmkY9q0nTtp0xwO5C4ZnVBe95feeoCPNUS5aOWEUZMi2LufsmoylewY\ndDOd3X4vxlOESJ7df8Ij9lxelML8PVDq8E5ePfE/K7dSUv4pvfVKk1CxAoGAOxVR\nnJ43o9cxVRrcRC/A8WYNW2Yq6wM5/FUXlZyO+JsLWKzcSA7AK+VXs33VXwW8ycYk\niuCuQnmLQDF+Qichg88lhTzyuAOcwCdHZsCaXUkoTu4nb0Ao3GDOtwmJIJl7Sbw4\ntzsoDkK6qgCWdx3u2N2CSba55zoZJkyEx7LeVwkCgYBKfld6RpqVPcuuTHuNeeaF\nvTOr1b2ksNni4tmmmcb8Z+u0gt8Xu6dEaDqxLGWESPq6sHg5zq4EOZH3SIjr+aPs\nBR2cFUZvD6TjfRyPFKo+JV3qs77HaNgOruEnmbIfmAazITD2kzz8Bq5ViIQIx7mf\n+vGHgnd2T/zxKUWLcEo28Q==\n-----END PRIVATE KEY-----\n",
//   "client_email": "dr-mangals-clinic@dr-mangals-clinic.iam.gserviceaccount.com",
//   "client_id": "116322377828871966806",
//   "auth_uri": "https://accounts.google.com/o/oauth2/auth",
//   "token_uri": "https://oauth2.googleapis.com/token",
//   "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
//   "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/dr-mangals-clinic%40dr-mangals-clinic.iam.gserviceaccount.com",
//   "universe_domain": "googleapis.com"
// }

const auth = new google.auth.GoogleAuth({
  credentials: {
    type: "service_account",
    project_id: "dr-mangals-clinic",
    private_key_id: "301b46a8230e15322b1a2e153448ccd72ea7fe2b",
    private_key: `-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQC01MX9zl+egc9I\nI5155DH+8Rn66yS0dxgUe8MeVFZg3Knktwf7YDqPMJEyNvl1FcWoCfBW58dXSyKk\nqjrWPTrA8KSZptj+XJQlcH+f+iV58EGKMcHxYfYpA4WdRbEvVSfynDJmks0WlJV+\n1Z79BHyH8Gu1GFr5C03IFm3WX5+0ml85TX9TsmhE+/SNrw2lwr2SruKMKh0/UJgq\nBZOmmODZM3p0/JRa62228nHCM5ZSeYsW5CMkrKyARuR6aDAS3M2FlyeLZCofpAFU\nDnlP6rt5+APEnff/OXL/OmzWaB025MYsiaIywl1OAk0BTc7llVoeCgfT87gk5MHt\nNFMu0oltAgMBAAECggEATPGUZZCgoyN8/acZ5LmyhFY2xcu0TI24U07uEUO1lXWP\nXOB8pvulLzRtM76smqNu/Tdtaq0o5v3zebltW6emDl7WywJxppnh96RMydd4htAy\nMwlFCt6yDXWQLwFuiUNkwhiwYXDpj0gd7GAdTG/SRU2Jpv78BqhGqnLQvbzmicPE\n7/mp1FwPalbDqyC/ha5KG7Ja+6WBKQ6T/S+HV53UMT1pXAWEdI4Gt75XDnxdWFeY\nLvZ2AWxqalMTmnQNx6iLkeV/1Y7tUJRrsPZHdqyN4wG+19iEx4XIfLUOkVmd7w8a\n+FPQmQqZg6cQDK0qa/2iwUabOaf9jh/Hg6f9L1oHiQKBgQD4Vh506FrFFXcYVnh4\nwRApwIWPS5xlrKTLnPoI3c3ZaIjqU+nzzGRiPfP9E0y7OopGRkRbZCc1NPUNWRdp\nvjqPGDSaY3gEQPNHzYG8J73e1u+crvDNuLlzt9Ye/e1iEw7/TItoDHyTWdisB6Y9\n86ZpqZpbefFAK1FK8arD+HnOXwKBgQC6aVtF2hf72DtO4LaVtzO6FZOprMQFGqH8\nJLmvsl08N3VsHHTL1OrJGgYfhRBHUmwm4dvUF2F/0zXN+PsQ4HIcG4YxCCIsvcEL\nb/LDnG79uffqlgpSBoIzSiG3oojgCc8JzdiBmb+759sV4PLVgsKcOhxitJIXaokm\nRm8q7vfjswKBgEUGauDD1LcDCF9TaZjm0L9KK9VwhsAcBJIzx6u/OwA69hNrz5Nc\nNGq6HZ8yRhmkY9q0nTtp0xwO5C4ZnVBe95feeoCPNUS5aOWEUZMi2LufsmoylewY\ndDOd3X4vxlOESJ7df8Ij9lxelML8PVDq8E5ePfE/K7dSUv4pvfVKk1CxAoGAOxVR\nnJ43o9cxVRrcRC/A8WYNW2Yq6wM5/FUXlZyO+JsLWKzcSA7AK+VXs33VXwW8ycYk\niuCuQnmLQDF+Qichg88lhTzyuAOcwCdHZsCaXUkoTu4nb0Ao3GDOtwmJIJl7Sbw4\ntzsoDkK6qgCWdx3u2N2CSba55zoZJkyEx7LeVwkCgYBKfld6RpqVPcuuTHuNeeaF\nvTOr1b2ksNni4tmmmcb8Z+u0gt8Xu6dEaDqxLGWESPq6sHg5zq4EOZH3SIjr+aPs\nBR2cFUZvD6TjfRyPFKo+JV3qs77HaNgOruEnmbIfmAazITD2kzz8Bq5ViIQIx7mf\n+vGHgnd2T/zxKUWLcEo28Q==\n-----END PRIVATE KEY-----\n`,
    client_email: "dr-mangals-clinic@dr-mangals-clinic.iam.gserviceaccount.com",
    client_id: "116322377828871966806",
  },
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
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
// app.listen(3000, () => console.log("Server running on port 3000"));
module.exports = app;









