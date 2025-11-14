Perfect :+1: Let’s build this step-by-step — a Serverless Node.js backend (e.g., for Vercel, AWS Lambda, or Netlify) that exposes a POST API to add entries into a Google Sheet.
We’ll use:
:large_green_circle: Node.js
:zap: Express (optional if local testing)
:page_facing_up: Google Sheets API (v4)
:closed_lock_with_key: Service Account authentication
:bricks: Step 1: Setup Google Sheet + API Access
Go to Google Cloud Console
Create a new project (or use existing one)
Enable Google Sheets API
Create Service Account credentials
Go to APIs & Services → Credentials → Create Credentials → Service Account
After creation, click on it → Keys → Add Key → Create new key → JSON
Download this JSON (it contains your private key)
Open your Google Sheet
Click Share
Add your service account email (from JSON file, looks like your-service-account@project-id.iam.gserviceaccount.com) as an editor.
:package: Step 2: Setup Project Locally
mkdir serverless-sheet-api
cd serverless-sheet-api
npm init -y
npm install googleapis express
If you plan to deploy to Vercel, you can skip Express and use pure handler functions — but let’s start simple.
:jigsaw: Step 3: Folder Structure
serverless-sheet-api/
├── index.js
├── credentials.json   // your service account key file
└── package.json
:gear: Step 4: Write API (index.js)
Here’s a simple Express-based backend that adds a new row to a Google Sheet:
import express from "express";
import { google } from "googleapis";
import fs from "fs";

const app = express();
app.use(express.json());

// Load credentials
const credentials = JSON.parse(fs.readFileSync("credentials.json"));
const SCOPES = ["https://www.googleapis.com/auth/spreadsheets"];
const auth = new google.auth.JWT(
  credentials.client_email,
  null,
  credentials.private_key,
  SCOPES
);
const sheets = google.sheets({ version: "v4", auth });

// Replace this with your sheet ID
const SHEET_ID = "YOUR_SHEET_ID_HERE";

app.post("/add-entry", async (req, res) => {
  try {
    const { name, email, message } = req.body;
    if (!name || !email || !message)
      return res.status(400).json({ error: "Missing fields" });

    await sheets.spreadsheets.values.append({
      spreadsheetId: SHEET_ID,
      range: "Sheet1!A:C", // target columns
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [[name, email, message]],
      },
    });

    res.status(200).json({ success: true, message: "Row added to Google Sheet" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to add entry" });
  }
});

app.listen(3000, () => console.log("Server running on port 3000"));
:white_check_mark: Now test:
node index.js
Then send a POST request (via Postman, cURL, etc.):
POST http://localhost:3000/add-entry
Content-Type: application/json

{
  "name": "Honeshwar Thakur",
  "email": "honeshwarthakur@gmail.com",
  "message": "Hello from Node!"
}
:magic_wand: Step 5: Deploy as Serverless (Example: Vercel)
Create api/add-entry.js instead of Express app:
import { google } from "googleapis";

export default async function handler(req, res) {
  if (req.method !== "POST")
    return res.status(405).json({ error: "Method not allowed" });

  const { name, email, message } = req.body;

  if (!name || !email || !message)
    return res.status(400).json({ error: "Missing fields" });

  const credentials = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT);
  const auth = new google.auth.JWT(
    credentials.client_email,
    null,
    credentials.private_key,
    ["https://www.googleapis.com/auth/spreadsheets"]
  );
  const sheets = google.sheets({ version: "v4", auth });

  const SHEET_ID = process.env.SHEET_ID;

  try {
    await sheets.spreadsheets.values.append({
      spreadsheetId: SHEET_ID,
      range: "Sheet1!A:C",
      valueInputOption: "USER_ENTERED",
      requestBody: { values: [[name, email, message]] },
    });

    res.status(200).json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to append data" });
  }
}
Then:
Put your JSON creds in an env var:
GOOGLE_SERVICE_ACCOUNT=<full JSON string of credentials>
SHEET_ID=<your google sheet id>
Deploy to Vercel — it automatically runs serverless function on POST /api/add-entry
:white_check_mark: Result
You now have a Serverless POST API that adds a new entry to Google Sheets, either locally or deployed.
Would you like me to show the Vercel-ready folder structure (with vercel.json and api/add-entry.js) next?