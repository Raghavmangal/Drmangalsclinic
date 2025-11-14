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
  "project_id": "dr-mangals-clinic",
  "private_key_id": "dca1b77dfaa50568f56d1fe7c8910102d0b98969",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCx0rWMvWDMOoFn\n0trx+8sHWVC0m41bOcYjvSsKBiUe+XauPdCYbLwhb/qYZyRekr0KQyy82E5Rc1WU\nVD7AyfdajA0hhUqEH4ojg71A+auQgGqIbOj40DiEh3hMWb8ToRA7QS0Agi4+GH08\ngYkO0zBRc3coMeimRV5btFjYj4iWPHxPm6eyTrV9qGX60lLo/P54gxQ+AukbJ0V/\nPhLfcEswuGuIPtPnkUDMNU9924RWLiFPOIaLmxOBE5+SAucLug0s2clmxIW4BPMW\nVtmPobuyWZrag0PjoPExYGzFpJVRy0SMTmeXHjUngAAONybsjZT+I8sXD04taghM\nfK0mvZ+7AgMBAAECggEAA5RsVzhQxIvA+H1u2ZmUuBcnisXpjevsfeJcWsf441YT\npOUAWAaIWwaivYKwtr6u05AP9yqbmQQrYDW59a5F2SrMm4olZTeFU7sJNPpRu9z5\n8rkj5NkRlN7CoIwwo+KFgyEyw2SGLcssakAT/u+9dJulyxywxE133Xy/Sndz68z5\n8lzm4Z/L4Tfkiya/KSsOmS8Fw+98u4fcSIRBk9dseeyliRqfoEIKtq2DrRcgrWrf\nnzGZQKGLXhdE8KgILYE9L1h6g7Hm67gOVXaf0QMUEUWZpY4CUq3bAl/SCB2tCpJB\n9UYX8CRE31LV7s/1VzobLqUrkeo/R8WXANyV1kvjAQKBgQDtqzpwsPAakpuAsKRS\nqti/D4NdC6z8gPjkN7Z7Ihxo0+riOocVylF8+V786lch4C/2RTpzt4JMOYSVrr+r\n3DwJgCzrIkw+JKim5kwoIgC+iq8MZXC69nKNUCxwHfSJc/YTnTM1V/82kLQCnwtM\nEZSn1KutVg9b47l78+QmmdeRwQKBgQC/idN0m27fBb4IiAVzhHhgOG8JzM4ZCIm+\nNv8Z/ABi8RaZZHQ0kJJdnsp7dyk7axWjln9YYPFTDqWbCsl4+rKon0mMWZqRxX3K\niNq2J9xIwvXsZ/HUueuzpi8fNL6ysNKhb+/ihCh/5aH2pYXbyiI93Xevt9nQARSF\nZwjNZaCYewKBgCVCLJ0x/9IKnbok9v3Grsf1BKD3jZzgEySj30WaaV29qxrgFgFC\ngFfZOBzqF9LFtH8lBy7Q2+pbMf/NL1sf4YGTyHbsH4u2b4IKpHG+MuOsFhkZZfzJ\nWdfxc6X37DgIJ9GXWUnJi8bgFHg8uqaoMufEnU1FKo87Of7Gk0PB5luBAoGATfCb\npxuIpiAEEBypezQwd5b/OBGq2+zpgAmJDN3KmnhYJdsGnk0mAgqXgl4e3RraF1Mq\nRqBMEuwm30woZ548DPmkSAQ+LYsbgMrnlK/rp4AN6kDx2wo8q0G4cw5XewcQ7rhJ\n+PamNEUQ/vij26gI/vubtFkvvMBzxUUEA/CSxPkCgYEAz/TPZUtQGKnDUAQ3jrcF\n0WFoEweiajdMSpqVuMqZCLnou6ceW4JKO5P97Rs9PqOKVT26IkyhhROGlMBfSTZq\nuJBkycHvRBgZUmf7DjwQp/jm1E/LHkJCC5dVC58tlecaQrU9QPx1RqTn8tTzGTFd\nlJ98QUiPmGstJe0vF+MnR6U=\n-----END PRIVATE KEY-----\n",
  "client_email": "dr-mangals-clinic@dr-mangals-clinic.iam.gserviceaccount.com",
  "client_id": "116322377828871966806",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/dr-mangals-clinic%40dr-mangals-clinic.iam.gserviceaccount.com",
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




