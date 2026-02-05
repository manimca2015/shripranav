'use server';

import { google } from 'googleapis';

const headers = [
    'Timestamp',
    'Purpose',
    'Name',
    'Email',
    'Phone',
    'Subject',
    'Message',
    'Destination',
    'Tour Name',
    'Trip Type',
    'From (Flight)',
    'To (Flight)',
    'Departure Date',
    'Return Date',
    'Adults',
    'Children',
    'Infants',
    'Travel Class',
    'Pax (People)',
    'Ideal Travel Dates'
];

type SheetRowData = {
    [key in typeof headers[number]]?: string | undefined;
};


export async function appendToSheet(data: SheetRowData) {
  if (!process.env.GOOGLE_SHEETS_CLIENT_EMAIL || !process.env.GOOGLE_SHEETS_PRIVATE_KEY || !process.env.GOOGLE_SHEET_ID) {
    console.error('Google Sheets API credentials are not set in environment variables.');
    throw new Error('Server configuration error: Google Sheets credentials are not set.');
  }

  try {
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_SHEETS_PRIVATE_KEY.replace(/\\n/g, '\n'),
      },
      scopes: [
        'https://www.googleapis.com/auth/spreadsheets',
      ],
    });

    const sheets = google.sheets({
      auth,
      version: 'v4',
    });
    
    const now = new Date();
    const timestamp = now.toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

    const rowData: SheetRowData = {
      Timestamp: timestamp,
      ...data
    };

    const row = headers.map(header => rowData[header] || '');
    
    const sheetName = process.env.GOOGLE_SHEET_TAB_NAME || 'Leads';
    
    // First, check if headers exist. If not, add them.
    const getHeader = await sheets.spreadsheets.values.get({
        spreadsheetId: process.env.GOOGLE_SHEET_ID,
        range: `${sheetName}!1:1`,
    });

    if (!getHeader.data.values || getHeader.data.values.length === 0) {
        await sheets.spreadsheets.values.update({
            spreadsheetId: process.env.GOOGLE_SHEET_ID,
            range: `${sheetName}!A1`,
            valueInputOption: 'USER_ENTERED',
            requestBody: {
                values: [headers],
            },
        });
    }


    await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: `${sheetName}!A1`,
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [row],
      },
    });

  } catch (error: any) {
    console.error('Error writing to Google Sheets:', error);
    throw new Error(`Failed to save to sheets: ${error.message}`);
  }
}
