const express = require('express');
const router = express.Router();
const { google } = require('googleapis');
const creds = require('../google-credentials.json');

const SHEET_ID = 'PASTE_YOUR_SHEET_ID_HERE'; // <-- Replace with your actual sheet ID

// Append to Google Sheet
async function appendToSheet({ name, email }) {
  const auth = new google.auth.GoogleAuth({
    credentials: creds,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  const sheets = google.sheets({ version: 'v4', auth: await auth.getClient() });

  await sheets.spreadsheets.values.append({
    spreadsheetId: SHEET_ID,
    range: 'Sheet1!A:C',
    valueInputOption: 'USER_ENTERED',
    requestBody: {
      values: [[name, email, new Date().toLocaleString()]],
    },
  });
}

// Waitlist form route
router.post('/waitlist', async (req, res) => {
  const { name, email } = req.body;
  console.log('Waitlist form received:', { name, email });

  try {
    await appendToSheet({ name, email });
    res.status(200).json({ message: 'Saved to Google Sheet ✅' });
  } catch (err) {
    console.error('Google Sheets Error ❌:', err);
    res.status(500).json({ message: 'Failed to save to sheet' });
  }
});

// Partner form can be connected later
router.post('/partner', (req, res) => {
  const { agency, contact, email } = req.body;
  console.log('Partner form received:', { agency, contact, email });
  res.status(200).json({ message: 'Partner submission successful' });
});

module.exports = router;
