

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

const auth = new google.auth.GoogleAuth({
  // keyFile: "credentials.json",
  credentials:{
  "type": "service_account",
  "project_id": "vibrant-grammar-465319-m3",
  "private_key_id": "a8f02bd2bc185c988374ffa011a2ebe763fa06d4",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQC195JhmedPB4EJ\nkYnW4QQOGUdCO43FCOSP7gEGx5vJo4C5CLOo1jOMOE9I9pJtpUREEo2cwNLqq0rB\nDUDJmJ0RA0USEWF+WDxulQgrZMEefOQ+qzDsiSEOXqbEc37NTfAvRACqpOOLWvQY\nfkG+JZ+2+9M13I+Z/OsBAIkA2Y4GuF8vfMeGu9VY1GR8Fq7lxLHxH4zhyZS51DoD\nziuuiNhSaE4r/WCi4JGzx8eX0ydYWTsqTA8wTW9/A8MdOAGCROrjVnY6cTmAC+pH\np+DSnkSAGfZIyclZczqJn2GGcs85YvuRG2osIJttkG0GgHLan9oe+09qnCow4da1\nCrJbmIUvAgMBAAECggEAGWMulZZq2rBR1Ptsr0Galrr5Iaj8aRKKDPioRQFhX1sD\n8QzhP/uOmpAao7PfDxQhN5wdDNMsOhhm6BNIyDeWJlL99nzdTMrTt5vsVV2Lwgyr\nrYCl5UJmjcIv4zW36b3ndji3HRe/NWidqLMoyfYm19k/iQK6OEI8qVmhQ7CWq6Ie\nLWI4omTHyPYvD6YAE2NJvBHAWeBRA1X0yo44P47X8WBEOW31jQbZV6VrgwqPf8Fy\niwheM6P9H0J6+fPvLG4KizjZwbGcF+c+SayR5Fn6V3QNPRRQNayn4Nd/iqkYxiGT\n8NI3y9o/8C6KSrrKK9R+FMNws9LPy1H5m8U6rELTxQKBgQDmxaSQfPRWUhH73/Ec\nv7ca8Icjizihoweh5iodHpIckB6lUDIZfZj4dSkPrTeM/16US90gViJjAE4etWHZ\nGwS/5jKc9l7RwMUKEwWXoKhLs0JGeors23Ypa94CfomIrm++8dydn8IJDTnESzWY\nw+jmfp0TKBnpHYqNmgz8WrryjQKBgQDJ3BRTheIIiC5h5SZgZjbiLlgzQaILo5om\n9h8Ox1A3EfNE1IJp4KjIj7kS+yqoYTZHfoAlLqIE4vQgkJOBRdtjxoTSCooopzsq\n0ppRkZsSI+tdLgZ+QEjeu90bRW7bIs02pbVad+bNU/3ytXdtc/i1IK63eMTCnmZO\n+mfouNrFqwKBgHqWt0rB9hH82uzQE4dQGHbJGyC4jkbfEejhGbIKUVe2/3CV32dH\nHwGtSzi2rXHLHnTsr/TDjNTGjrklZWstPSKrqGtVPR1zp7goTqozf/NmsGg8JJya\nIHT0hiURDwJ6l4X5eVaKTUr9qZgq07fpKkl3LP3GKa16MeXy1b8ge3rpAoGAadNd\nPKR16a8rUdtGkUdFArL1PnnsMFnm2QIzKhZH8XcRqEYY0NUc53ihuFfA92FviW/C\nUrvt6M3q2p+xFRbAe8B5pXwtDj8N/9dFW/oP6CS4obMdaFbfXRX0RvXRtkS6fSnG\nt9UgRQkBm5qTL+iavKqTrlA8JyPP0xvoGdO/rd0CgYBFBmO1VR3WPBtO1SGLCXdH\nL1jLWBw0f5Vc7QIRhYj/EGofWNOSdmxSYc7jg8SU56KTZDsK5U91qsYHhFRKOYka\nyxKAWGOsMz64Nre/LGcajjtNWjAYJu3IqkF3Cxx22a7S8CJdqBxzbxKDWmsb8zAq\nMFZuCN5PSxtSkdESVc+hVQ==\n-----END PRIVATE KEY-----\n",
  "client_email": "hi-847@vibrant-grammar-465319-m3.iam.gserviceaccount.com",
  "client_id": "104964167467451826595",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/hi-847%40vibrant-grammar-465319-m3.iam.gserviceaccount.com",
  "universe_domain": "googleapis.com"
},
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
// app.listen(3000, () => console.log("Server running on port 3000"));
module.exports = app;






